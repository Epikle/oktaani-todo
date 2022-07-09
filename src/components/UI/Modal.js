import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = ({ children, onClick }) => {
  const content = (
    <Fragment>
      <div className="backdrop" onClick={onClick}></div>
      <div className="modal">{children}</div>
    </Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

export default Modal;
