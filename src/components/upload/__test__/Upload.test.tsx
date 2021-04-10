import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Upload, { UploadProps } from '../Upload';
import axios from 'axios';

jest.mock('axios');

describe('test Upload Component', () => {
  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    // 模拟 axios post 方法返回的结果(后续要是组件内调用了 axios.post 方法都会返回此结果)
    // 简化的写法
    mockedAxios.post.mockResolvedValue({
      user: 'hello world',
    });

    // 复杂的写法
    // mockedAxios.post.mockImplementation(() =>
    //   Promise.resolve({
    //     user: 'hello world',
    //   })
    // );
  });

  it('upload progress should works fine', async () => {
    const props: UploadProps = {
      action: 'fakerurl.com',
      onSuccess: jest.fn(),
      onRemove: jest.fn(),
    };

    const result = render(<Upload {...props}>Click to upload</Upload>);
    const fileInput = result.container.querySelector('.upload-file-input') as HTMLInputElement;
    const trigArea = result.getByText('Click to upload');

    // 应该能够正常渲染 children, 也就是 Click to upload
    expect(trigArea).toBeInTheDocument();
    // 应该能通过 class 名称找到对应的 input
    expect(fileInput).toBeInTheDocument();
    // 模拟用户选择了某个文件
    fireEvent.change(fileInput, {
      target: {
        files: [
          new File(['abc'], 'test.jpg', {
            type: 'image/jpeg',
          }),
        ],
      },
    });
    // 等待文件上传完成
    await waitFor(
      () => {
        // 展示当前上传的文件列表中(UploadFileList.tsx), 应该包含 test.jpg
        expect(result.queryByText('test.jpg')).toBeInTheDocument();
      },
      {
        timeout: 350,
      }
    );
    // 文件上传完成后 onSuccess 方法应该被调用
    expect(props.onSuccess).toHaveBeenCalledWith(
      // 第一个参数应该是 api 返回的数据
      expect.objectContaining({ user: 'hello world' }),
      // 第二个参数是文件数据
      expect.objectContaining({ name: 'test.jpg', status: 'success' })
    );
    // 上传成功后, 应该有对应的删除文件按钮
    expect(result.container.querySelector('.icon-times')).toBeInTheDocument();
    // 删除当前上传的文件
    fireEvent.click(result.container.querySelector('.icon-times') as HTMLElement);
    // 文件应该被删除了
    expect(result.queryByText('test.jpg')).not.toBeInTheDocument();
    // 文件删除后 onRemove 方法应该被调用
    expect(props.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'test.jpg',
      })
    );
  });

  it('drag upload file should works fine', async () => {
    const props: UploadProps = {
      action: 'fakerurl.com',
      drag: true,
      onSuccess: jest.fn(),
      onRemove: jest.fn(),
    };

    const result = render(<Upload {...props}>Click to upload</Upload>);
    const dragArea = result.container.querySelector('.upload-dragger') as HTMLDivElement;

    // 拖拽到指定区域, 应该有高亮 class
    fireEvent.dragOver(dragArea);
    expect(dragArea).toHaveClass('is-drag-over');
    // 离开指定的拖拽区域, 取消移除高亮 class
    fireEvent.dragLeave(dragArea);
    expect(dragArea).not.toHaveClass('is-drag-over');
    // 上传指定文件
    fireEvent.drop(dragArea, {
      dataTransfer: {
        files: [
          new File(['abc'], 'test.jpg', {
            type: 'image/jpeg',
          }),
        ],
      },
    });
    // 等待文件上传完成
    await waitFor(
      () => {
        // 展示当前上传的文件列表中(UploadFileList.tsx), 应该包含 test.jpg
        expect(result.queryByText('test.jpg')).toBeInTheDocument();
      },
      {
        timeout: 350,
      }
    );
  });
});
