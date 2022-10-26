import moment from 'moment';
import {useState, useEffect, useReducer, useContext, useRef} from 'react';
import {Card, Button, Input} from '../../../../common/index';
import styles from './NewExpense.module.scss';
import AppContext from '../../../../partials/context/app.context';

const setNewExpenseData = (prevState, action) => {
  const {type, value, context} = action;
  if (type === 'UPDATE_EXPENSE_DATA') {
    return {...prevState, [context]: value};
  }
  return {title: '', price: 0, date: new Date()};
};

const NewExpense = ({addExpenseToList}) => {
  const {__} = useContext(AppContext);
  const minDate = moment().subtract(4, 'years').format('YYYY-MM-DD');
  const maxDate = moment().format('YYYY-MM-DD');

  const [newExpenseData, newExpenseDataDispatch] = useReducer(setNewExpenseData, {
    title: '',
    price: 0,
    date: new Date()
  });
  const [validity, setValidity] = useState({titleIsValid: false, priceIsValid: false, allowSubmit: false});

  useEffect(() => {
    const timer = setTimeout(() => {
      setValidity(prevState => {
        return {...prevState, allowSubmit: validity.priceIsValid && validity.titleIsValid};
      });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [validity.priceIsValid, validity.titleIsValid]);

  const expenseDataHandler = event => {
    const context = event.target.name;
    const value = event?.target?.value;

    let modifiedValue = value;
    if (context === 'date') {
      modifiedValue = moment(value).toDate();
    } else if (context === 'price') {
      modifiedValue = Number(value);
    }

    newExpenseDataDispatch({type: 'UPDATE_EXPENSE_DATA', value: modifiedValue, context});
  };

  const validateInputHandler = event => {
    const context = event.target.name;

    if (context === 'title') {
      setValidity(prevState => {
        return {...prevState, titleIsValid: newExpenseData.title.trim().length > 0};
      });
    } else if (context === 'price') {
      setValidity(prevState => {
        return {...prevState, priceIsValid: newExpenseData.price >= 0};
      });
    }
  };

  const titleInputRef = useRef();
  const priceInputRef = useRef();

  const submitNewExpenseHandler = event => {
    if (validity.allowSubmit) {
      addExpenseToList({...newExpenseData, _id: (Math.random() + 1).toString(36).substring(7)});
      newExpenseDataDispatch({type: 'RESET_NEW_EXPENSE_DATA'});
    } else if (!validity.titleIsValid) {
      titleInputRef.current.focus();
    } else if (!validity.priceIsValid) {
      priceInputRef.current.focus();
    }
  };

  return (
    <Card className={styles['new-expense-card']}>
      <div className={styles.form}>
        <label className={styles.heading}>{__('new_expense_form_title')}</label>
        <div className={styles['form-controllers']}>
          <Input
            ref={titleInputRef}
            id="new-expense-title"
            name="title"
            label={__('new_expense_form_title_label')}
            type="text"
            isValid={validity.titleIsValid}
            value={newExpenseData.title}
            changeHandler={expenseDataHandler}
            blurHandler={validateInputHandler}
          />
          <Input
            ref={priceInputRef}
            id="new-expense-price"
            name="price"
            isValid={validity.priceIsValid}
            value={newExpenseData.price}
            label={__('new_expense_form_price_label')}
            type="number"
            min="0.1"
            step="0.1"
            changeHandler={expenseDataHandler}
            blurHandler={validateInputHandler}
          />
          <Input
            id="new-expense-date"
            name="date"
            isValid="true"
            label={__('new_expense_form_date_label')}
            value={moment(newExpenseData.date).format('YYYY-MM-DD')}
            type="date"
            min={minDate}
            max={maxDate}
            changeHandler={expenseDataHandler}
          />
        </div>
        <div className={styles['form-action-cta']}>
          <Button clickHandler={submitNewExpenseHandler}>{__('new_expense_form_button_label')}</Button>
        </div>
      </div>
    </Card>
  );
};

export default NewExpense;
