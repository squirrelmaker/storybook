import { storiesOf, moduleMetadata } from '@storybook/angular';
import { Button } from '@storybook/angular/demo';

storiesOf('Legacy / Story with storiesOf()', module)
  .addDecorator(
    moduleMetadata({
      declarations: [Button],
    })
  )
  .add('with text', () => ({
    template: `<storybook-button-component [text]="text" (onClick)="onClick($event)"></storybook-button-component>`,
    props: {
      text: 'Hello Button',
      onClick: (event: any) => {
        console.log('some bindings work');
        console.log(event);
      },
    },
  }))
  .add('with some emoji', () => ({
    template: `<storybook-button-component [text]="text" (onClick)="onClick($event)"></storybook-button-component><storybook-button-component [text]="text" (onClick)="onClick($event)"></storybook-button-component>`,
    props: {
      text: '😀 😎 👍 💯',
      onClick: () => {},
    },
  }));
