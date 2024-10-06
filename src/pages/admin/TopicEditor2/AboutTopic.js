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
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { actions, initials } from '../../../redux/apiSliceBuilder';

export const AboutTopic = ({ values = {}, setValues }) => {
  const { t } = useTranslation();
  const { data } = actions.useListCategoryQuery({ categoryType: 'topic' });
  const { data: categories } = data || initials.dataArr;
  const onChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }));
  };
  return (
    <Card>
      <CardHeader title={t('admin.topic.about')} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <TextField
              fullWidth
              label={t('admin.topic.phTitle')}
              name="title"
              variant="outlined"
              value={values.title || ''}
              onChange={onChange}
            />
          </Grid>
          <Grid item md={4} xs={12}>
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
