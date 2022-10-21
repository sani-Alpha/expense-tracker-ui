import {useState, useEffect, useReducer} from 'react';
import {Button, Input, Modal} from '../../commons/index';
import styles from './Auth.module.scss';

const setValidation = (prevState, {type, value, context}) => {
  if (type === 'UPDATE_VALIDATION_STATE') {
    return {...prevState, [context]: value};
  }

  return {};
};

const Auth = ({onLogin, show, close}) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();

  const [validation, validationDispatch] = useReducer(setValidation, {});
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = event => {
    setEnteredEmail(event.target.value);

    setFormIsValid(event.target.value.includes('@') && enteredPassword.trim().length > 6);
  };

  const passwordChangeHandler = event => {
    if (event.target.id === 're-password') {
      setReEnteredPassword(event.target.value);
    } else {
      setEnteredPassword(event.target.value);
    }

    setFormIsValid(enteredEmail.includes('@') && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(
      enteredPassword.trim().length > 6 &&
        reEnteredPassword.trim().length > 6 &&
        enteredPassword.trim() === reEnteredPassword.trim()
    );
  };

  const submitHandler = event => {
    event.preventDefault();
    onLogin(enteredEmail, enteredPassword);
  };
  return (
    <Modal
      show={show}
      hideHeader={false}
      title="Sign Up"
      isScrollable={false}
      isFullScreen={false}
      onClose={() => close(false)}
    >
      <form onSubmit={submitHandler}>
        <div className={`${styles.control} ${emailIsValid === false ? styles.invalid : ''}`}>
          <Input
            id="email"
            type="text"
            name="email"
            label="E-Mail"
            value={enteredEmail}
            className={styles['form-text']}
            changeHandler={emailChangeHandler}
            blurHandler={validateEmailHandler}
          />
        </div>
        <div className={`${styles.control} ${passwordIsValid === false ? styles.invalid : ''}`}>
          <Input
            id="password"
            type="password"
            name="password"
            label="Password"
            value={enteredPassword}
            className={styles['form-text']}
            changeHandler={passwordChangeHandler}
            blurHandler={validatePasswordHandler}
          />
        </div>
        <div className={`${styles.control} ${passwordIsValid === false ? styles.invalid : ''}`}>
          <Input
            id="re-password"
            type="password"
            name="re-password"
            label="Password"
            value={reEnteredPassword}
            className={styles['form-text']}
            changeHandler={passwordChangeHandler}
            blurHandler={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            SignUp
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Auth;
