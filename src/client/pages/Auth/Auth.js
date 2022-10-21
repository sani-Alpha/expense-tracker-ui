import {useState, useEffect} from 'react';
import {Card, Button, Input} from '../../commons/index';
import SignUp from './SignUp';
import styles from './Auth.module.scss';

// const setValidation = (prevState, {type, value, context}) => {
//   if (type === 'UPDATE_VALIDATION_STATE') {
//     return {...prevState, [context]: value};
//   }

//   return {};
// };

const Auth = ({onLogin}) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [showSignUpForm, toggleSignUpForm] = useState(false);
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
    setEnteredPassword(event.target.value);

    setFormIsValid(enteredEmail.includes('@') && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = event => {
    event.preventDefault();
    onLogin(enteredEmail, enteredPassword);
  };
  return (
    <>
      <SignUp show={showSignUpForm} close={toggleSignUpForm} />
      <Card className={styles.login}>
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
          <div className={styles['form-action-cta']}>
            <Button type="submit" className={styles.btn} disabled={!formIsValid}>
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
