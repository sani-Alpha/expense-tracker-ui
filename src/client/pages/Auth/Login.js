import {useState, useEffect, useReducer, useContext, useRef, memo} from 'react';
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

  const inputChangeHandler = event => {
    dispatchUserData({action: 'UPDATE_USER_DATA', context: event.target.name, value: event.target.value.trim()});
  };

  const validateInputHandler = event => {
    const context = event.target.name;

    if (context === 'enteredPassword') {
      dispatchUserData({
        action: 'UPDATE_USER_DATA',
        context: 'passwordIsValid',
        value: userData.enteredPassword.length > 6
      });
    } else if (context === 'enteredEmail') {
      dispatchUserData({
        action: 'UPDATE_USER_DATA',
        context: 'emailIsValid',
        value: emailRegex.test(userData.enteredEmail)
      });
    }
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const submitHandler = event => {
    event.preventDefault();
    if (userData.formIsValid) {
      login(userData.enteredEmail, userData.enteredPassword);
    } else if (!userData.emailIsValid) {
      emailInputRef.current.focus();
    } else if (!userData.passwordIsValid) {
      passwordInputRef.current.focus();
    }
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
          <Input
            id="email"
            ref={emailInputRef}
            type="text"
            name="enteredEmail"
            label={__('email')}
            isValid={userData.emailIsValid}
            value={userData.enteredEmail}
            changeHandler={inputChangeHandler}
            blurHandler={validateInputHandler}
          />
          <Input
            ref={passwordInputRef}
            id="password"
            type="password"
            name="enteredPassword"
            label={__('password')}
            isValid={userData.passwordIsValid}
            value={userData.enteredPassword}
            changeHandler={inputChangeHandler}
            blurHandler={validateInputHandler}
          />
          <div className={styles['form-action-cta']}>
            <Button type="submit" className={styles.btn}>
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

export default memo(Login);
