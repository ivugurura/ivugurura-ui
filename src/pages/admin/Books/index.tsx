import { useEffect, useState } from 'react';

import {
  Delete as DeleteIcon,
  // EditNoteOutlined as EditIcon,
  ViewAgendaOutlined as ViewIcon,
} from '@mui/icons-material';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVTable } from '../../../common/components/RRVTable/Table';
import { useAlertDialog } from '../../../common/hooks/useAlertDialog';
import { useMuiSearchPagination } from '../../../common/hooks/useMuiSearchPagination';
import {
  actions,
  initials,
  type MutationHook,
  type QueryHook,
} from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { AddEditBook } from './AddEditBook';
import { bookColumns } from './schema';
import { ViewBook } from './ViewBook';

const Books = () => {
  const { t } = useTranslation();
  const [currentBook, setCurrentBook] = useState<APP.IBook | null>(null);
  const [openModals, setOpenModals] = useState({
    addBook: false,
    readBook: false,
  });
  const { paginator } = useMuiSearchPagination();
  const useListBooks = actions.useListBooksQuery as QueryHook<APP.IBook[]>;
  const { data, isFetching, refetch } = useListBooks(paginator);

  const useDeleteBook =
    actions.useDeleteBookMutation as MutationHook<APP.IBook>;
  const [deleteBook, delRes] = useDeleteBook();

  const { alertValues, reset, setAlertValues } = useAlertDialog();

  useEffect(() => {
    if (delRes.isSuccess) {
      refetch();
      reset();
    }
  }, [delRes.isSuccess, refetch, reset]);

  const handleModal = (type: string, value: boolean) => {
    setOpenModals((p) => ({ ...p, [type]: value }));
  };

  const handleBookClick = (book: APP.IBook, action: string) => {
    setCurrentBook(book);
    if (action === 'read') {
      handleModal('readBook', true);
    } else if (action === 'delete') {
      setAlertValues({
        open: true,
        title: 'Delete book',
        message: 'Are you sure you want to delete this book?',
        actionType: 'delete',
      });
    }
  };

  const handleConfirm = () => {
    if (alertValues.actionType === 'delete') {
      deleteBook({ id: currentBook.id });
    }
  };

  const { data: books, totalItems } = data || initials.dataArr();

  return (
    <DashboardContainer
      title={t('library.labelTitle')}
      action={
        <Button onClick={() => handleModal('addBook', true)}>
          {t('library.addNew')}
        </Button>
      }
    >
      <AddEditBook
        open={openModals.addBook}
        onClose={() => handleModal('addBook', false)}
        refetchBooks={refetch}
      />
      <ViewBook
        open={openModals.readBook}
        onClose={() => handleModal('readBook', false)}
        book={currentBook}
      />
      <AlertConfirm
        {...alertValues}
        setOpen={() => reset()}
        onConfirmYes={handleConfirm}
        loading={delRes.isLoading}
      />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <RRVTable
            columns={bookColumns(t)}
            data={books}
            isLoading={isFetching}
            enableRowActions
            renderRowActions={({ row }: { row: { original: APP.IBook } }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                {/* <Button size="small" startIcon={<EditIcon />}>
                      Edit
                    </Button> */}
                <IconButton
                  color="secondary"
                  onClick={() => handleBookClick(row.original, 'read')}
                >
                  <ViewIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleBookClick(row.original, 'delete')}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          />
        </Grid>
        <Grid item xs={12} lg={2}>
          <h1>{totalItems}</h1>
          {` — ${t('library.nLabel')}`}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Books;
