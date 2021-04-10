import React from 'react';

const LikeButton: React.FC = () => {
  // state 钩子
  const [like, setObj] = React.useState(0);
  const [visible, setVisible] = React.useState(true);
  const likeRef = React.useRef(0);
  const didMountRef = React.useRef(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  // ref 在整个组件中只保持一个引用, 所以每次获取 ref 的值都是最新的
  // ref 的更新不会触发 render

  const plusLike = React.useCallback(() => {
    setObj(like + 1);
    likeRef.current++;
  }, [like]);

  const toggleVisible = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const showLike = () => {
    setTimeout(() => {
      alert(likeRef.current);
    }, 1000);
  };

  // effect 钩子(组件渲染完成后执行)
  React.useEffect(() => {
    document.title = `点击了${like}次`;
  }, [like]);

  React.useEffect(() => {
    if (didMountRef.current) {
      console.log('更新组件');
    } else {
      didMountRef.current = true;
    }
  });

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <>
      {visible && <button onClick={plusLike}>{like} +1</button>}
      <button onClick={toggleVisible}>{visible ? 'hide' : 'show'}</button>
      <button onClick={showLike}>show like</button>
      <input ref={inputRef} />
    </>
  );
};

export default LikeButton;
