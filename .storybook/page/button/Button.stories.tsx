import * as React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Props,
} from '@storybook/addon-docs/blocks';
import { Button, ButtonProps } from '../../../src/index';

export default {
  title: 'ReactUI/Button',
  component: Button,
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
          <Props />
        </>
      ),
    },
  },
} as Meta;

// ==============================================================================================================================================================================================================================================
export const Default: Story<ButtonProps> = (args) => <Button {...args}>default button</Button>;

// ==============================================================================================================================================================================================================================================
export const Size: Story<ButtonProps> = (args) => (
  <>
    <Button {...args} size="sm">
      sm button
    </Button>
    <Button {...args}>default size</Button>
    <Button {...args} size="lg">
      large button
    </Button>
  </>
);

// ==============================================================================================================================================================================================================================================
export const Type: Story<ButtonProps> = (args) => (
  <>
    <Button {...args} type="primary">
      primary button
    </Button>
    <Button {...args} type="danger">
      danger button
    </Button>
    <Button {...args} type="link" target="_blank" href="https://test.com">
      link button
    </Button>
  </>
);
