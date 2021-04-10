import React from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './MenuItem';
import './Menu.css';

type MenuModel = 'horizontal' | 'vertical';

type SelectCallback = (selectIndex: string) => void;

export type MenuProps = {
  className?: string;
  style?: React.CSSProperties;
  mode?: MenuModel;
  defaultIndex?: string;
  defaultOpenSubMenus?: string[];
  onSelect?: SelectCallback;
};

type MenuContextType = {
  mode?: MenuModel;
  index: string;
  defaultOpenSubMenus?: string[];
  onSelect?: SelectCallback;
};

export const MenuContext = React.createContext<MenuContextType>({
  index: '0',
});

const Menu: React.FC<MenuProps> = (props) => {
  const { children, className, style, mode, defaultIndex, defaultOpenSubMenus, onSelect } = props;

  // 高亮 index
  const [index, setIndex] = React.useState(defaultIndex);

  const classes = classNames('menu', className, {
    'menu-horizontal': mode === 'horizontal',
    'menu-vertical': mode === 'vertical',
  });

  // 处理菜单项点击
  const handleSelect = React.useCallback(
    (index: string) => {
      setIndex(index);
      onSelect && onSelect(index);
    },
    [onSelect]
  );

  // 每个菜单独立的上下文
  const transferContext: MenuContextType = {
    mode,
    index: index ?? '0',
    defaultOpenSubMenus,
    onSelect: handleSelect,
  };

  // 渲染菜单
  const renderChildren = React.useCallback(() => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;

      const { name } = childElement.type;

      if (name === 'MenuItem' || name === 'MenuSubMenuItem') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.warn(
          `<Menu> child must be "<MenuItem>" or "<MenuSubMenuItem>" current is: "<${
            name || childElement.type
          }>"`
        );
      }
    });
  }, [children]);

  return (
    <MenuContext.Provider value={transferContext}>
      <ul className={classes} style={style} data-testid="menu">
        {renderChildren()}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
