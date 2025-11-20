import React, { useState } from 'react';

import type { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { http } from '../../../helpers/http';
import { IMAGE_PATH } from '../../../helpers/utils/constants';
// import { theme } from '../../theme/themes';

import styles from './DraftEditor.module.scss';

interface DraftEditorProps {
  editorState: EditorState;
  onEditorStateChange: (state: EditorState) => void;
  placeholder: string;
}

// const styles = {
//   root: {
//     fontFamily: theme.typography.fontFamily,
//     '& .rdw-option-wrapper': {
//       background: 'transparent',
//       border: 'none',
//       minWidth: 26,
//       padding: 6,
//       '&:hover': {
//         boxShadow: 'none',
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//     '& .rdw-option-active': {
//       boxShadow: 'none',
//       backgroundColor: theme.palette.action.selected,
//     },
//     '& .rdw-dropdown-wrapper': {
//       boxShadow: 'none',
//       background: 'transparent',
//     },
//     '& .rdw-dropdown-optionwrapper': {
//       overflowY: 'auto',
//       boxShadow: theme.shadows[10],
//       padding: theme.spacing(1),
//     },
//   },
//   toolbar: {
//     marginBottom: 0,
//     borderLeft: 'none',
//     borderTop: 'none',
//     borderRight: 'none',
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     background: 'transparent',
//   },
//   editor: {
//     padding: theme.spacing(2),
//     height: 300,
//     color: theme.palette.text.primary,
//   },
// };
export const DraftEditor: React.FC<DraftEditorProps> = ({
  editorState,
  onEditorStateChange,
  placeholder,
  ...rest
}) => {
  const [prevFile, setPrevFile] = useState('');

  const handleImageUpload = (file: File) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      http
        .post('/albums/upload/image', formData)
        .then((res) => {
          const fileName = res.data as string;
          setPrevFile(fileName);
          resolve({ data: { link: `${IMAGE_PATH}/${fileName}` } });
        })
        .catch((error: unknown) => {
          let errorMessage = error.message;
          if (error.response) {
            console.log(error.response);
            const { error: apiError, message } = error.response.data || {};
            errorMessage = apiError || message || error.message;
          }
          // notifier.error(errorMessage);
          console.log({ errorMessage });
          reject(errorMessage);
        });
    });
  };

  console.log({ prevFile });
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          'inline',
          'blockType',
          'fontSize',
          'fontFamily',
          'list',
          'textAlign',
          'image',
          'colorPicker',
          'history',
        ],
        inline: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        image: {
          uploadCallback: handleImageUpload,
          alt: { present: true, mandatory: true },
          defaultSize: { height: 300, width: 500 },
        },
        // fontSize: {
        //   options: [16, 18, 24, 30, 36, 48, 60, 72, 96],
        // },
      }}
      placeholder={placeholder}
      editorClassName={styles.editor}
      wrapperClassName={styles.root}
      toolbarClassName={styles.toolbar}
      {...rest}
    />
  );
};
