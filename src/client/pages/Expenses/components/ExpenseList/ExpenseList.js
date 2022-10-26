import {useContext, memo, useMemo} from 'react';
import moment from 'moment';
import ExpenseItem from './ExpenseItem';
import {Graph} from '../../../../common/index';
import AppContext from '../../../../partials/store/app.store';

const ExpenseList = ({data, filter}) => {
  const {__} = useContext(AppContext);

  const qualifiyingData = useMemo(() => {
    return filter === '-1' ? data : data.filter(item => item.date.getFullYear() === Number(filter));
  }, [data, filter]);
  const months = moment.monthsShort();
  const labels = months.map(month => {
    return {label: month, value: 0};
  });

  if (qualifiyingData.length) {
    qualifiyingData.forEach(data => {
      const expenseMonth = data.date.getMonth();
      labels[expenseMonth].value += 1;
    });
  }

  if (qualifiyingData.length) {
    return (
      <>
        <Graph
          dataPoints={labels}
          maxValue={qualifiyingData.length}
          graphCardClass="expense-graph-container"
          fillMeterClass="expense-graph-fill-meter"
          fillMeterFillClass="expense-graph-fill-meter__fill"
        />

        <div>
          {qualifiyingData.map(item => (
            <ExpenseItem key={item._id} item={item.title} price={item.price} date={item.date} />
          ))}
        </div>
      </>
    );
  }
  return <h2 style={{textAlign: 'center'}}>{__('no_expenses')}</h2>;
};

export default memo(ExpenseList);
