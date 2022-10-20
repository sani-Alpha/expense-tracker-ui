import NavBar from './NavBar';
import styles from './MainHeader.module.scss';

const MainHeader = ({isAuthenticated, onLogout, navigationHandler}) => {
  return (
    <header className={styles['main-header']}>
      <div onClick={() => navigationHandler('home')}>Expense Tracker</div>
      <NavBar isLoggedIn={isAuthenticated} onLogout={onLogout} navigationHandler={navigationHandler} />
    </header>
  );
};

export default MainHeader;
