import {useContext} from 'react';
import MainHeader from './client/partials/MainHeader/MainHeader';
import Login from './client/pages/Auth/Login';
import Home from './client/pages/Home/Home';
import Expenses from './client/pages/Expenses/Expenses';
import AuthContext from './client/partials/context/auth.context';
import AppContext from './client/partials/context/app.context';

const App = () => {
  const {isLoggedIn} = useContext(AuthContext);
  const {currentScreen} = useContext(AppContext);

  let mainScreen = !isLoggedIn && <Login />;
  if (isLoggedIn) {
    if (currentScreen === 'home') {
      mainScreen = <Home />;
    } else if (currentScreen === 'expenses') {
      mainScreen = <Expenses />;
    }
  }

  return (
    <>
      <MainHeader />
      <main>{mainScreen}</main>
    </>
  );
};

export default App;
