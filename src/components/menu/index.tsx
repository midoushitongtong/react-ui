import React from 'react';
import Menu, { MenuProps } from './Menu';
import MenuItem, { MenuItemProps } from './MenuItem';
import MenuSubMenuItem, { MenuSubMenuItemProps } from './MenuSubMenuItem';

// 合并 menu 组件, 为了能够更方便的进行调用, 就类似这样<Menu.Item>, <Menu.SubMenuItem>
export type CombineMenuProps = React.FC<MenuProps> & {
  Item: React.FC<MenuItemProps>;
  SubMenuItem: React.FC<MenuSubMenuItemProps>;
};

const CombineMenu = Menu as CombineMenuProps;

CombineMenu.Item = MenuItem;
CombineMenu.SubMenuItem = MenuSubMenuItem;

export default CombineMenu;

export * from './Menu';

export * from './MenuItem';

export * from './MenuSubMenuItem';
