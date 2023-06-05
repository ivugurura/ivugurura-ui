import React from 'react';

import {
  Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField,
} from '@mui/material';

export const AboutTopic = () => {
  console.log('About topic');
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
