import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Input, { InputProps } from '../Input';

// 分类
describe('Test Input Component', () => {
  it('should render the correct default input', () => {
    const onChange = jest.fn();

    const props: InputProps = {
      placeholder: 'input',
      onChange,
    };

    const result = render(<Input {...props} />);

    const element = result.getByPlaceholderText('input') as HTMLInputElement;

    // 应该能够根据 placeholder 找到 html input
    expect(element).toBeInTheDocument();
    // 应该包含的 class
    expect(element).toHaveClass('input-inner');
    fireEvent.change(element, {
      target: {
        value: '123',
      },
    });
    // change 事件能够被调用
    expect(onChange).toHaveBeenCalled();
    // input 的值应该已经修改
    expect(element.value).toEqual('123');
  });

  it('should render the disabled Input on disabled property', () => {
    const props: InputProps = {
      disabled: true,
    };

    const result = render(<Input placeholder="disable" {...props} />);

    const element = result.getByPlaceholderText('disable') as HTMLInputElement;

    // input 应该被禁用
    expect(element.disabled).toBeTruthy();
  });

  it('should render different Input size on size property', () => {
    const result = render(<Input placeholder="lg" size="lg" />);

    const element = result.container.querySelector('.input-wrapper');

    // 应该包含的 class
    expect(element).toHaveClass('input-size-lg');

    const result2 = render(<Input placeholder="sm" size="sm" />);

    const element2 = result2.container.querySelector('.input-wrapper');

    // 应该包含的 class
    expect(element2).toHaveClass('input-size-sm');
  });

  it('should render prepend and append element on prepend/append property', () => {
    const result = render(<Input placeholder="input" prepend="a" append="b" />);

    const element = result.container.querySelector('.input-wrapper');

    // 应该包含的 class
    expect(element).toHaveClass('is-input-group-prepend is-input-group-append');

    // 能正常渲染 prepend
    expect(result.queryByText('a')).toBeInTheDocument();

    // 能正常渲染 append
    expect(result.queryByText('b')).toBeInTheDocument();
  });
});
