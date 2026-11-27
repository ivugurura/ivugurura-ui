import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { actions, type QueryHook } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';

export interface AboutTopicValues {
  title?: string;
  categoryId?: string;
}

interface AboutTopicProps<T extends AboutTopicValues> {
  values?: T;
  setValues: React.Dispatch<React.SetStateAction<T>>;
}

export const AboutTopic = <T extends AboutTopicValues>({
  values = {} as T,
  setValues,
}: AboutTopicProps<T>) => {
  const { t } = useTranslation();
  const useListCategory = actions.useListCategoryQuery as unknown as QueryHook<
    APP.ICategory[],
    { categoryType: string }
  >;
  const { data } = useListCategory({ categoryType: 'topic' });
  const { data: categories } = data || initials.dataArr<APP.ICategory>();
  const onChange = ({
    target,
  }:
    | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }));
  };
  return (
    <Card>
      <CardHeader title={t('admin.topic.about')} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label={t('admin.topic.phTitle')}
              name="title"
              variant="outlined"
              value={values.title || ''}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="blog-category">
                {t('admin.topic.phCategory')}
              </InputLabel>
              <Select
                labelId="blog-category"
                name="categoryId"
                value={values.categoryId || ''}
                onChange={onChange}
              >
                <MenuItem value="">---</MenuItem>
                {categories.map((cat) => (
                  <MenuItem value={cat.id} key={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
