import { useEffect } from 'react';

import {
  DownloadForOffline as DownloadIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';
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
      const fileName =
        data.filename ||
        `${typeof params?.fileName === 'string' ? params.fileName : 'Reformation'}.pdf`;
      const url = window.URL.createObjectURL(data.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Cleanup
    }
  }, [data, isSuccess, params?.fileName]);

  useEffect(() => {
    if (error?.error) {
      toast.error(String(error.error) || 'Download failed', {
        position: 'bottom-right',
        toastId: 13,
      });
    }
  }, [error?.error]);

  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    downloadFile(params);
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      startIcon={isLoading ? <SyncIcon /> : <DownloadIcon />}
      color="info"
    >
      {!hideBtntext && (isLoading ? 'Downloading...' : 'Download')}
    </Button>
  );
};
