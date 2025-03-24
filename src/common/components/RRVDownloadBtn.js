import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import { actions } from '../../redux/apiSliceBuilder';

export const RRVDownloadBtn = ({ useMutation, params = {} }) => {
  const [downladFile, { data, isLoading, isSuccess, error }] =
    actions[useMutation]();

  useEffect(() => {
    if (isSuccess && data?.blob) {
      const url = window.URL.createObjectURL(data.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.filename || 'downloaded_file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Cleanup
    }
  }, [data]);

  useEffect(() => {
    if (error?.error) {
      toast.error(error.error, {
        position: 'bottom-right',
        toastId: 13,
      });
    }
  }, [error?.error]);

  return (
    <Button onClick={() => downladFile(params)} disabled={isLoading}>
      Download
    </Button>
  );
};
