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
import { Menu, MenuProps } from '../../../src/index';

export default {
  title: 'ReactUI/Menu',
  component: Menu,
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
export const Horizontal: Story<MenuProps> = (args) => (
  <Menu
    {...args}
    onSelect={(index) => {
      console.log(index);
    }}>
    <Menu.Item>link1</Menu.Item>
    <Menu.Item>link2</Menu.Item>
    <Menu.SubMenuItem title="dropdown">
      <Menu.Item>dropdown1</Menu.Item>
      <Menu.Item>dropdown2</Menu.Item>
    </Menu.SubMenuItem>
    <Menu.Item disabled>link4</Menu.Item>
  </Menu>
);

// ==============================================================================================================================================================================================================================================
export const Vertical: Story<MenuProps> = (args) => (
  <Menu
    mode="vertical"
    defaultOpenSubMenus={['2']}
    onSelect={(index) => {
      console.log(index);
    }}>
    <Menu.Item>link1</Menu.Item>
    <Menu.Item>link2</Menu.Item>
    <Menu.SubMenuItem title="dropdown">
      <Menu.Item>dropdown1</Menu.Item>
      <Menu.Item>dropdown2</Menu.Item>
    </Menu.SubMenuItem>
    <Menu.Item disabled>link4</Menu.Item>
  </Menu>
);
