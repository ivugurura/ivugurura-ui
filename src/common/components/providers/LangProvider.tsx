import React, { createContext, useCallback, useContext, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { systemLanguage } from '../../../helpers/utils/constants';

interface LangContextProps {
  lang: string;
  changeLang: (newLang: string, isAdmin: boolean) => void;
}
interface LangProviderProps {
  children: React.ReactNode;
}
const initialStates = {
  lang: systemLanguage,
  changeLang: () => {},
};
const LangContext = createContext<LangContextProps>(initialStates);

export function useLang() {
  return useContext(LangContext);
}

export const LangProvider = ({ children }: LangProviderProps) => {
  const { i18n } = useTranslation();
  const lang = useMemo(() => systemLanguage, []);

  const changeLang = useCallback(
    (newLang: string, isAdmin: boolean) => {
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
  const values = useMemo(() => ({ lang, changeLang }), [lang, changeLang]);

  return (
    <LangContext.Provider value={values}>
      <BrowserRouter>{children}</BrowserRouter>
    </LangContext.Provider>
  );
};
