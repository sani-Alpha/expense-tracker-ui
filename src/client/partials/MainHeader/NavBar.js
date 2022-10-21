import {useContext} from 'react';
import Store from '../store/app.store';
import styles from './NavBar.module.scss';

const NavBar = ({style, navBarCloseHandler, showNavBar}) => {
  const {isLoggedIn, logout, navigationHandler} = useContext(Store);
  return (
    <nav className={showNavBar ? `${styles.nav} ${styles.active}` : styles.nav} style={style}>
      <div className={styles.navTabs}>
        {isLoggedIn && (
          <div className={styles.navItem}>
            <div
              onClick={() => {
                navigationHandler('expenses');
                navBarCloseHandler(false);
              }}
            >
              Expenses
            </div>
          </div>
        )}
        {isLoggedIn && (
          <div className={styles.navItem + ' ' + styles.btn}>
            <div onClick={logout}>Logout</div>
          </div>
        )}
        {isLoggedIn && (
          <div className={styles.navItem}>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
