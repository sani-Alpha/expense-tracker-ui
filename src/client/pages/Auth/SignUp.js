import {useEffect, useReducer} from 'react';
import {Button, Input, Modal} from '../../commons/index';
import styles from './Auth.module.scss';

const userDataReducer = (prevState, {action, value, context}) => {
  if (action === 'UPDATE_USER_DATA') {
    return {...prevState, [context]: value};
  }

  return {
    enteredEmail: '',
    enteredPassword: '',
    reEnteredPassword: '',
    emailIsValid: false,
    passwordIsValid: false,
    reEnteredPasswordIsValid: false,
    formIsValid: false
  };
};

const Auth = ({onSignUp, show, close}) => {
  const [userData, dispatchUserData] = useReducer(userDataReducer, {
    enteredEmail: '',
    enteredPassword: '',
    reEnteredPassword: '',
    emailIsValid: false,
    passwordIsValid: false,
    reEnteredPasswordIsValid: false,
    formIsValid: false
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchUserData({
        action: 'UPDATE_USER_DATA',
        context: 'formIsValid',
        value:
          userData.enteredEmail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) &&
          userData.enteredPassword.length > 6 &&
          userData.reEnteredPassword === userData.enteredPassword
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [userData.enteredEmail, userData.enteredPassword, userData.reEnteredPassword]);

  const emailChangeHandler = event => {
    dispatchUserData({action: 'UPDATE_USER_DATA', context: 'enteredEmail', value: event.target.value});
  };

  const passwordChangeHandler = event => {
    if (event.target.id === 're-password') {
      dispatchUserData({action: 'UPDATE_USER_DATA', context: 'reEnteredPassword', value: event.target.value.trim()});
    } else {
      dispatchUserData({action: 'UPDATE_USER_DATA', context: 'enteredPassword', value: event.target.value.trim()});
    }
  };

  const validateEmailHandler = () => {
    dispatchUserData({
      action: 'UPDATE_USER_DATA',
      context: 'emailIsValid',
      value: userData.enteredEmail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    });
  };

  const validatePasswordHandler = event => {
    if (event.target.id === 're-password') {
      dispatchUserData({
        action: 'UPDATE_USER_DATA',
        context: 'reEnteredPasswordIsValid',
        value: userData.reEnteredPassword.length > 6
      });
    } else {
      dispatchUserData({
        action: 'UPDATE_USER_DATA',
        context: 'passwordIsValid',
        value: userData.enteredPassword.length > 6
      });
    }
  };

  const submitHandler = event => {
    event.preventDefault();
    dispatchUserData({});
    onSignUp(userData.enteredEmail, userData.enteredPassword);
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
        <div className={`${styles.control} ${!userData.emailIsValid ? styles.invalid : ''}`}>
          <Input
            id="email"
            type="text"
            name="email"
            label="E-Mail"
            value={userData.enteredEmail}
            className={styles['form-text']}
            changeHandler={emailChangeHandler}
            blurHandler={validateEmailHandler}
          />
        </div>
        <div className={`${styles.control} ${!userData.passwordIsValid ? styles.invalid : ''}`}>
          <Input
            id="password"
            type="password"
            name="password"
            label="Password"
            value={userData.enteredPassword}
            className={styles['form-text']}
            changeHandler={passwordChangeHandler}
            blurHandler={validatePasswordHandler}
          />
        </div>
        <div className={`${styles.control} ${!userData.reEnteredPasswordIsValid === false ? styles.invalid : ''}`}>
          <Input
            id="re-password"
            type="password"
            name="re-password"
            label="Re-Enter Password"
            value={userData.reEnteredPassword}
            className={styles['form-text']}
            changeHandler={passwordChangeHandler}
            blurHandler={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!userData.formIsValid}>
            SignUp
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Auth;
