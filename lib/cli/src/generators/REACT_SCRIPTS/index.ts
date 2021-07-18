import path from 'path';
import fs from 'fs';

import { baseGenerator, Generator } from '../baseGenerator';

const generator: Generator = async (packageManager, npmOptions, options) => {
  const extraMain = options.linkable
    ? {
        webpackFinal: `%%(config) => {
      const path = require('path');
      // add monorepo root as a valid directory to import modules from
      config.resolve.plugins.forEach((p) => {
        if (Array.isArray(p.appSrcs)) {
          p.appSrcs.push(path.join(__dirname, '..', '..', '..', 'storybook'));
        }
      });
      return config;
    }
    %%`,
      }
    : {};

  await baseGenerator(packageManager, npmOptions, options, 'react', {
    extraAddons: ['@storybook/preset-create-react-app'],
    // `@storybook/preset-create-react-app` has `@storybook/node-logger` as peerDep
    extraPackages: ['@storybook/node-logger'],
    staticDir: fs.existsSync(path.resolve('./public')) ? 'public' : undefined,
    addBabel: false,
    addESLint: true,
    extraMain,
  });
};

export default generator;
