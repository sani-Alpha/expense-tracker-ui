import moment from 'moment';
import {useState, useEffect, useReducer, useContext} from 'react';
import {Card, Button, Input} from '../../../../commons/index';
import styles from './NewExpense.module.scss';
import AppContext from '../../../../partials/store/app.store';

const setNewExpenseData = (prevState, action) => {
  const {type, value, context} = action;
  if (type === 'UPDATING_EXPENSE_DATA') {
    return {...prevState, [context]: value};
  }
  return {title: '', price: '', date: new Date()};
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
  const [allowSubmit, setAllowSubmit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllowSubmit(newExpenseData.price > 0 && newExpenseData.title.trim().length > 0);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [newExpenseData.price, newExpenseData.title]);

  const expenseDataHandler = (event, context) => {
    const value = event?.target?.value;

    let modifiedValue = value;
    if (context === 'date') {
      modifiedValue = moment(value).toDate();
    } else if (context === 'price') {
      modifiedValue = Number(value);
    }

    event.preventDefault();
    newExpenseDataDispatch({type: 'UPDATING_EXPENSE_DATA', value: modifiedValue, context});
  };

  const submitNewExpenseHandler = event => {
    event.preventDefault();
    addExpenseToList({...newExpenseData, _id: (Math.random() + 1).toString(36).substring(7)});
    newExpenseDataDispatch({type: 'RESET_NEW_EXPENSE_DATA'});
  };

  return (
    <Card className={styles['new-expense-card']}>
      <div className={styles.form}>
        <label className={styles.heading}>{__('new_expense_form_title')}</label>
        <div className={styles['form-controllers']}>
          <div className={styles['form-control']}>
            <Input
              id="new-expense-title"
              name="title"
              label={__('new_expense_form_title_label')}
              type="text"
              value={newExpenseData.title}
              className={styles['form-text']}
              changeHandler={expenseDataHandler}
            />
          </div>
          <div className={styles['form-control']}>
            <Input
              id="new-expense-price"
              name="price"
              value={newExpenseData.price}
              label={__('new_expense_form_price_label')}
              type="number"
              min="0.1"
              step="0.1"
              className={styles['form-text']}
              changeHandler={expenseDataHandler}
            />
          </div>
          <div className={styles['form-control']}>
            <Input
              id="new-expense-date"
              name="date"
              label={__('new_expense_form_date_label')}
              value={moment(newExpenseData.date).format('YYYY-MM-DD')}
              type="date"
              min={minDate}
              max={maxDate}
              className={styles['form-text']}
              changeHandler={expenseDataHandler}
            />
          </div>
        </div>
        <div className={styles['form-action-cta']}>
          <Button disabled={!allowSubmit} clickHandler={submitNewExpenseHandler}>
            {__('new_expense_form_button_label')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NewExpense;
