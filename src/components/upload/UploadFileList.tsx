import {
  faCheckCircle,
  faFileAlt,
  faSpinner,
  faTimes,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Icon from '../icon/Icon';
import Progress from '../progress/Progress';
import { UploadFile } from './Upload';

type OwnProps = {
  uploadFileList: UploadFile[];
  onRemove: (uploadFile: UploadFile) => void;
};

export type UploadFileListProps = OwnProps;

const UploadFileList: React.FC<UploadFileListProps> = (props) => {
  const { uploadFileList, onRemove } = props;

  return (
    <ul className="upload-file-list">
      {uploadFileList.map((item) => {
        return (
          <li className="upload-file-list-item" key={item.uid}>
            {/* 文件名称 */}
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon={faFileAlt} theme="secondary" />
              {item.name}
            </span>

            {/* 不同上传状态对应不同的图标 */}
            <span className="file-status">
              {item.status === 'uploading' && <Icon icon={faSpinner} spin theme="primary" />}
              {item.status === 'success' && <Icon icon={faCheckCircle} theme="success" />}
              {item.status === 'error' && <Icon icon={faTimesCircle} theme="danger" />}
            </span>

            {/* 删除当前上传的文件 */}
            <span className="file-actions">
              <Icon icon={faTimes} className="icon-times" onClick={() => onRemove(item)} />
            </span>

            {/* 进度条提示 */}
            {item.status === 'uploading' && <Progress percentage={item.percentage || 0} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadFileList;
