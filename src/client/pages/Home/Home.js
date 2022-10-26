import {useContext, memo} from 'react';
import {Card} from '../../common/index';
import styles from './Home.module.scss';
import AppContext from '../../partials/context/app.context';

const Home = () => {
  const {__} = useContext(AppContext);
  return (
    <Card className={styles.home}>
      <h1>{__('welcome')}</h1>
    </Card>
  );
};

export default memo(Home);
