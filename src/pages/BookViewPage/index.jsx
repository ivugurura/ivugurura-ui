import { Grid } from '@mui/material';
import {
  // useNavigate,
  useParams,
} from 'react-router';

import { PdfViewer } from '../../common/components/PDFViewer/pdf';
import { getInitialScaleByWidth } from '../../helpers/utils';
import { actions, initials } from '../../redux/apiSliceBuilder';

const BookView = () => {
  const { slug } = useParams();
  // const navigate = useNavigate();
  const { data } = actions.useViewBookQuery({ slug });
  const { data: book } = data || initials.dataObj();

  if (!book.id) return null;

  return (
    <Grid container>
      <PdfViewer
        pdfUrl={`${import.meta.env.VITE_API_URL}/api/v1/books/${book.id}`}
        downloadParams={{ useMutation: 'useDownloadBookMutation', id: book.id }}
        initialScale={getInitialScaleByWidth(window.innerWidth)}
      />
    </Grid>
  );
};

export default BookView;
