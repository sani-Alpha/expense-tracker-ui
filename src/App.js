import {useState, useEffect} from 'react';

import MainHeader from './client/partials/MainHeader/MainHeader';
import Auth from './client/pages/Auth/Auth';
import Home from './client/pages/Home/Home';
import Expenses from './client/pages/Expenses/Expenses';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const screenChangeHandler = screen => {
    setCurrentScreen(screen);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem('authToken', 'dasdk32ok4');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  let mainScreen = !isLoggedIn && <Auth onLogin={loginHandler} />;
  if (isLoggedIn) {
    if (currentScreen === 'home') {
      mainScreen = <Home onLogout={logoutHandler} />;
    } else if (currentScreen === 'expenses') {
      mainScreen = <Expenses />;
    }
  }

  return (
    <>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} navigationHandler={screenChangeHandler} />
      <main>{mainScreen}</main>
    </>
  );
};

export default App;
