import React from 'react';

import { Search } from '@mui/icons-material';
import { TextField, InputAdornment } from '@mui/material';

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      size="small"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search fontSize="small" sx={{ color: '#9e9e9e' }} />
          </InputAdornment>
        ),
        style: {
          borderRadius: '8px',
        },
      }}
      sx={{
        width: '483px',
        '& .MuiOutlinedInput-root': {
          padding: '3px',
          '& fieldset': {
            borderColor: '#A0ADC2',
          },
          '&:hover fieldset': {
            borderColor: '#A0ADC2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#606060',
          },
        },
      }}
    />
  );
};

export default SearchBar;
