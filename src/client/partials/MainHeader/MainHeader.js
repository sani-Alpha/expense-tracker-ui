import {useState} from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import NavBar from './NavBar';
import styles from './MainHeader.module.scss';

const MainHeader = ({isAuthenticated, onLogout, navigationHandler}) => {
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <header className={styles['main-header']}>
      <div className={styles.title} onClick={() => navigationHandler('home')}>
        Expense Tracker
      </div>
      <NavBar
        showNavBar={showNavBar}
        isLoggedIn={isAuthenticated}
        onLogout={onLogout}
        navigationHandler={navigationHandler}
        navBarCloseHandler={setShowNavBar}
      />
      {isAuthenticated && (
        <div className={styles.navIcon} onClick={() => setShowNavBar(!showNavBar)}>
          {showNavBar ? <FaTimes /> : <FaBars />}
        </div>
      )}
    </header>
  );
};

export default MainHeader;
