---
title: 'Types of addons'
---

Each Storybook addon is classified into two general categories, UI-based or Presets. Each type of addons features are documented here. Use this as a reference when creating your addon.

## UI-based addons

UI-based addons allow you to customize Storybook's UI with the following elements.

### Panels

Panel addons allow you to add your own UI in Storybook's addon panel. This is the most common type of addon in the ecosystem. For example the official [@storybook/actions](../essentials/actions.md) and [@storybook/a11y](https://github.com/storybookjs/storybook/tree/next/addons/a11y) use this pattern.

![Storybook panel](./storybook-panel.png)

Use this boilerplate code to add a new `Panel` to Storybook's UI:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-addon-panel-example.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->


### Toolbars

Toolbar addons allow you to add your own custom tools in Storybook's Toolbar. For example the official [@storybook/backgrounds](../essentials/backgrounds.md) and the [storybook-addon-outline](https://github.com/chromaui/storybook-outline) use this pattern.

![Storybook toolbar addon](./storybook-toolbar.png)

Use this boilerplate code to add a new `button` to Storybook's Toolbar:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-addon-toolbar-example.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">

The <code>icon</code> element used in the example loads the icons from the <code>@storybook/components</code> package. See [here](../workflows/faq.md#what-icons-are-available-for-my-toolbar-or-my-addon) for the list of available icons that you can use.

</div>

### Tabs

Tab addons allow you to create your own custom tabs in Storybook. For example, the official [@storybook/addon-docs](../writing-docs/introduction.md) uses this pattern.

![Storybook tab addon](./storybook-tab.png)

Use this boilerplate code to add a new `Tab` to Storybook's UI:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-addon-tab-example.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->


<div class="aside">
Learn how to write your own addon that include these UI elements <a href="./writing-addons">here</a>.
</div>

## Preset addons

Storybook preset addons are grouped collections of `babel`, `webpack`, and `addons` configurations to integrate Storybook and other technologies. For example the official [preset-scss](https://github.com/storybookjs/presets/tree/master/packages/preset-scss) and [preset-create-react-app](https://github.com/storybookjs/presets/tree/master/packages/preset-create-react-app).

Use this boilerplate code while writing your own preset addon.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-preset-full-config-object.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">
Learn more about writing your own preset addon <a href="./writing-presets">here</a>.
</div>