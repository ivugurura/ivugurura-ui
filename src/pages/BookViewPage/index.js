import React from 'react';

import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router';

import { PdfViewerChrome } from '../../common/components/PDFViewer';
import { toLink } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';

const BookView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data } = actions.useViewBookQuery({ slug });
  const { data: book } = data || initials.dataObj;

  if (!book.id) return null;

  return (
    <Grid container>
      <PdfViewerChrome
        pdfUrl={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        onPageClose={() => navigate(toLink('library'))}
        downloadParams={{ useMutation: 'useDownloadBookMutation', id: book.id }}
        watermarkText="Reformation Voice"
        initialScale={1}
      />
    </Grid>
  );
};

export default BookView;
