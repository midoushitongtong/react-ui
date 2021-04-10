import React from 'react';

type Props = {
  text?: string;
};

export type RefTestRef = {
  toggleIsVisibleText: () => void;
};

const RefTest = React.forwardRef<RefTestRef, Props>((props, ref) => {
  const [isVisibleText, setIsVisibleText] = React.useState(true);

  React.useImperativeHandle(ref, () => ({
    toggleIsVisibleText: () => {
      setIsVisibleText(!isVisibleText);
    },
  }));

  return isVisibleText ? <span>{props.text}</span> : null;
});

RefTest.defaultProps = {
  text: 'default text',
};

export default RefTest;
