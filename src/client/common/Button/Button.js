import styles from './Button.module.scss';

const Button = ({children, clickHandler, type, className, disabled}) => {
  const classes = className ? `${styles.button} ` + className : styles.button;
  return (
    <button className={classes} type={type} disabled={disabled} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
