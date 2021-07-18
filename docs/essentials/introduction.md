---
title: 'Essential addons'
---

A major strength of Storybook are [addons](/addons/) that extend Storybook’s UI and behavior. There are many third-party addons as well as “official” addons developed by the Storybook core team. Storybook ships by default with a set of “essential” addons that add to the initial user experience.

- [Docs](../writing-docs/introduction.md)
- [Controls](./controls.md)
- [Actions](./actions.md)
- [Viewport](./viewport.md)
- [Backgrounds](./backgrounds.md)
- [Toolbars & globals](./toolbars-and-globals.md)
- [Measure](/addons/@storybook/addon-measure)
- [Outline](/addons/storybook-addon-outline)

### Installation
If you're running `sb init` to add Storybook to your project, the essentials package (`@storybook/addon-essentials`) is already installed and configured for you . You can skip the rest of this section.

If you're upgrading from a previous Storybook version, you'll need to run the following command in your terminal:

```shell
npm install --save-dev @storybook/addon-essentials
```

<div class="aside">
💡 <strong>Note</strong>: If you're using <a href="https://yarnpkg.com/">yarn</a> as a package manager, you'll need to adjust the command accordingly.
</div>

Update your Storybook configuration (in `.storybook/main.js`) to include the essentials addon.

```js
// .storybook/main.js

module.exports = {
  addons: ['@storybook/addon-essentials'],
};
```


### Configuration

Essentials is "zero config”, it comes with a recommended configuration out of the box.

If you need to reconfigure any of the essential addons, install it manually, following the installation instructions and adjust the configuration to your needs.

When you start Storybook, Essentials will override its configuration with your own.

### Disabling addons

If you need to disable any of the Essential's addons, you can do it by changing your [`.storybook/main.js`](../configure/overview.md#configure-story-rendering) file.

As an example, if the background addon wasn't necessary to your work, you would need to make the following change:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-main-disable-addon.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">

You can use the following keys for each individual addon: `actions`, `backgrounds`, `controls`, `docs`, `viewport`, `toolbars`.

</div>
