import axios from 'axios';
import React from 'react';
import Button from '../button/Button';
import UploadDragger from './UploadDragger';
import UploadFileList from './UploadFileList';
import './Upload.css';

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

// 上传文件的状态
export type UploadFile = {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percentage?: number;
  raw?: File;
  response?: any;
  error?: any;
};

type OwnProps = {
  // 上传的地址
  action: string;
  // 请求头
  headers?: {
    [key: string]: any;
  };
  // 请求体
  data?: {
    [key: string]: any;
  };
  // 表单 name
  name?: string;
  // 是否携带 cookie
  withCredentials?: boolean;
  // 默认上传文件列表
  defaultFileList?: UploadFile[];
  // 原生 input 属性
  accept?: string;
  // 原生 input 属性
  multiple?: boolean;
  // 是否支持拖拽上传
  drag?: boolean;
  // input change 回调
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // 上传前的验证
  beforeUpload?: (file: File) => boolean | Promise<File>;
  // 上传进度回调
  onProgress?: (percentage: number, uploadFile: UploadFile) => void;
  // 上传成功
  onSuccess?: (data: any, uploadFile: UploadFile) => void;
  // 上传失败
  onError?: (error: any, uploadFile: UploadFile) => void;
  // 删除上传文件
  onRemove?: (uploadFile: UploadFile) => void;
};

export type UploadProps = OwnProps;

const Upload: React.FC<UploadProps> = (props) => {
  const {
    children,
    action,
    defaultFileList,
    headers,
    data,
    name,
    withCredentials,
    accept,
    multiple,
    drag,
    beforeUpload,
    onChange,
    onProgress,
    onSuccess,
    onError,
    onRemove,
  } = props;

  // 上传文件的列表
  const [uploadFileList, setUploadFileList] = React.useState<UploadFile[]>(defaultFileList || []);

  const fileInput = React.useRef<HTMLInputElement>(null);

  // 删除上传文件
  const handleRemove = React.useCallback(
    (uploadFile: UploadFile) => {
      setUploadFileList((prev) => prev.filter((item) => item.uid !== uploadFile.uid));
      if (onRemove) {
        onRemove(uploadFile);
      }
    },
    [setUploadFileList, onRemove]
  );

  // 更新上传文件的状态
  const updateUploadFileList = React.useCallback(
    (uploadFile: UploadFile, updateData: Partial<UploadFile>) => {
      setUploadFileList((prev) => {
        return prev.map((file) => {
          if (file.uid === uploadFile.uid) {
            return {
              ...file,
              ...updateData,
            };
          }
          return file;
        });
      });
    },
    []
  );

  // 上传文件到服务器
  const postFile = React.useCallback(
    (file: File) => {
      // 组成上传文件的状态
      const uploadFile: UploadFile = {
        uid: `file-${Math.random()}`,
        status: 'ready',
        name: file.name,
        size: file.size,
        percentage: 0,
        raw: file,
      };
      setUploadFileList((prev) => [uploadFile, ...prev]);

      // 组成 post 的数据
      const formData = new FormData();
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }
      formData.append(name || 'file', file);

      // 上传文件到服务器
      axios
        .post(action, formData, {
          withCredentials,
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (e) => {
            const percentage = Math.round((e.loaded * 100) / e.total) || 0;

            // 更新上传文件的状态
            updateUploadFileList(uploadFile, {
              percentage,
              status: 'uploading',
            });

            if (onProgress) {
              onProgress(percentage, uploadFile);
            }
          },
        })
        .then((response) => {
          // 更新上传文件的状态
          updateUploadFileList(uploadFile, {
            status: 'success',
            response,
          });

          if (onSuccess) {
            onSuccess(response, {
              ...uploadFile,
              status: 'success',
              response,
            });
          }
        })
        .catch((error) => {
          // 更新上传文件的状态
          updateUploadFileList(uploadFile, {
            status: 'error',
            error,
          });

          if (onError) {
            onError(error, {
              ...uploadFile,
              status: 'error',
              error,
            });
          }
        });
    },
    [
      action,
      headers,
      data,
      name,
      withCredentials,
      onProgress,
      onSuccess,
      onError,
      updateUploadFileList,
    ]
  );

  // 执行上传文件
  const uploadFiles = React.useCallback(
    (files: FileList) => {
      // 将伪书组转换成真数组
      let filesArray = Array.from(files);

      filesArray.forEach((file) => {
        if (!beforeUpload) {
          postFile(file);
        } else {
          const result = beforeUpload(file);
          if (result && result instanceof Promise) {
            result.then((newFile) => {
              postFile(newFile);
            });
          } else if (result !== false) {
            postFile(file);
          }
        }
      });
    },
    [postFile, beforeUpload]
  );

  // 表单 change 事件
  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (onChange) {
        onChange(e);
      }

      if (!files) {
        return;
      }

      uploadFiles(files);

      // 清空表单值
      if (fileInput.current?.value) {
        fileInput.current.value = '';
      }
    },
    [onChange, uploadFiles]
  );

  // 渲染触发上传的html
  const renderUploadTriggerArea = React.useCallback(() => {
    return children || <Button type="primary">Upload File</Button>;
  }, [children]);

  return (
    <div className="upload-file-container">
      {/* 按钮 */}
      <div
        className="upload-trigger-area"
        onClick={() => {
          fileInput.current?.click();
        }}>
        {drag ? (
          <UploadDragger onFile={(files) => uploadFiles(files)}>
            {renderUploadTriggerArea()}
          </UploadDragger>
        ) : (
          renderUploadTriggerArea()
        )}
      </div>

      {/* input 表单 */}
      <input
        className="upload-file-input"
        type="file"
        ref={fileInput}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />

      {/* 展示当前上传的文件列表 */}
      <UploadFileList uploadFileList={uploadFileList} onRemove={handleRemove} />
    </div>
  );
};

Upload.defaultProps = {
  withCredentials: false,
  drag: false,
};

export default Upload;
