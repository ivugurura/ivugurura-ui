import { useEffect } from 'react';

import { DownloadForOffline as DownloadIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import { actions, type MutationHook } from '../../redux/actions';

interface RRVDownloadBtnProps {
  useMutation: keyof typeof actions;
  params?: Record<string, unknown>;
  hideBtntext?: boolean;
}
export const RRVDownloadBtn = ({
  useMutation,
  params = {},
  hideBtntext = false,
}: RRVDownloadBtnProps) => {
  const useAction = actions[useMutation] as MutationHook<ST.IFileDownload>;
  const [downloadFile, { data, error, isLoading, isSuccess }] = useAction();

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
  }, [data, isSuccess]);

  useEffect(() => {
    if (error?.error) {
      toast.error(String(error.error) || 'Download failed', {
        position: 'bottom-right',
        toastId: 13,
      });
    }
  }, [error?.error]);

  return (
    <Button
      onClick={() => downloadFile(params)}
      disabled={isLoading}
      startIcon={<DownloadIcon />}
      color="info"
    >
      {!hideBtntext && 'Download'}
    </Button>
  );
};
