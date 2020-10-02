import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

export const LangProvider = ({ children }) => {
  const language = useSelector(({ language }) => language);
  return (
    <IntlProvider
      defaultLocale='kn'
      locale={language.lacale}
      messages={language.messages}
      onError={() => console.log('Error')}
    >
      {children}
    </IntlProvider>
  );
};
