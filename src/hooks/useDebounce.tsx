import React from 'react';

const useDebounce = (value: any, delay = 300) => {
  const [debounceValue, setDebounceValue] = React.useState(value);

  // 每当 value 改变, 延迟更新 debounceValue
  React.useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // 在下次执行 effect 函数体之前, 清空 handler
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
