import {createContext, useState, useEffect} from 'react';

const AppState = createContext({
  isLoggedIn: false,
  currentScreen: 'home',
  login: () => {},
  signUp: () => {},
  logout: () => {},
  navigationHandler: () => {}
});

export const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

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
    <AppState.Provider
      value={{
        isLoggedIn,
        currentScreen,
        login: loginHandler,
        signUp: signUpHandler,
        logout: logoutHandler,
        navigationHandler: setCurrentScreen
      }}
    >
      {children}
    </AppState.Provider>
  );
};

export default AppState;
