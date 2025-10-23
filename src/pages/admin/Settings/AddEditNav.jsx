import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { RRVForm } from '../../../common/components/RRVForm';
import { actions } from '../../../redux/apiSliceBuilder';

import { navSchema } from './schema';

const initialStates = {
  name: '',
  hasParent: false,
  categoryId: '',
};
export const AddEditNav = ({ open, onClose, refetchNavs, navs = [] }) => {
  const [newNav, setNewNav] = useState(initialStates);
  const [createCategory, res] = actions.useCreateCategoryMutation();

  useEffect(() => {
    if (res.isSuccess) {
      res.reset();
      refetchNavs();
      onClose();
      setNewNav(initialStates);
    }
  }, [res.isSuccess]);

  const handleSave = () => {
    const { hasParent, name, categoryId } = newNav;
    createCategory({ name, categoryId: hasParent ? categoryId : undefined });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new nav menu</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nav setting: set navigation menu as they get diplayed in the website
          as well as in the Mobile app.
        </DialogContentText>
        <RRVForm
          fields={navSchema(navs, newNav)}
          states={newNav}
          setStates={setNewNav}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={res.isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={res.isLoading} onClick={handleSave}>
          {res.isLoading ? 'Saving,...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
