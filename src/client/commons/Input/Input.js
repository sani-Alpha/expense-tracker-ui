import styles from './Input.module.scss';

const Input = ({id, name, label, value, type, min, max, step, className, changeHandler, blurHandler}) => {
  const classes = className ? `${styles['form-control-input']} ` + className : styles['form-control-input'];
  let input = (
    <input
      type={type}
      id={id}
      value={value}
      className={styles['input-box']}
      onChange={event => changeHandler(event, name)}
      onBlur={blurHandler}
    />
  );

  if (type === 'number') {
    input = (
      <input
        type="number"
        id={id}
        value={value}
        className={styles['input-box']}
        min={min}
        step={step}
        onChange={event => changeHandler(event, name)}
        onBlur={blurHandler}
      />
    );
  } else if (type === 'date') {
    input = (
      <input
        type="date"
        id={id}
        value={value}
        className={styles['input-box']}
        min={min}
        max={max}
        onChange={event => changeHandler(event, name)}
        onBlur={blurHandler}
      />
    );
  }

  return (
    <div className={classes}>
      <label htmlFor={name} className={styles['input-label']}>
        {label}
      </label>
      {input}
    </div>
  );
};

export default Input;
