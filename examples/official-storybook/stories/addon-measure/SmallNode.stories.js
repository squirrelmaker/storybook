import React from 'react';
import { Visualization } from '../../components/addon-measure/Visualization';

export default {
  title: 'Addons/Measure/SmallNode',
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <Visualization {...args} />;

export const Everything30px = Template.bind({});
Everything30px.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        outline: '1px solid black',
        width: 30,
        height: 30,
        margin: 32,
        padding: 16,
        border: '2px solid transparent',
      }}
    />
  ),
};

export const Short = Template.bind({});
Short.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        outline: '1px solid black',
        width: 100,
        height: 30,
        margin: 8,
      }}
    />
  ),
};

export const Narrow = Template.bind({});
Narrow.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        outline: '1px solid black',
        width: 30,
        height: 100,
        margin: 8,
      }}
    />
  ),
};

export const Tiny = Template.bind({});
Tiny.args = {
  render: (ref) => (
    <div
      ref={ref}
      style={{
        outline: '1px solid black',
        width: 20,
        height: 20,
        margin: 8,
      }}
    />
  ),
};
