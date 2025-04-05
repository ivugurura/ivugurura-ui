import React from 'react';

import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router';

import { PdfViewerV3 } from '../../common/components/PDFViewer/index';
import { toLink } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';

const BookView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data } = actions.useViewBookQuery({ slug });
  const { data: book } = data || initials.dataObj;

  if (!book.id) return null;
  console.log(`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`);
  return (
    <Grid container>
      <PdfViewerV3
        pdfUrl={`${process.env.REACT_APP_API_URL}/api/v1/books/${book.id}`}
        onPageClose={() => navigate(toLink('library'))}
        downloadParams={{ useMutation: 'useDownloadBookMutation', id: book.id }}
      />
    </Grid>
  );
};

export default BookView;
