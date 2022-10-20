import moment from 'moment';
import {useState, useEffect, useReducer} from 'react';
import Card from '../../commons/Card/Card';
import Input from '../../commons/Input/Input';
import styles from './NewExpense.module.scss';

const setNewExpenseData = (prevState, action) => {
  const {type, value, context} = action;
  if (type === 'UPDATING_EXPENSE_DATA') {
    return {...prevState, [context]: value};
  }
  return {title: '', price: '', date: new Date()};
};

const NewExpense = ({addExpenseToList}) => {
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
    }, 500);

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
        <label className={styles.heading}>Enter the details of new Expense:</label>
        <div className={styles['form-controllers']}>
          <div className={styles['form-control']}>
            <Input
              id="new-expense-title"
              name="title"
              label="Title"
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
              label="Price"
              dataType="number"
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
              label="Date"
              value={moment(newExpenseData.date).format('YYYY-MM-DD')}
              dataType="date"
              min={minDate}
              max={maxDate}
              className={styles['form-text']}
              changeHandler={expenseDataHandler}
            />
          </div>
        </div>
        <div className={styles['form-action-cta']}>
          <button disabled={!allowSubmit} onClick={submitNewExpenseHandler}>
            Add Expense
          </button>
        </div>
      </div>
    </Card>
  );
};

export default NewExpense;
