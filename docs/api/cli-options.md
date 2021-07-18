---
title: 'CLI options'
---

Storybook comes with two CLI utilities: `start-storybook` and `build-storybook`.

Pass these commands the following options to alter Storybook's behavior.

## start-storybook

```plaintext
Usage: start-storybook [options]
```

| Options                            | Description                                                                                                                                    | Example                                                   |
| ---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| --help                             | Output usage information                                                                                                                       | `start-storybook --help`                                  |
| -V, --version                      | Output the version number                                                                                                                      | `start-storybook -V`                                      |
| -p, --port [number]                | Port to run Storybook                                                                                                                          | `start-storybook -p 9009`                                 |
| -h, --host [string]                | Host to run Storybook                                                                                                                          | `start-storybook -h http://my-host.com`                   |
| -s, --static-dir `<dir-names>`     | Directory where to load static files from, comma-separated list                                                                                | `start-storybook -s public`                               |
| -c, --config-dir [dir-name]        | Directory where to load Storybook configurations from                                                                                          | `start-storybook -c .storybook`                           |
| --https                            | Serve Storybook over HTTPS. Note: You must provide your own certificate information.                                                           | `start-storybook --https`                                 |
| --ssl-ca `<ca>`                    | Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)                                     | `start-storybook --ssl-ca my-certificate`                 |
| --ssl-cert `<cert>`                | Provide an SSL certificate. (Required with --https)                                                                                            | `start-storybook --ssl-cert my-ssl-certificate`           |
| --ssl-key `<key>`                  | Provide an SSL key. (Required with --https)                                                                                                    | `start-storybook --ssl-key my-ssl-key`                    |
| --smoke-test                       | Exit after successful start                                                                                                                    | `start-storybook --smoke-test`                            |
| --ci                               | CI mode (skip interactive prompts, don't open browser)                                                                                         | `start-storybook --ci`                                    |
| --quiet                            | Suppress verbose build output                                                                                                                  | `start-storybook --quiet`                                 |
| --no-dll                           | Do not use dll reference (no-op)                                                                                                               | `start-storybook --no-dll`                                |
| --debug-webpack                    | Display final webpack configurations for debugging purposes                                                                                    | `start-storybook --debug-webpack`                         |
| `--webpack-stats-json <directory>` | Write Webpack Stats JSON to disk                                                                                                               | `start-storybook --webpack-stats-json /tmp/webpack-stats` |
| --docs                             | Starts Storybook in documentation mode. Learn more about it in [here](../writing-docs/build-documentation.md#preview-storybooks-documentation) | `start-storybook --docs`                                  |
| --no-manager-cache                 | Disables Storybook's manager caching mechanism. See note below.                                                                                | `start-storybook --no-manager-cache`                      |

<div class="aside">
💡 <strong>NOTE</strong>: The flag <code>--no-manager-cache</code> disables the internal caching of Storybook and can severely impact your Storybook loading time, so only use it when you need to refresh Storybook's UI, such as when editing themes.
</div>

## build-storybook

```plaintext
Usage: build-storybook [options]
```

| Options                            | Description                                                                                                                                     | Example                                                   |
| ---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| -h, --help                         | Output usage information                                                                                                                        | `build-storybook --help`                                  |
| -V, --version                      | Output the version number                                                                                                                       | `build-storybook -V`                                      |
| -s, --static-dir `<dir-names>`     | Directory where to load static files from, comma-separated list                                                                                 | `build-storybook -s public`                               |
| -o, --output-dir [dir-name]        | Directory where to store built files                                                                                                            | `build-storybook -o /my-deployed-storybook`               |
| -c, --config-dir [dir-name]        | Directory where to load Storybook configurations from                                                                                           | `build-storybook -c .storybook`                           |
| -w, --watch                        | Enables watch mode                                                                                                                              | `build-storybook -w`                                      |
| --loglevel [level]                 | Controls level of logging during build. Can be one of: [silly, verbose, info (default), warn, error, silent]                                    | `build-storybook --loglevel warn`                         |
| --quiet                            | Suppress verbose build output                                                                                                                   | `build-storybook --quiet`                                 |
| --no-dll                           | Do not use dll reference (no-op)                                                                                                                | `build-storybook --no-dll`                                |
| --debug-webpack                    | Display final webpack configurations for debugging purposes                                                                                     | `build-storybook --debug-webpack`                         |
| `--webpack-stats-json <directory>` | Write Webpack Stats JSON to disk                                                                                                                | `build-storybook --webpack-stats-json /my-storybook/webpack-stats` |
| --docs                             | Builds Storybook in documentation mode. Learn more about it in [here](../writing-docs/build-documentation.md#publish-storybooks-documentation)) | `build-storybook --docs`                                  |

<div class="aside">
💡 <strong>NOTE</strong>: If you're using npm instead of yarn to publish Storybook, the commands work slightly different. For example, <code>npm run build-storybook -- -o ./path/to/build</code>.
</div>
