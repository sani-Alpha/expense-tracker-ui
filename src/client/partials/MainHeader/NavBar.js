import styles from './NavBar.module.scss';

const NavBar = ({isLoggedIn, onLogout, navigationHandler}) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <div onClick={() => navigationHandler('expenses')}>Expenses</div>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
