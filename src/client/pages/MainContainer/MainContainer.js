import {useState} from 'react';
import ExpenseItemList from '../Expenses/ExpenseItemList';
import ExpenseFilter from '../ExpenseFilter/ExpenseFilter';
import NewExpense from '../NewExpense/NewExpense';
import Card from '../../components/Card/Card';
import './MainContainer.scss';

const MainContainer = () => {
  const expenseList = [
    {_id: 1, title: 'Car Insurance', price: 24000, date: new Date(2019, 11, 20)},
    {_id: 2, title: 'House Loan', price: 120000, date: new Date(2020, 0, 1)},
    {_id: 3, title: 'Groccery', price: 4800, date: new Date(2020, 0, 5)},
    {_id: 4, title: 'Income Tax', price: 9000, date: new Date(2020, 0, 14)}
  ];

  const [data, setData] = useState(expenseList);
  const [selectedYear, setSelectedYear] = useState('2018');

  const addExpenseToListHandler = newExpense => {
    setData(prevState => {
      return [newExpense, ...prevState];
    });
  };

  const addYearFilterHandler = year => {
    setSelectedYear(year);
  };

  return (
    <div>
      <div className="header">Expense Tracker</div>
      <div className="body-container">
        <NewExpense addExpenseToList={addExpenseToListHandler} />
        <Card className="list-card">
          <ExpenseFilter selected={selectedYear} changeHandler={addYearFilterHandler} />
          <ExpenseItemList data={data} filter={selectedYear} />
        </Card>
      </div>
    </div>
  );
};

export default MainContainer;
