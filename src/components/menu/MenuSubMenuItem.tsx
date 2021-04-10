import React from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';
import Icon from '../icon/Icon';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Transition from '../transition/Transition';

export type MenuSubMenuItemProps = {
  className?: string;
  index?: string;
  title: string;
};

const MenuSubMenuItem: React.FC<MenuSubMenuItemProps> = (props) => {
  const { children, className, index, title } = props;

  const menu = React.useContext(MenuContext);

  // 是否显示子菜单
  const [open, setOpen] = React.useState(
    // 如果是垂直布局的菜单, 判断是否需要默认展开子菜单
    menu.mode === 'vertical' && menu.defaultOpenSubMenus && index
      ? menu.defaultOpenSubMenus.includes(index)
      : false
  );

  const classes = classNames('menu-item menu-submenu-item', className, {
    // 根据子菜单的 index 来设置高亮
    'is-active': menu.index.split('-')[0] === index,
    'is-open': open,
  });

  // 显示 / 隐藏子菜单
  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(!open);
    },
    [open]
  );

  // 显示 / 隐藏子菜单
  const handleMouse = React.useCallback((e: React.MouseEvent, isOpen: boolean) => {
    e.preventDefault();
    setOpen(isOpen);
  }, []);

  // 渲染子菜单
  const renderSubMenu = React.useCallback(() => {
    const menuSubMenuItemChildren = React.Children.map(children, (child, index2) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;

      const { name } = childElement.type;

      if (childElement.type.name === 'MenuItem') {
        return React.cloneElement(childElement, {
          // 自身的 index + 子菜单的 index
          // 1-1, 1-2, 1-3, 2-1, 2-2, 2-3, ...
          index: `${index}-${index2}`,
        });
      } else {
        console.warn(
          `<MenuSubMenuItem> child must be "<MenuItem>" current is: "<${
            name || childElement.type
          }>"`
        );
      }
    });

    return (
      <Transition in={open} timeout={300} animation="zoom-in-top">
        <ul className="menu-submenu">
          <div className="menu-submenu-content">{menuSubMenuItemChildren}</div>
        </ul>
      </Transition>
    );
  }, [children, index, open]);

  return (
    <li
      key={index}
      className={classes}
      onMouseEnter={menu.mode === 'horizontal' ? (e) => handleMouse(e, true) : undefined}
      onMouseLeave={menu.mode === 'horizontal' ? (e) => handleMouse(e, false) : undefined}>
      <div
        className="menu-submenu-title"
        onClick={menu.mode === 'vertical' ? handleClick : undefined}>
        {title}
        <Icon icon={faAngleDown} className="arrow-icon" />
      </div>
      {renderSubMenu()}
    </li>
  );
};

export default MenuSubMenuItem;
