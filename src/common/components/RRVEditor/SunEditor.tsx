import type React from 'react';

import SunEditor from 'suneditor-react';

import { http } from '../../../helpers';
import { IMAGE_PATH } from '../../../helpers/utils/constants';

interface RRVSunEditorProps {
  value: string;
  minHeight: string;
  placeholder: string;
}

type ImageUploadBefore = (
  files: File[],
  info: unknown,
  uploadHandler: (result?: UploadResult) => void,
) => void;

interface UploadResponse {
  data: string; // match your backend response
}
interface ImageUploadErrorResult {
  result?: unknown;
}

const topicEditorButtons = [
  ['undo', 'redo'],
  ['font', 'fontSize', 'formatBlock'],
  //   ['paragraphStyle', 'blockquote'],
  ['bold', 'underline', 'italic'],
  ['fontColor', 'hiliteColor'],
  //   ['removeFormat'],
  ['outdent', 'indent'],
  // ['align', 'horizontalRule', 'list', 'lineHeight'],
  ['table', 'image'], // 'image'
  ['fullScreen'],
  ['preview'], // 'print'
  // ['save', 'template'],
  // '/', Line break
];

export const RRVSunEditor: React.FC<RRVSunEditorProps> = ({
  value,
  minHeight = '380px',
  placeholder,
  ...props
}) => {
  const onImageUploadBefore: ImageUploadBefore = (
    files,
    _info,
    uploadHandler,
  ) => {
    const imgFile = files[0];
    void (async () => {
      const formData = new FormData();
      formData.append('file', imgFile);

      const response = await http.post<UploadResponse>(
        '/albums/upload/image',
        formData,
      );
      const data = response.data;

      const res: UploadResponse = {
        result: [
          {
            url: `${IMAGE_PATH}/${data.data}`,
            name: imgFile.name,
            size: imgFile.size,
          },
        ],
      };
      console.log({ res }, files[0]);
      uploadHandler(res);
    })();

    // called here for stop double image
    uploadHandler();
  };
  return (
    <SunEditor
      setOptions={{
        buttonList: topicEditorButtons,
        minHeight,
        defaultTag: 'div',
      }}
      setDefaultStyle="font-size: 16px;"
      name="content"
      value={value}
      placeholder={placeholder}
      onImageUploadBefore={onImageUploadBefore}
      onImageUploadError={(errorMsg, result: ImageUploadErrorResult) =>
        console.log({ errorMsg, result })
      }
      {...props}
    />
  );
};
