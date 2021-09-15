import React, { useState } from "react";
import "styles/fileUpload.css";
import { Form, ProgressBar } from "react-bootstrap";
import { uploadFileWithProgress } from "helpers/utils";
import { notifier } from "utils/notifier";
import { setFilePath } from "redux/actions";

export const FileUpload = ({ title = "", previousFile = "", type = "" }) => {
  const [progress, setProgress] = useState(0);
  const onChange = ({ target }) => {
    uploadFileWithProgress(target.files[0], previousFile, type, (e) => {
      setProgress(Math.round((100 * e.loaded) / e.total));
    })
      .then((res) => {
        setProgress(0);
        setFilePath(res.data.data);
      })
      .catch((error) => {
        setProgress(0);
        let errorMessage = "";
        if (error.response) {
          const { error: message } = error.response.data;
          errorMessage = message;
        } else {
          errorMessage = error.message;
        }
        notifier.error(errorMessage);
      });
  };
  return (
    <Form.Group className="files color">
      <Form.File id="audioFile" label={title} onChange={onChange} />
      {progress > 0 && (
        <ProgressBar animated now={progress} label={`${progress}%`} />
      )}
    </Form.Group>
  );
};
