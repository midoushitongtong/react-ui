import React from 'react';
import useMousePosition from '../hooks/useMousePosition';
// import useMousePosition from '../hoos/useMousePosition';
import withMousePosition, { WithMousePositionProps } from './WithMousePosition';

// hoc 版
const MousePositionHocInner: React.FC<WithMousePositionProps> = ({ position }) => {
  return (
    <div>
      <p>x: {position.x}</p>
      <p>y: {position.y}</p>
    </div>
  );
};

const MousePositionHoc = withMousePosition(MousePositionHocInner);

// hook 版
const MouseTrackerHook: React.FC = () => {
  const position = useMousePosition();

  return (
    <div>
      <p>x: {position.x}</p>
      <p>y: {position.y}</p>
    </div>
  );
};

const MouseTracker: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  const toggleVisible = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <div>
      {visible && <MousePositionHoc />}
      {visible && <MouseTrackerHook />}
      <button onClick={toggleVisible}>toggle</button>
    </div>
  );
};

export default MouseTracker;
