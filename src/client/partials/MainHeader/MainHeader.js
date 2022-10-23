import {useState, useContext, memo} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import NavBar from './NavBar';
import AuthContext from '../store/auth.store';
import AppContext from '../store/app.store';
import styles from './MainHeader.module.scss';

const MainHeader = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const {isLoggedIn} = useContext(AuthContext);
  const {navigationHandler} = useContext(AppContext);

  return (
    <header className={styles['main-header']}>
      <div className={styles.title} onClick={() => navigationHandler('home')}>
        Expense Tracker
      </div>
      <NavBar showNavBar={showNavBar} navBarCloseHandler={setShowNavBar} />
      {isLoggedIn && (
        <div className={styles.navIcon} onClick={() => setShowNavBar(prevState => !prevState)}>
          {showNavBar ? <FaTimes /> : <FaBars />}
        </div>
      )}
    </header>
  );
};

export default memo(MainHeader);
