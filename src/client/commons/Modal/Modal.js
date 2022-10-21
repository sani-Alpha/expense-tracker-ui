import {FaTimes} from 'react-icons/fa';
import Card from '../Card/Card';
import styles from './Modal.module.scss';

const Modal = ({show, children, className, hideHeader, isFullScreen, isScrollable, title, onClose}) => {
  const classes = isFullScreen
    ? styles['modal-container'] + ' ' + styles['full-screen-modal-container']
    : styles['modal-container'];
  const customClasses = className ? `${classes} ${className}` : classes;

  return (
    <>
      {show && (
        <>
          <div className={styles.backdrop}></div>
          <Card className={customClasses}>
            {!hideHeader && (
              <div className={styles.header}>
                <div className={styles['header_title']}>{title}</div>
                <span className={styles.close} onClick={onClose}>
                  <FaTimes />
                </span>
              </div>
            )}
            <div className={isScrollable ? styles.content + ' ' + styles['modal-body-scrollable'] : styles.content}>
              {children}
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default Modal;
