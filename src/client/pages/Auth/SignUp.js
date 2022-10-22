import {useContext, useEffect, useReducer} from 'react';
import {Button, Input, Modal} from '../../commons/index';
import styles from './SignUp.module.scss';
import AppContext from '../../partials/store/app.store';

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

const SignUp = ({onSignUp, show, close}) => {
  const {__} = useContext(AppContext);
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
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userData.enteredEmail) &&
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
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userData.enteredEmail)
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
      className={styles.signup}
      hideHeader={false}
      title={__('sign_up')}
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
            label={__('email')}
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
            label={__('password')}
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
            label={__('re_password')}
            value={userData.reEnteredPassword}
            className={styles['form-text']}
            changeHandler={passwordChangeHandler}
            blurHandler={validatePasswordHandler}
          />
        </div>
        <div className={styles['form-action-cta']}>
          <Button type="submit" className={styles.btn} disabled={!userData.formIsValid}>
            {__('sign_up')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SignUp;
