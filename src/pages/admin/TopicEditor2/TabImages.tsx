import { Masonry } from '@mui/lab';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { IMAGE_PATH } from '../../../helpers/utils/constants';
import { actions, setFilePath, type QueryHook } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import type { AppState } from '../../../redux/store';

interface TopicImage {
  fileName: string;
  createdAt: string;
}

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export const TopicImages = () => {
  const dispatch = useDispatch();
  const useGetResources = actions.useGetResourcesMediaQuery as unknown as QueryHook<
    TopicImage[],
    { resourceType: string }
  >;
  const { data, isFetching } = useGetResources({
    resourceType: 'image',
  });
  const { data: topicImages } = data || initials.dataArr<TopicImage>();
  const filePathName = useSelector((state: AppState) => state.filer.fileName);

  if (isFetching) return <h2>Loading...</h2>;
  return topicImages.length ? (
    <Masonry columns={3} spacing={2}>
      {topicImages.map((img) => (
        <div key={img.fileName}>
          <Label>
            {filePathName === img.fileName
              ? 'Selected'
              : `Uploded at ${moment(img.createdAt).format('DD-MM-YYYY')}`}
          </Label>
          <img
            role="presentation"
            srcSet={`${IMAGE_PATH}/${img.fileName}?w=162&auto=format&dpr=2 2x`}
            src={`${IMAGE_PATH}/${img.fileName}?w=162&auto=format`}
            alt="Topic cover"
            loading="lazy"
            style={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              display: 'block',
              width: '100%',
            }}
            onClick={() => dispatch(setFilePath(img.fileName))}
          />
        </div>
      ))}
    </Masonry>
  ) : (
    <h2>No cover images uploaded yet</h2>
  );
};
