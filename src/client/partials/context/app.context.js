import {createContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import '../../i18n/i18n';

const AppContext = createContext({
  lang: '',
  currentScreen: '',
  changeLang: () => {},
  navigationHandler: () => {},
  __: () => {}
});

export const AppContextProvider = ({children}) => {
  const {
    t,
    i18n: {changeLanguage}
  } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState('home');
  const [lang, setSessionLang] = useState('en');

  const changeLang = newLang => {
    changeLanguage(newLang);
    setSessionLang(newLang);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        currentScreen,
        changeLang,
        navigationHandler: setCurrentScreen,
        __: t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
