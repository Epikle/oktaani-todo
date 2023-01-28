import { FC, useEffect, useRef, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import TodoControls from '../TodoForm/TodoControls';
import TodoForm from '../TodoForm/TodoForm';
import Settings from './Settings/Settings';
import Confirm from './Confirm';
import { deleteCollection } from '../../context/todoSlice';
import { resetSelection } from '../../context/selectedSlice';

import styles from './Header.module.scss';

const Header: FC = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const { selected, id } = useAppSelector((state) => state.selected);
  const dispatch = useAppDispatch();
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const deleteBtnHandler = () => {
    setIsConfirm((prevS) => !prevS);
  };

  const deleteConfirmBtnHandler = () => {
    dispatch(deleteCollection({ id }));
    dispatch(resetSelection());
    setIsConfirm(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container} ref={parent}>
        <div className={styles.row}>
          <div className={styles.logo}>
            <h1>
              oktaani<strong>TODO</strong>
            </h1>
          </div>
          {selected ? (
            <TodoControls deleteBtnHandler={deleteBtnHandler} />
          ) : (
            <Settings />
          )}
        </div>
        {isConfirm ? (
          <Confirm
            confirm={deleteConfirmBtnHandler}
            cancel={deleteBtnHandler}
          />
        ) : (
          <TodoForm />
        )}
      </div>
    </header>
  );
};

export default Header;
