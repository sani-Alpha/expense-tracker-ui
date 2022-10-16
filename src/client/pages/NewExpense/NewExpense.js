import moment from 'moment';
import {useState} from 'react';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import './NewExpense.scss';

const NewExpense = ({addExpenseToList}) => {
  const minDate = moment().subtract(4, 'years').format('YYYY-MM-DD');
  const maxDate = moment().format('YYYY-MM-DD');

  const [newExpenseData, setNewExpenseData] = useState({title: '', price: 0, date: new Date()});

  const expenseDataHandler = (event, context) => {
    const value = event?.target?.value;

    let modifiedValue = value;
    if (context === 'date') {
      modifiedValue = moment(value).toDate();
    } else if (context === 'price') {
      modifiedValue = Number(value);
    }

    event.preventDefault();
    setNewExpenseData(prevState => {
      return {
        ...prevState,
        [context]: modifiedValue
      };
    });
  };

  const submitNewExpenseHandler = event => {
    event.preventDefault();
    addExpenseToList({...newExpenseData, _id: (Math.random() + 1).toString(36).substring(7)});
    setNewExpenseData({title: '', price: '', date: new Date()});
  };

  return (
    <Card className="new-expense-card">
      <div className="expense-form">
        <label className="heading">Enter the details of new Expense:</label>
        <div className="expense-form-controllers">
          <div className="expense-form-control">
            <Input
              id="new-expense-title"
              name="title"
              label="Title"
              value={newExpenseData.title}
              className="expense-form-text"
              changeHandler={expenseDataHandler}
            />
          </div>
          <div className="expense-form-control">
            <Input
              id="new-expense-price"
              name="price"
              value={newExpenseData.price}
              label="Price"
              dataType="number"
              min="0.1"
              step="0.1"
              className="expense-form-text"
              changeHandler={expenseDataHandler}
            />
          </div>
          <div className="expense-form-control">
            <Input
              id="new-expense-date"
              name="date"
              label="Date"
              value={moment(newExpenseData.date).format('YYYY-MM-DD')}
              dataType="date"
              min={minDate}
              max={maxDate}
              className="expense-form-text"
              changeHandler={expenseDataHandler}
            />
          </div>
        </div>
        <div className="expense-form-action-cta">
          <button onClick={submitNewExpenseHandler}>Add Expense</button>
        </div>
      </div>
    </Card>
  );
};

export default NewExpense;
