import React from 'react';
import classNames from 'classnames';
import './Button.css';

type ButtonType = 'default' | 'primary' | 'danger' | 'link';

type ButtonSise = 'lg' | 'sm';

type OwnProps = {
  className?: string;
  type?: ButtonType;
  size?: ButtonSise;
  disabled?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

// 移除 "type" 以及 "onClick" 属性, 防止和 OwnProps 冲突
type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' | 'onClick'>;

// 移除 "onClick" 属性, 防止和 OwnProps 冲突
type NativeAnchorProps = Omit<React.AnchorHTMLAttributes<HTMLElement>, 'onClick'>;

export type ButtonProps = OwnProps & Partial<NativeButtonProps & NativeAnchorProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, type, size, disabled, href, ...restProps } = props;

  const classes = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    // 超链接类型的按钮, 需要将 disabed 添加到 class 中
    disabled: type === 'link' && disabled,
  });

  if (type === 'link' && href) {
    return (
      <a
        {...restProps}
        href={href}
        className={classes}
        onClick={!disabled ? restProps.onClick : () => {}}>
        {children}
      </a>
    );
  }

  return (
    <button {...restProps} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  type: 'default',
};

export default Button;
