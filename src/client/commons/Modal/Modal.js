import Card from '../Card/Card';
import styles from './Modal.module.scss';

const Modal = ({show, children, className}) => {
  return (
    <>
      {show && (
        <div className={styles.backdrop}>
          <Card className={className}>{children}</Card>
        </div>
      )}
    </>
  );
};

export default Modal;
