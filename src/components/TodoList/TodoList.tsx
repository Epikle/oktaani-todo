import { FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import { useAppSelector } from '../../hooks/useRedux';
import TodoCollection from '../TodoCollection/TodoCollection';
import Footer from '../UI/Footer';

import styles from './TodoList.module.scss';
import useLanguage from '../../hooks/useLanguage';

const TodoList: FC = () => {
  const collections = useAppSelector((state) => state.todo);
  const parent = useRef<HTMLDivElement>(null);
  const { text } = useLanguage();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {collections.length === 0 && (
          <div className={styles.empty}>{text.collection.empty}</div>
        )}
        <div className={styles.collections} ref={parent}>
          {collections.length > 0 &&
            collections.map((collection) => (
              <TodoCollection key={collection.id} collection={collection} />
            ))}
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default TodoList;
