import {memo} from 'react';
import './ExpenseItem.scss';

const ExpenseItem = ({item, price, date}) => {
  const month = date.toLocaleString('en-IN', {month: 'long'});
  const day = date.toLocaleString('en-IN', {day: '2-digit'});
  const year = date.getFullYear();
  return (
    <div className="expense-item">
      <div className="date-container">
        <div className="_day">{day}</div>
        <div className="_month">{month}</div>
        <div className="_year">{year}</div>
      </div>
      <div className="expense-item_description">
        <h2>{item}</h2>
        <div className="expense-item_price">{price}</div>
      </div>
    </div>
  );
};

export default memo(ExpenseItem);
