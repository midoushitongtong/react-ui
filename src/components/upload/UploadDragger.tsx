import classNames from 'classnames';
import React from 'react';

type OwnProps = {
  onFile: (files: FileList) => void;
};

type Props = OwnProps;

const UploadDragger: React.FC<Props> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = React.useState(false);
  const classes = classNames('upload-dragger', {
    'is-drag-over': dragOver,
  });

  // 添加 / 移除, 高亮 class
  const handleDrag = React.useCallback((e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  }, []);

  // 将选择的文件传递给父组件
  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setDragOver(false);
      onFile(e.dataTransfer.files);
    },
    [onFile]
  );

  return (
    <div
      className={classes}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}>
      {children}
    </div>
  );
};

export default UploadDragger;
