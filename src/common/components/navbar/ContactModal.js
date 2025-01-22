import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { actions } from '../../../redux/apiSliceBuilder';
import { RRVForm } from '../RRVForm';

import { contactSchema, formInitials } from './schema';

export const ContactModal = ({ open, onClose }) => {
  const { t } = useTranslation();

  const [thisState, setThisState] = useState(formInitials);
  const [sendEmail, sendEmailRes] = actions.useContactUsSystemMutation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t('contactUs')}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{t('contactUsTitle')}</DialogContentText>
        <RRVForm
          fields={contactSchema(t)}
          states={thisState}
          setStates={setThisState}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={sendEmailRes.isLoading} onClick={onClose}>
          {t('btnCancel')}
        </Button>
        <Button
          disabled={sendEmailRes.isLoading}
          onClick={() => sendEmail(thisState)}
        >
          {t(sendEmailRes.isLoading ? 'loading' : 'btnSend')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
