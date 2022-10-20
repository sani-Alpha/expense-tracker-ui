import './Input.scss';

const Input = ({id, name, label, value, dataType, min, max, step, className, changeHandler}) => {
  const classes = className ? 'form-control-input ' + className : 'form-control-input';
  let input = (
    <input type="text" id={id} value={value} className="input-box" onChange={event => changeHandler(event, name)} />
  );

  if (dataType === 'number') {
    input = (
      <input
        type="number"
        id={id}
        value={value}
        className="input-box"
        min={min}
        step={step}
        onChange={event => changeHandler(event, name)}
      />
    );
  } else if (dataType === 'date') {
    input = (
      <input
        type="date"
        id={id}
        value={value}
        className="input-box"
        min={min}
        max={max}
        onChange={event => changeHandler(event, name)}
      />
    );
  }

  return (
    <div className={classes}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      {input}
    </div>
  );
};

export default Input;
