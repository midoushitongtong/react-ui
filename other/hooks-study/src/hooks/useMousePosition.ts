import React from 'react';

const useMousePosition = () => {
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    console.log('add effect');

    const updatePosition = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener('mousemove', updatePosition);

    // 每次执行 effect 会清除上次的 effect
    return () => {
      console.log('remove effect');

      document.removeEventListener('mousemove', updatePosition);
    };

    // 第二个参数是, effect 的依赖, 当依赖变化了会重新执行 effect
    // 如果只想执行一次 effect, 可以传递空数组给第二个参数, 表示没有任何依赖
  }, []);

  return position;
};

export default useMousePosition;
