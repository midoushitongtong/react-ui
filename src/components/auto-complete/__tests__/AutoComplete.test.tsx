import React from 'react';
import { config } from 'react-transition-group';
import { fireEvent, render, waitFor } from '@testing-library/react';
import AutoComplete, { AutoCompleteProps, DataSourceItem } from '../AutoComplete';

config.disabled = true;

const testArr: DataSourceItem[] = [
  { value: '1', text: 'product1' },
  { value: '2', text: 'product2' },
  { value: '3', text: 'product3' },
  { value: '4', text: 'product4' },
  { value: '5', text: 'product5' },
];

// 分类
describe('Test AutoComplete Component', () => {
  it('test basic AutoComplete behavior', async () => {
    const onSelect = jest.fn();

    const props: AutoCompleteProps = {
      fetchSuggestions: (keyword: string) => testArr.filter((item) => item.text.includes(keyword)),
      onSelect,
      placeholder: 'auto-complete',
    };

    const result = render(<AutoComplete {...props} />);

    const inputElement = result.getByPlaceholderText('auto-complete') as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: {
        value: 'product1',
      },
    });
    // 等待动画结束
    await waitFor(
      () => {
        // input 的值发生改变后, 下拉菜单的应该被更新
        expect(result.getByText('product1')).toBeInTheDocument();
      },
      {
        timeout: 350,
      }
    );

    // 应该只有 1 个下拉选项
    expect(result.container.querySelectorAll('.dropdown-list-item').length).toBe(1);

    fireEvent.click(result.getByText('product1'));
    // 选择下拉后 回调参数是否正确
    expect(onSelect).toHaveBeenLastCalledWith('1', {
      value: '1',
      text: 'product1',
    });
    // 选择下拉后 input 的值是否被改变
    expect(inputElement.value).toBe('product1');
  });

  it('should provide keyword support', async () => {
    const props: AutoCompleteProps = {
      fetchSuggestions: (keyword: string) => testArr.filter((item) => item.text.includes(keyword)),
      placeholder: 'auto-complete',
    };

    const result = render(<AutoComplete {...props} />);

    const inputElement = result.getByPlaceholderText('auto-complete') as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: {
        value: 'product',
      },
    });
    // 等待动画结束
    await waitFor(
      () => {
        // input 的值发生改变后, 下拉菜单的应该被更新
        expect(result.getByText('product1')).toBeInTheDocument();
      },
      {
        timeout: 350,
      }
    );

    fireEvent.keyDown(inputElement, {
      key: 'ArrowDown',
    });
    // 键盘↓按下，第 1 个选项应该被高亮
    expect(result.getByText('product1')).toHaveClass('highlight');
    fireEvent.keyDown(inputElement, {
      key: 'ArrowDown',
    });
    // 键盘↓按下，第 2 个选项应该被高亮
    expect(result.getByText('product2')).toHaveClass('highlight');
    fireEvent.keyDown(inputElement, {
      key: 'ArrowUp',
    });
    // 键盘↑按下，第 1 个选项应该被高亮
    expect(result.getByText('product1')).toHaveClass('highlight');
  });

  it('click outside should hide the dropdown', async () => {
    const props: AutoCompleteProps = {
      fetchSuggestions: (keyword: string) => testArr.filter((item) => item.text.includes(keyword)),
      placeholder: 'auto-complete',
    };

    const result = render(<AutoComplete {...props} />);

    const inputElement = result.getByPlaceholderText('auto-complete') as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: {
        value: 'product',
      },
    });
    // 等待动画结束
    await waitFor(
      () => {
        // input 的值发生改变后, 下拉菜单的应该被更新
        expect(result.getByText('product1')).toBeInTheDocument();
      },
      {
        timeout: 350,
      }
    );

    fireEvent.click(document);
    // 点击了外部区域, 应该隐藏下拉列表
    expect(result.queryByText('product1')).not.toBeInTheDocument();
  });

  it('renderOption should generate the right template', async () => {
    const props: AutoCompleteProps = {
      fetchSuggestions: (keyword: string) => testArr.filter((item) => item.text.includes(keyword)),
      placeholder: 'auto-complete',
      renderSelectOption: (text) => <span className="custom-option">{text}</span>,
    };

    const result = render(<AutoComplete {...props} />);

    const inputElement = result.getByPlaceholderText('auto-complete');

    fireEvent.change(inputElement, {
      target: {
        value: 'product',
      },
    });

    // 等待动画结束
    await waitFor(
      () => {
        // input 的值发生改变后, 下拉菜单的应该被更新
        expect(result.queryByText('product1')).toBeInTheDocument();
      },
      {
        timeout: 350,
      }
    );
  });

  it('async fetchSuggestion shoud work fine', async () => {
    const props: AutoCompleteProps = {
      fetchSuggestions: (keyword: string) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(testArr.filter((item) => item.text.includes(keyword)));
          }, 1000);
        }),
      placeholder: 'auto-complete',
    };

    const result = render(<AutoComplete {...props} />);

    const inputElement = result.getByPlaceholderText('auto-complete');

    fireEvent.change(inputElement, {
      target: {
        value: 'product',
      },
    });

    // 等待动画和 fetchSuggestion 结束
    await waitFor(
      () => {
        // input 的值发生改变后, 下拉菜单的应该被更新
        expect(result.queryByText('product1')).toBeInTheDocument();
      },
      {
        timeout: 1350,
      }
    );
  });
});
