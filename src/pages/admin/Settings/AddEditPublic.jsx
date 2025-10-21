import React, { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { RRVDialogActions } from '../../../common/components/RRVDialogActions';
import { RRVForm } from '../../../common/components/RRVForm';
import { actions } from '../../../redux/apiSliceBuilder';

import { pubSchema } from './schema';

const initialStates = (t) => ({
  title: `${t('admin.settings.public.title')}: `,
  content: '',
  isPublished: false,
  expiryDate: dayjs(),
  minDate: dayjs(),
});
export const AddEditPublic = ({ open, onClose, refetchPubs }) => {
  const { t } = useTranslation();
  const [newPub, setNewPub] = useState(initialStates(t));
  const [createPub, res] = actions.useCreatePubConfigMutation();

  useEffect(() => {
    if (res.isSuccess) {
      res.reset();
      refetchPubs();
      onClose();
      setNewPub(initialStates(t));
    }
  }, [res.isSuccess]);

  const handleSave = () => {
    const { expiryDate, minDate, ...rest } = newPub;
    createPub({ ...rest, expiryDate: dayjs(expiryDate).format('YYYY-MM-DD') });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('admin.webSettings.fTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('admin.webSettings.fSubtitle')}
        </DialogContentText>
        <RRVForm fields={pubSchema()} states={newPub} setStates={setNewPub} />
      </DialogContent>
      <RRVDialogActions
        onClose={onClose}
        onSave={handleSave}
        isLoading={res.isLoading}
      />
    </Dialog>
  );
};
