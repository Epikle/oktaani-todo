import { FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import TodoCollection from './TodoCollection';
import Footer from './UI/Footer';
import { TCollection } from '../types';

import styles from './TodoList.module.scss';

type Props = {
  collections: TCollection[] | [];
};

const TodoList: FC<Props> = ({ collections }) => {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {collections.length === 0 && (
          <div className={styles.empty}>
            No collections, start by creating one.
          </div>
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
