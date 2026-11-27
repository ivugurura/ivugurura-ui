import { useMemo } from 'react';

import { Box, Button } from '@mui/material';

import { systemLanguages } from '../../helpers/utils/constants';

import { useLang } from './providers';
import { RRVDropdown } from './RRVDropdown';

interface SelectLanguageProps {
  color?: 'white' | 'black';
  home?: 'admin' | 'user';
}

export const SelectLanguage = ({
  color = 'white',
  home = 'user',
}: SelectLanguageProps) => {
  const { lang, changeLang } = useLang();
  const currentLang = useMemo(
    () => systemLanguages.find(({ abbr }) => abbr === lang),
    [lang],
  );
  return (
    <RRVDropdown
      title={
        <>
          <img src={currentLang?.flag} alt={currentLang?.abbr} />
          {/* Flag only on phones, to leave room in the app bar. */}
          <Box
            component="span"
            sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.75 }}
          >
            {currentLang?.lang}
          </Box>
        </>
      }
      variant="text"
      options={systemLanguages.map((sl) => (
        <Button
          startIcon={<img src={sl.flag} alt={sl.abbr} />}
          key={sl.abbr}
          onClick={() => changeLang(sl.abbr, home === 'admin')}
        >
          {sl.lang}
        </Button>
      ))}
      buttonProps={{
        sx: { color },
      }}
    />
  );
};
