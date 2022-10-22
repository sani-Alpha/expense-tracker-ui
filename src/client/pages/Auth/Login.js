import {useState, useEffect, useReducer, useContext} from 'react';
import {Card, Button, Input} from '../../commons/index';
import SignUp from './SignUp';
import styles from './Login.module.scss';
import AuthContext from '../../partials/store/auth.store';
import AppContext from '../../partials/store/app.store';

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

const Login = () => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const {login, signUp} = useContext(AuthContext);
  const {__} = useContext(AppContext);
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
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userData.enteredEmail) &&
          userData.enteredPassword.length > 6
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [userData.enteredEmail, userData.enteredPassword]);

  const emailChangeHandler = event => {
    dispatchUserData({action: 'UPDATE_USER_DATA', context: 'enteredEmail', value: event.target.value.trim()});
  };

  const passwordChangeHandler = event => {
    dispatchUserData({action: 'UPDATE_USER_DATA', context: 'enteredPassword', value: event.target.value.trim()});
  };

  const validateEmailHandler = () => {
    dispatchUserData({
      action: 'UPDATE_USER_DATA',
      context: 'emailIsValid',
      value: emailRegex.test(userData.enteredEmail)
    });
  };

  const validatePasswordHandler = () => {
    dispatchUserData({
      action: 'UPDATE_USER_DATA',
      context: 'passwordIsValid',
      value: userData.enteredPassword.length > 6
    });
  };

  const submitHandler = event => {
    event.preventDefault();
    dispatchUserData({});
    login(userData.enteredEmail, userData.enteredPassword);
  };
  return (
    <>
      <SignUp
        show={showSignUpForm}
        onSignUp={(email, password) => {
          toggleSignUpForm(prevState => !prevState);
          signUp(email, password);
        }}
        close={toggleSignUpForm}
      />
      <Card className={styles.login}>
        <div className={styles['header_title']}>{__('login')}</div>
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
          <div className={`${styles.control} ${userData.passwordIsValid === false ? styles.invalid : ''}`}>
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
          <div className={styles['form-action-cta']}>
            <Button type="submit" className={styles.btn} disabled={!userData.formIsValid}>
              {__('login')}
            </Button>
          </div>
        </form>
        <div className={styles.alternates}>
          <div onClick={() => toggleSignUpForm(prevState => !prevState)}>{__('login_form_alternate')}</div>
        </div>
      </Card>
    </>
  );
};

export default Login;
