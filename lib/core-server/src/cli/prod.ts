import program, { CommanderStatic } from 'commander';
import chalk from 'chalk';
import { logger } from '@storybook/node-logger';
import { parseList, getEnvConfig, checkDeprecatedFlags } from './utils';

export interface ProdCliOptions {
  staticDir?: string[];
  outputDir?: string;
  configDir?: string;
  watch?: boolean;
  quiet?: boolean;
  loglevel?: string;
  dll?: boolean;
  docsDll?: boolean;
  uiDll?: boolean;
  debugWebpack?: boolean;
  previewUrl?: string;
  forceBuildPreview?: boolean;
  docs?: boolean;
  modern?: boolean;
}

export function getProdCli(packageJson: {
  version: string;
  name: string;
}): CommanderStatic & ProdCliOptions {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';

  program
    .version(packageJson.version)
    .option('-s, --static-dir <dir-names>', 'Directory where to load static files from', parseList)
    .option('-o, --output-dir <dir-name>', 'Directory where to store built files')
    .option('-c, --config-dir <dir-name>', 'Directory where to load Storybook configurations from')
    .option('-w, --watch', 'Enable watch mode')
    .option('--quiet', 'Suppress verbose build output')
    .option('--loglevel <level>', 'Control level of logging during build')
    .option('--no-dll', 'Do not use dll reference (no-op)')
    .option('--docs-dll', 'Use Docs dll reference (legacy)')
    .option('--ui-dll', 'Use UI dll reference (legacy)')
    .option('--debug-webpack', 'Display final webpack configurations for debugging purposes')
    .option('--webpack-stats-json [directory]', 'Write Webpack Stats JSON to disk')
    .option(
      '--preview-url <string>',
      'Disables the default storybook preview and lets your use your own'
    )
    .option('--force-build-preview', 'Build the preview iframe even if you are using --preview-url')
    .option('--docs', 'Build a documentation-only site using addon-docs')
    .option('--modern', 'Use modern browser modules')
    .parse(process.argv);

  logger.setLevel(program.loglevel);
  logger.info(chalk.bold(`${packageJson.name} v${packageJson.version}\n`));

  // The key is the field created in `program` variable for
  // each command line argument. Value is the env variable.
  getEnvConfig(program, {
    staticDir: 'SBCONFIG_STATIC_DIR',
    outputDir: 'SBCONFIG_OUTPUT_DIR',
    configDir: 'SBCONFIG_CONFIG_DIR',
  });

  checkDeprecatedFlags(program as ProdCliOptions);
  return { ...program };
}
