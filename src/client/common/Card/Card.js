import styles from './Card.module.scss';

const Card = ({children, className}) => {
  const classes = className ? `${styles.card} ` + className : styles.card;
  return <div className={classes}>{children}</div>;
};

export default Card;
