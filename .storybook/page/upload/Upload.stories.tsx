import * as React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
  Props,
} from '@storybook/addon-docs/blocks';
import { Icon, Upload, UploadProps } from '../../../src/index';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export default {
  title: 'ReactUI/Upload',
  component: Upload,
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
          <Props />
        </>
      ),
    },
  },
} as Meta;

// ==============================================================================================================================================================================================================================================
export const Default: Story<UploadProps> = (args) => {
  return <Upload action="http://127.0.0.1:3001/upload-test" />;
};

// ==============================================================================================================================================================================================================================================
export const AssignAllProps: Story<UploadProps> = (args) => {
  /**
   * 如果需要跨域携带 cookie, 后端必须返回以下 response header
   *
   * 必须指定源地址, 不能是 *
   * Access-Control-Allow-Origin: http://127.0.0.1:6006
   *
   * 必须设置为 ture
   * Access-Control-Allow-Credentials: true
   *
   */
  return (
    <Upload
      action="http://127.0.0.1:3001/upload-test"
      name="abc"
      headers={{
        test: 'test',
      }}
      data={{
        test: 'test',
      }}
      withCredentials
      accept=".png"
      multiple
      defaultFileList={[
        {
          uid: `file-${Math.random()}`,
          size: 333,
          name: 'css.md',
          status: 'error',
          percentage: 50,
        },
        {
          uid: `file-${Math.random()}`,
          size: 111,
          name: 'javascript.md',
          status: 'uploading',
          percentage: 50,
        },
        {
          uid: `file-${Math.random()}`,
          size: 222,
          name: 'html.md',
          status: 'success',
          percentage: 25,
        },
      ]}
      beforeUpload={(file) => {
        // 返回 boolean 场景
        const maxSize = 1024 * 10000; // 10mb
        if (file.size > maxSize) {
          alert('文件大小必须小余或等于 10mb');
          return false;
        }
        return true;

        // 返回 promise 场景
        // 给文件重命名
        // const newFile = new File([file], 'new_name.docx', {
        //   type: file.type,
        // });
        // return Promise.resolve(newFile);
      }}
      onProgress={(percentage, q) => {}}
      onSuccess={(response, q) => {
        console.log(q);
      }}
      onError={(error) => {
        console.log('error', error);
      }}
    />
  );
};

// ==============================================================================================================================================================================================================================================
export const CustomUploadTriggerArea: Story<UploadProps> = (args) => {
  return (
    <Upload action="http://127.0.0.1:3001/upload-test">
      <h1>upload</h1>
    </Upload>
  );
};

// ==============================================================================================================================================================================================================================================
export const DraggerUpload: Story<UploadProps> = (args) => {
  return (
    <Upload action="http://127.0.0.1:3001/upload-test" drag>
      <Icon icon={faUpload} size="3x" theme="secondary" />
      <br />
      <div>Drag File to there</div>
    </Upload>
  );
};
