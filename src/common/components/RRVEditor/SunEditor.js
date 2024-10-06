import React from 'react';

import { useTranslation } from 'react-i18next';
import SunEditor from 'suneditor-react';

import { http } from '../../../helpers';
import { IMAGE_PATH } from '../../../helpers/utils/constants';

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

export const RRVSunEditor = ({ topic, sunEdContent, setSunEdContent }) => {
  const { t } = useTranslation();
  const onImageUploadBefore = (files, _info, uploadHandler) => {
    const imgFile = files[0];
    (async () => {
      const formData = new FormData();
      formData.append('file', imgFile);

      const { data } = await http.post('/albums/upload/image', formData);
      const res = {
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
        minHeight: '380px',
        defaultTag: 'div',
      }}
      setDefaultStyle="font-size: 16px;"
      name="content"
      value={topic.content}
      setContents={sunEdContent}
      placeholder={t('admin.topic.phDetail')}
      onChange={(content) => setSunEdContent(content)}
      onImageUploadBefore={onImageUploadBefore}
      onImageUploadError={(errorMsg, result) =>
        console.log({ errorMsg, result })
      }
    />
  );
};
