import React from 'react';

import {
  Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';

export const AboutTopic = ({ values = {}, setValues }) => {
  const onChange = ({ target }) => {
    setValues((prev) => ({ ...prev, [target.name]: target.value }));
  };
  return (
    <Card>
      <CardHeader title="About topic" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <TextField
              fullWidth
              label="Topic title"
              name="title"
              variant="outlined"
              value={values.title}
              onChange={onChange}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="blog-category">
                Topic category
              </InputLabel>
              <Select
                labelId="blog-category"
                name="categoryId"
                value={values.categoryId}
                onChange={onChange}
              >
                <MenuItem value="">---</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
