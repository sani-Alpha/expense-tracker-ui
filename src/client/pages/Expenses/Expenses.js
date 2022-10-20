import {useState} from 'react';
import ExpenseList from './components/ExpenseList/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter/ExpenseFilter';
import NewExpense from './components/NewExpense/NewExpense';
import Card from '../../commons/Card/Card';
import './Expenses.scss';

const Expenses = () => {
  const expenseList = [
    {_id: 1, title: 'Car Insurance', price: 24000, date: new Date(2019, 11, 20)},
    {_id: 2, title: 'House Loan', price: 120000, date: new Date(2020, 0, 1)},
    {_id: 3, title: 'Groccery', price: 4800, date: new Date(2020, 0, 5)},
    {_id: 4, title: 'Income Tax', price: 9000, date: new Date(2020, 0, 14)}
  ];

  const [data, setData] = useState(expenseList);
  const [selectedYear, setSelectedYear] = useState('-1');

  return (
    <div className="body-container">
      <NewExpense addExpenseToList={newExpense => setData(prevState => [newExpense, ...prevState])} />
      <Card className="list-card">
        <ExpenseFilter selected={selectedYear} changeHandler={year => setSelectedYear(year)} />
        <ExpenseList data={data} filter={selectedYear} />
      </Card>
    </div>
  );
};

export default Expenses;
