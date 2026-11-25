import { Grid } from '@mui/material';
import { useParams } from 'react-router';

import { PdfViewer } from '../../common/components/PDFViewer';
import { getInitialScaleByWidth } from '../../helpers/utils';
import { actions, initials, type QueryHook } from '../../redux/actions';

const BookView = () => {
  const { slug = '' } = useParams();
  const useViewBook = actions.useViewBookQuery as QueryHook<
    APP.IBook,
    { slug: string }
  >;
  const { data } = useViewBook({ slug });
  const { data: book } = data || initials.dataObj<APP.IBook>();

  if (!book.id) return null;

  return (
    <Grid container>
      <PdfViewer
        pdfUrl={`${import.meta.env.VITE_API_URL}/api/v1/books/${book.id}`}
        downloadParams={{
          useMutation: 'useDownloadBookMutation',
          id: book.id,
          fileName: book.name,
        }}
        initialScale={getInitialScaleByWidth(window.innerWidth)}
      />
    </Grid>
  );
};

export default BookView;
