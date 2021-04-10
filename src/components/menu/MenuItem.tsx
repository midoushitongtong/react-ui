import React from 'react';
import classNames from 'classnames';
import { MenuContext } from './Menu';

export type MenuItemProps = {
  className?: string;
  style?: React.CSSProperties;
  index?: string;
  disabled?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { children, className, style, index, disabled } = props;

  const menu = React.useContext(MenuContext);

  const classes = classNames('menu-item', className, {
    'is-active': menu.index === index,
    'is-disabled': disabled,
  });

  // 菜单点击, 更新高亮
  const handleClick = React.useCallback(() => {
    if (menu.onSelect && !disabled && index !== undefined) {
      menu.onSelect(index);
    }
  }, [menu, disabled, index]);

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
