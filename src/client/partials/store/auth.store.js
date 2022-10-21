import {useTranslation} from 'react-i18next';
import {createContext, useState, useEffect} from 'react';
import '../../i18n/i18n';

const AuthContext = createContext({
  lang: '',
  isLoggedIn: false,
  currentScreen: '',
  changeLang: () => {},
  login: () => {},
  signUp: () => {},
  logout: () => {},
  navigationHandler: () => {},
  __: () => {}
});

export const AuthContextProvider = ({children}) => {
  const {
    t,
    i18n: {changeLanguage}
  } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [lang, setSessionLang] = useState('en');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const changeLang = lang => {
    changeLanguage(lang);
    setSessionLang(lang);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem('authToken', 'dasdk32ok4');
    setIsLoggedIn(true);
  };

  const signUpHandler = (email, password) => {
    console.log('Signed Up: ', email, password);
  };

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        lang,
        isLoggedIn,
        currentScreen,
        changeLang,
        login: loginHandler,
        signUp: signUpHandler,
        logout: logoutHandler,
        navigationHandler: setCurrentScreen,
        __: t
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
