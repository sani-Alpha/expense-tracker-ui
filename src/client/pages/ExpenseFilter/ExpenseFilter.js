import DropDown from '../../components/DropDown/DropDown';
import './ExpenseFilter.scss';

const ExpenseFilter = ({changeHandler, selected}) => {
  const options = [
    {label: '2022', value: 2022, _id: 1},
    {label: '2021', value: 2021, _id: 2},
    {label: '2020', value: 2020, _id: 3},
    {label: '2019', value: 2019, _id: 4},
    {label: '2018', value: 2018, _id: 5}
  ];

  const onSelectedYearChange = newValue => {
    changeHandler(newValue);
  };
  return (
    <div className="expense-filter-container">
      <label>Filter by year</label>
      <DropDown
        options={options}
        id="expense-filter-years"
        selected={selected}
        onChangeHandler={onSelectedYearChange}
      />
    </div>
  );
};

export default ExpenseFilter;
