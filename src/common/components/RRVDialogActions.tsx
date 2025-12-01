import type React from 'react';

import { Button, DialogActions } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface RRVDialogActionsProps {
  onClose: () => void;
  onSave: () => void;
  isLoading?: boolean;
}

export const RRVDialogActions: React.FC<RRVDialogActionsProps> = ({
  onClose,
  onSave,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <DialogActions>
      <Button disabled={isLoading} onClick={onClose}>
        {t('actions.btnCancel')}
      </Button>
      <Button disabled={isLoading} onClick={onSave}>
        {t(`actions.${isLoading ? 'loading' : 'btnSave'}`)}
      </Button>
    </DialogActions>
  );
};
