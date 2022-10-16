import './DropDown.scss';

const DropDown = ({options, title, id, selected, onChangeHandler, className, labelClass}) => {
  const classes = className ? 'dropdown ' + className : 'dropdown';

  let label;
  if (title) {
    label = (
      <label className={labelClass} htmlFor={id}>
        {title}
      </label>
    );
  }

  const valueChangeHandler = event => {
    onChangeHandler(event.target.value);
  };
  return (
    <div className="dropdown-container">
      {label}
      <select id={id} value={selected} className={classes} onChange={valueChangeHandler}>
        {options.map(option => {
          return (
            <option value={option.value} key={option._id}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
