import {useState, useEffect, useReducer} from 'react';
import {Card, Button, Input} from '../../commons/index';
import SignUp from './SignUp';
import styles from './Auth.module.scss';

const userDataReducer = (prevState, {action, value, context}) => {
  if (action === 'UPDATE_USER_DATA') {
    return {...prevState, [context]: value};
  }

  return {
    enteredEmail: '',
    enteredPassword: '',
    emailIsValid: false,
    passwordIsValid: false,
    formIsValid: false
  };
};

const Auth = ({onLogin, onSignUp}) => {
  const [showSignUpForm, toggleSignUpForm] = useState(false);
  const [userData, dispatchUserData] = useReducer(userDataReducer, {
    enteredEmail: '',
    enteredPassword: '',
    emailIsValid: false,
    passwordIsValid: false,
    formIsValid: false
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchUserData({
        action: 'UPDATE_USER_DATA',
        context: 'formIsValid',
        value:
          userData.enteredEmail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) &&
          userData.enteredPassword.trim() > 6
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [userData.enteredEmail, userData.enteredPassword]);

  const emailChangeHandler = event => {
    dispatchUserData({action: 'UPDATE_USER_DATA', context: 'enteredEmail', value: event.target.value});
  };

  const passwordChangeHandler = event => {
    dispatchUserData({action: 'UPDATE_USER_DATA', context: 'enteredPassword', value: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchUserData({
      action: 'UPDATE_USER_DATA',
      context: 'emailIsValid',
      value: userData.enteredEmail.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    });
  };

  const validatePasswordHandler = () => {
    dispatchUserData({
      action: 'UPDATE_USER_DATA',
      context: 'passwordIsValid',
      value: userData.enteredPassword.trim().length > 6
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    dispatchUserData({});
    onLogin(userData.enteredEmail, userData.enteredPassword);
  };
  return (
    <>
      <SignUp
        show={showSignUpForm}
        onSignUp={(email, password) => {
          toggleSignUpForm(!showSignUpForm);
          onSignUp(email, password);
        }}
        close={toggleSignUpForm}
      />
      <Card className={styles.login}>
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
          <div className={`${styles.control} ${userData.passwordIsValid === false ? styles.invalid : ''}`}>
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
          <div className={styles['form-action-cta']}>
            <Button type="submit" className={styles.btn} disabled={!userData.formIsValid}>
              Login
            </Button>
          </div>
        </form>
        <div className={styles.alternates}>
          <div onClick={() => toggleSignUpForm(!showSignUpForm)}>Not registered? SignUp Instead!</div>
        </div>
      </Card>
    </>
  );
};

export default Auth;
