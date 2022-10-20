import styles from './DropDown.module.scss';

const DropDown = ({options, title, id, selected, onChangeHandler, className, labelClass}) => {
  const classes = className ? `${styles.dropdown} ` + className : styles.dropdown;

  let label;
  if (title) {
    label = (
      <label className={labelClass} htmlFor={id}>
        {title}
      </label>
    );
  }

  return (
    <div className={styles['dropdown-container']}>
      {label}
      <select id={id} value={selected} className={classes} onChange={e => onChangeHandler(e.target.value)}>
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
