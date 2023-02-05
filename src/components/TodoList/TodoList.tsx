import { FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { changeOrder } from '../../context/todoSlice';
import useLanguage from '../../hooks/useLanguage';
import TodoCollection from '../TodoCollection/TodoCollection';
import Footer from '../UI/Footer';

import styles from './TodoList.module.scss';

const TodoList: FC = () => {
  const collections = useAppSelector((state) => state.todo);
  const parent = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { text } = useLanguage();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const moveCollection = (dragIndex: number, hoverIndex: number) => {
    dispatch(changeOrder({ dragIndex, hoverIndex }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.collections} ref={parent}>
          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <TodoCollection
                key={collection.id}
                collection={collection}
                index={index}
                moveCollection={moveCollection}
              />
            ))
          ) : (
            <div className={styles.empty}>{text.collection.empty}</div>
          )}
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default TodoList;
