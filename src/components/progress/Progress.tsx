import React from 'react';
import './Progress.css';

export type ProgressThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

type OwnProps = {
  styles?: React.CSSProperties;
  percentage: number;
  height?: number;
  theme?: ProgressThemeProps;
  showText?: boolean;
};

export type ProgressProps = OwnProps;

const Progress: React.FC<ProgressProps> = (props) => {
  const { styles, percentage, height, theme, showText } = props;

  return (
    <div className="progress" style={styles}>
      <div
        className="progress-outer"
        style={{
          height: `${height}px`,
        }}>
        <div className={`progress-inner color-${theme}`} style={{ width: `${percentage}%` }}>
          {showText && <span className="text">{percentage}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  height: 23,
  showText: true,
  theme: 'primary',
};

export default Progress;
