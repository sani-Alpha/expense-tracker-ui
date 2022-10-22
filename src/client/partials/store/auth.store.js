import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  signUp: () => {},
  logout: () => {}
});

export const AuthContextProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: loginHandler,
        signUp: signUpHandler,
        logout: logoutHandler
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
