import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { systemLanguage } from '../../../helpers/utils/constants';

const initialStates = {
  lang: systemLanguage,
  changeLang: () => {},
};
const LangContext = createContext(initialStates);

export function useLang() {
  return useContext(LangContext);
}

export const LangProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const lang = useMemo(() => systemLanguage);

  const changeLang = useCallback(
    (newLang, isAdmin) => {
      if (newLang !== lang) {
        i18n.changeLanguage(newLang);
        if (isAdmin) {
          window.location.reload();
        } else {
          window.location.href = `/${newLang}`;
        }
      }
    },
    [lang],
  );

  if (!lang) return <div />;
  const values = useMemo(() => ({ lang, changeLang }));

  return (
    <LangContext.Provider value={values}>
      <BrowserRouter>{children}</BrowserRouter>
    </LangContext.Provider>
  );
};
