import {useContext} from 'react';
import AuthContext from '../context/auth.context';
import AppContext from '../context/app.context';
import styles from './NavBar.module.scss';

const NavBar = ({style, navBarCloseHandler, showNavBar}) => {
  const {isLoggedIn, logout} = useContext(AuthContext);
  const {navigationHandler, __} = useContext(AppContext);
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
              {__('expenses')}
            </div>
          </div>
        )}
        {isLoggedIn && (
          <div className={styles.navItem + ' ' + styles.btn}>
            <div onClick={logout}>{__('logout')}</div>
          </div>
        )}
        {isLoggedIn && (
          <div className={styles.navItem}>
            <button onClick={logout}>{__('logout')}</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
