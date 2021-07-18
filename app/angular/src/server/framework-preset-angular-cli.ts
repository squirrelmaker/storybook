import webpack from 'webpack';
import { logger } from '@storybook/node-logger';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { targetFromTargetString, Target } from '@angular-devkit/architect';

import { Options as CoreOptions } from '@storybook/core-common';
import { workspaces } from '@angular-devkit/core';
import {
  findAngularProjectTarget,
  getDefaultProjectName,
  readAngularWorkspaceConfig,
} from './angular-read-workspace';
import {
  AngularCliWebpackConfig,
  extractAngularCliWebpackConfig,
} from './angular-devkit-build-webpack';
import { moduleIsAvailable } from './utils/module-is-available';
import { filterOutStylingRules } from './utils/filter-out-styling-rules';

export type Options = CoreOptions & {
  angularBrowserTarget?: string;
};

export async function webpackFinal(baseConfig: webpack.Configuration, options: Options) {
  const dirToSearch = process.cwd();

  if (!moduleIsAvailable('@angular-devkit/build-angular')) {
    logger.info('=> Using base config because "@angular-devkit/build-angular" is not installed');
    return baseConfig;
  }
  logger.info('=> Loading angular-cli config');

  // Read angular workspace
  let workspaceConfig;
  try {
    workspaceConfig = await readAngularWorkspaceConfig(dirToSearch);
  } catch (error) {
    logger.error(
      `=> Could not find angular workspace config (angular.json) on this path "${dirToSearch}"`
    );
    logger.info(`=> Fail to load angular-cli config. Using base config`);
    return baseConfig;
  }

  // Find angular project target
  let project: workspaces.ProjectDefinition;
  let target: workspaces.TargetDefinition;
  let browserTarget;
  try {
    browserTarget = options.angularBrowserTarget
      ? targetFromTargetString(options.angularBrowserTarget)
      : ({
          configuration: undefined,
          project: getDefaultProjectName(workspaceConfig),
          target: 'build',
        } as Target);

    const fondProject = findAngularProjectTarget(
      workspaceConfig,
      browserTarget.project,
      browserTarget.target
    );
    project = fondProject.project;
    target = fondProject.target;
    logger.info(
      `=> Using angular project "${browserTarget.project}:${browserTarget.target}" for configuring Storybook`
    );
  } catch (error) {
    logger.error(`=> Could not find angular project: ${error.message}`);
    logger.info(`=> Fail to load angular-cli config. Using base config`);
    return baseConfig;
  }

  // Use angular-cli to get some webpack config
  let angularCliWebpackConfig;
  try {
    angularCliWebpackConfig = await extractAngularCliWebpackConfig(dirToSearch, project, target);
    logger.info(`=> Using angular-cli webpack config`);
  } catch (error) {
    logger.error(`=> Could not get angular cli webpack config`);
    throw error;
  }

  return mergeAngularCliWebpackConfig(angularCliWebpackConfig, baseConfig);
}

function mergeAngularCliWebpackConfig(
  { cliCommonWebpackConfig, cliStyleWebpackConfig, tsConfigPath }: AngularCliWebpackConfig,
  baseConfig: webpack.Configuration
) {
  // Don't use storybooks styling rules because we have to use rules created by @angular-devkit/build-angular
  // because @angular-devkit/build-angular created rules have include/exclude for global style files.
  const rulesExcludingStyles = filterOutStylingRules(baseConfig);

  // styleWebpackConfig.entry adds global style files to the webpack context
  const entry = [
    ...(baseConfig.entry as string[]),
    ...Object.values(cliStyleWebpackConfig.entry).reduce((acc, item) => acc.concat(item), []),
  ];

  const module = {
    ...baseConfig.module,
    rules: [...cliStyleWebpackConfig.module.rules, ...rulesExcludingStyles],
  };

  // We use cliCommonConfig plugins to serve static assets files.
  const plugins = [
    ...cliStyleWebpackConfig.plugins,
    ...cliCommonWebpackConfig.plugins,
    ...baseConfig.plugins,
  ];

  const resolve = {
    ...baseConfig.resolve,
    modules: Array.from(
      new Set([...baseConfig.resolve.modules, ...cliCommonWebpackConfig.resolve.modules])
    ),
    plugins: [
      new TsconfigPathsPlugin({
        configFile: tsConfigPath,
        mainFields: ['browser', 'module', 'main'],
      }),
    ],
  };

  return {
    ...baseConfig,
    entry,
    module,
    plugins,
    resolve,
    resolveLoader: cliCommonWebpackConfig.resolveLoader,
  };
}
