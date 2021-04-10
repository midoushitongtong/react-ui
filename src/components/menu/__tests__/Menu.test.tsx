import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from '../Menu';
import MenuItem from '../MenuItem';
import MenuSubMenuItem from '../MenuSubMenuItem';

// 创建子菜单所需的样式(测试的时候是不包含任何 css 样式的, 如果某些样式, 需要手动添加)
const createSubMenuStyleElement = () => {
  const cssFile = `
    /* 子菜单默认隐藏 */
    .menu-submenu {
      display: none;
    }
    /* 有 is-open 就显示 */
    .menu-submenu.is-open {
      display: block;
    }
  `;
  const styleElement = document.createElement('style');
  styleElement.innerHTML = cssFile;
  return styleElement;
};

describe('test Menu and MenuItem Component', () => {
  beforeEach(() => {
    // 预处理工作, 这里先不弄
    // 每次完成后会自动 cleanup()
  });

  // 默认菜单
  it('should render correct Menu and MenuItem based on default props', () => {
    const props: MenuProps = {
      defaultIndex: '0',
      className: 'test',
    };

    const result = render(
      <Menu {...props}>
        <MenuItem>one</MenuItem>
        <MenuItem>two</MenuItem>
        <MenuItem disabled>three</MenuItem>
      </Menu>
    );

    const menuElement = result.getByTestId('menu');
    const oneElement = result.getByText('one');
    const threeElement = result.getByText('three');

    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(oneElement).toBeInTheDocument();
    // 第 1 个菜单项应该被激活
    expect(oneElement).toHaveClass('menu-item is-active');
    expect(threeElement).toBeInTheDocument();
    // 第 3 个菜单项应该被禁用
    expect(threeElement).toHaveClass('menu-item is-disabled');
  });

  // 菜单项能否正常点击, disabled 的菜单不能被点击
  it('click item shoud change active and call the right callback', () => {
    const onSelect = jest.fn();

    const props: MenuProps = {
      defaultIndex: '0',
      onSelect,
    };

    const result = render(
      <Menu {...props}>
        <MenuItem>one</MenuItem>
        <MenuItem>two</MenuItem>
        <MenuItem disabled>three</MenuItem>
      </Menu>
    );

    const oneElement = result.getByText('one');
    const twoElement = result.getByText('two');
    const threeElement = result.getByText('three');

    fireEvent.click(twoElement);
    // 点击后, 第 2 个菜单项应该被激活
    expect(twoElement).toHaveClass('is-active');
    // 点击后, 第 1 个菜单项应该移除激活
    expect(oneElement).not.toHaveClass('is-active');
    // 点击后, onSelect 方法应该被调用过一次
    expect(onSelect.mock.calls.length).toBe(1);
    // 点击后, onSelect 的 arguments 应该是 '1' (第 2 个菜单的 index)
    expect(onSelect).toHaveBeenCalledWith('1');

    fireEvent.click(threeElement);
    // 点击后,第 3 个菜单项点击了不会添加激活 class (因为添加了 disabled props)
    expect(threeElement).not.toHaveClass('is-active');
    // 点击后,第 3 个菜单项点击了不会触发 onSelect (因为添加了 disabled props)
    expect(onSelect.mock.calls.length).toBe(1);
  });

  // 布局类型(垂直布局)
  it('shoud render vertical mode when mode is set to vertial', () => {
    const props: MenuProps = {
      mode: 'vertical',
    };

    const result = render(
      <Menu {...props}>
        <MenuItem>one</MenuItem>
        <MenuItem>two</MenuItem>
        <MenuItem disabled>three</MenuItem>
      </Menu>
    );

    const menuElement = result.getByTestId('menu');

    expect(menuElement).toHaveClass('menu-vertical');
  });

  // 测试子菜单
  it('shoud render sub menu', async () => {
    const onSelect = jest.fn();
    const props: MenuProps = {
      onSelect,
    };

    const result = render(
      <Menu {...props}>
        <MenuItem>one</MenuItem>
        <MenuSubMenuItem title="two">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
          <MenuItem>dropdown3</MenuItem>
        </MenuSubMenuItem>
        <MenuItem>three</MenuItem>
      </Menu>
    );

    // 添加 submenu 所需样式
    result.container.append(createSubMenuStyleElement());

    const twoElement = result.getByText('two');

    // 默认子菜单应该是隐藏的
    expect(result.queryByText('dropdown1')).toBeNull();

    fireEvent.mouseEnter(twoElement);
    await waitFor(
      () => {
        // 鼠标经过后, 子菜单应该是显示的
        expect(result.queryByText('dropdown1')).toBeInTheDocument();
      },
      {
        timeout: 350,
      }
    );

    fireEvent.click(result.getByText('dropdown1'));
    // 子菜单点击后, onSelect 的 arguments 应该是 '1-0'(子菜单的 index)
    expect(onSelect).toHaveBeenCalledWith('1-0');

    fireEvent.mouseLeave(twoElement);
    await waitFor(
      () => {
        // 鼠标离开后, 子菜单应该隐藏
        expect(result.queryByText('dropdown1')).toBeNull();
      },
      {
        timeout: 350,
      }
    );
  });

  // 测试子菜单(垂直布局)
  it('shoud render sub menu with vertical mode', async () => {
    const onSelect = jest.fn();
    const props: MenuProps = {
      mode: 'vertical',
      onSelect,
    };

    const result = render(
      <Menu {...props}>
        <MenuItem>one</MenuItem>
        <MenuSubMenuItem title="two">
          <MenuItem>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
          <MenuItem>dropdown3</MenuItem>
        </MenuSubMenuItem>
        <MenuItem>three</MenuItem>
      </Menu>
    );

    // 添加 submenu 所需样式
    result.container.append(createSubMenuStyleElement());

    const twoElement = result.getByText('two');

    // 默认子菜单应该是隐藏的
    expect(result.queryByText('dropdown1')).toBeNull();

    fireEvent.mouseEnter(twoElement);
    await waitFor(
      () => {
        // 鼠标经过后, 子菜单应该是隐藏的(只有 horizontal 类型的菜单鼠标经过才显示)
        expect(result.queryByText('dropdown1')).toBeNull();
      },
      {
        timeout: 350,
      }
    );

    fireEvent.click(twoElement);
    await waitFor(
      () => {
        // 鼠标点击后, 子菜单应该是显示的(只有 vertical 类型的菜单鼠标点击才显示)
        expect(result.queryByText('dropdown1')).toBeInTheDocument();
      },
      {
        timeout: 350,
      }
    );

    fireEvent.click(twoElement);
    await waitFor(
      () => {
        // 再次点击的菜单, 应该隐藏子菜单
        expect(result.queryByText('dropdown1')).toBeNull();
      },
      {
        timeout: 350,
      }
    );
  });
});
