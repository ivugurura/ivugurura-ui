import { createContext, useCallback, useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";

const LangContext = createContext(undefined);

export const LangProvider = ({ children, match }) => {
  const [lang, setLang] = useState("kn");
  // const navigate = useNavigate();

  const changeLang = useCallback(
    (newLang) => {
      if (newLang !== lang) {
        setLang(newLang);
        localStorage.setItem("lang", newLang);
        window.location.href = `/${newLang}`;
      }
    },
    [lang]
  );
  console.log({ match });
  // useEffect(() => {
  //   if (LoggedIn) {
  //     return navigate("/");
  //   }
  // }, [LoggedIn]);
  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      <BrowserRouter basename={lang}>{children}</BrowserRouter>
    </LangContext.Provider>
  );
};
