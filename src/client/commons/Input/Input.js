import {useRef, useImperativeHandle, forwardRef} from 'react';
import styles from './Input.module.scss';

const Input = forwardRef(({id, name, label, value, type, min, max, step, changeHandler, blurHandler, isValid}, ref) => {
  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {focus: activate};
  });
  let input = (
    <input ref={inputRef} type={type} id={id} value={value} onChange={changeHandler} onBlur={blurHandler} name={name} />
  );

  if (type === 'number') {
    input = (
      <input
        ref={inputRef}
        type="number"
        id={id}
        name={name}
        value={value}
        min={min}
        step={step}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    );
  } else if (type === 'date') {
    input = (
      <input
        ref={inputRef}
        type="date"
        id={id}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    );
  }

  return (
    <div className={`${styles.control} ${!isValid ? styles.invalid : ''}`}>
      <div className={styles['form-control-input']}>
        <label htmlFor={name}>{label}</label>
        {input}
      </div>
    </div>
  );
});

export default Input;
