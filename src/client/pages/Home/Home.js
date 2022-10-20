import {Card} from '../../commons/index';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <Card className={styles.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
