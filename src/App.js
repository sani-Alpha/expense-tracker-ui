import {useContext} from 'react';
import MainHeader from './client/partials/MainHeader/MainHeader';
import Auth from './client/pages/Auth/Auth';
import Home from './client/pages/Home/Home';
import Expenses from './client/pages/Expenses/Expenses';
import Store from './client/partials/store/app.store';

const App = () => {
  const {currentScreen, isLoggedIn} = useContext(Store);

  let mainScreen = !isLoggedIn && <Auth />;
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
