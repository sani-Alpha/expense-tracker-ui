import styles from './NavBar.module.scss';

const NavBar = ({isLoggedIn, onLogout, navigationHandler, style, navBarCloseHandler, showNavBar}) => {
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
            <div onClick={onLogout}>Logout</div>
          </div>
        )}
        {isLoggedIn && (
          <div className={styles.navItem}>
            <button onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
