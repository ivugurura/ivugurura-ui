import { useEffect } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router';

export const useLangRedirect = (currentLang) => {
  const { lang: urlLang } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (urlLang !== currentLang) {
      const newPath = location.pathname.replace(urlLang, currentLang);

      navigate(newPath, { replace: true });
    }
  }, [currentLang, urlLang]);
};
