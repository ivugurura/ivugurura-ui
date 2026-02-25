import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

import { useMediaQuery } from '../../common/hooks/useMediaQuery';

const SearchBar = () => {
  const { isMobile } = useMediaQuery();
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
        width: isMobile ? '100%' : '50%',
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
