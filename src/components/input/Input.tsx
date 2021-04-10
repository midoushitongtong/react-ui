import React from 'react';
import classNames from 'classnames';
import './Input.css';

export type InputSize = 'sm' | 'lg';

type OwnProps = {
  className?: string;
  disabled?: boolean;
  size?: InputSize;
  icon?: React.ReactElement | null;
  prepend?: string | React.ReactElement | null;
  append?: string | React.ReactElement | null;
  // 明确 change 事件的回调参数
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// 移除 "size" 以及 "onChange" 属性, 防止和 OwnProps 冲突
type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLElement>, 'size' | 'onChange'>;

export type InputProps = OwnProps & NativeInputProps;

const Input: React.FC<InputProps> = (props) => {
  const { className, disabled, size, icon, prepend, append, ...restProps } = props;

  // input 容器样式
  const classes = classNames('input-wrapper', className, {
    [`input-size-${size}`]: size,
    'is-input-group-prepend': !!prepend,
    'is-input-group-append': !!append,
  });

  // input 样式
  const inputInnerClasses = classNames('input-inner', {
    'is-icon': !!icon,
  });

  if ('value' in props) {
    // 这是一段帮助使用的时候规避一些错误的代码
    // 如果传递了 value 需要删除 defaultValue, 这两个 props 不能共存
    delete restProps.defaultValue;

    // 这是一段帮助使用的时候规避一些错误的代码
    // 如果 value 是 undefined 或 null, 那么如果当 value 发生变化的时候就会从非受控组件转换成受控组件, react 会报一个 warning, 因为不建议从非受控组件转换成受控组件
    // 解决的办法是手动给空字符串即可, 让其变成受控组件
    if (typeof props.value === 'undefined' || props.value === null) {
      restProps.value = '';
    }
  }

  return (
    <div className={classes}>
      {/* prepend */}
      {prepend && <div className="input-group-prepend">{prepend}</div>}

      {/* input */}
      <input className={inputInnerClasses} disabled={disabled} {...restProps} />

      {/* append */}
      {append && <div className="input-group-append">{append}</div>}

      {/* icon */}
      {icon && <div className="icon-wrapper">{icon}</div>}
    </div>
  );
};

Input.defaultProps = {};

export default Input;
