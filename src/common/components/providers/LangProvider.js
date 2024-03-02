import React, { createContext, useCallback, useMemo, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';

const LangContext = createContext(undefined);

export const LangProvider = ({ children, match }) => {
  const [lang, setLang] = useState('kn');
  // const navigate = useNavigate();

  const changeLang = useCallback(
    (newLang) => {
      if (newLang !== lang) {
        setLang(newLang);
        localStorage.setItem('lang', newLang);
        window.location.href = `/${newLang}`;
      }
    },
    [lang],
  );
  console.log({ match });
  // useEffect(() => {
  //   if (LoggedIn) {
  //     return navigate("/");
  //   }
  // }, [LoggedIn]);
  const values = useMemo(() => ({ lang, changeLang }));
  return (
    <LangContext.Provider value={values}>
      <BrowserRouter basename={lang}>{children}</BrowserRouter>
    </LangContext.Provider>
  );
};
