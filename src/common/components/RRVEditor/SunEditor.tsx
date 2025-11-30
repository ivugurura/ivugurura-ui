import type React from 'react';

import SunEditor from 'suneditor-react';
import type { SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';
import type {
  UploadBeforeHandler,
  UploadBeforeReturn,
} from 'suneditor-react/dist/types/upload';

import { http } from '../../../helpers';
import { IMAGE_PATH } from '../../../helpers/utils/constants';

interface RRVSunEditorProps extends SunEditorReactProps {
  minHeight: string;
}

type ImageUploadBefore = (
  files: File[],
  info: unknown,
  uploadHandler: UploadBeforeHandler,
) => UploadBeforeReturn;

interface UploadResponse {
  data: string;
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
  minHeight = '380px',
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

      const { data } = await http.post<UploadResponse>(
        '/upload-file/image',
        formData,
      );
      const res = {
        result: [
          {
            url: `${IMAGE_PATH}/${data.data}`,
            name: imgFile.name,
            size: imgFile.size,
          },
        ],
      };
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
      onImageUploadBefore={onImageUploadBefore}
      onImageUploadError={(errorMsg, result: unknown) =>
        console.log({ errorMsg, result })
      }
      {...props}
    />
  );
};
