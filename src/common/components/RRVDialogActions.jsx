import { Button, DialogActions } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const RRVDialogActions = ({ onClose, onSave, isLoading }) => {
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
