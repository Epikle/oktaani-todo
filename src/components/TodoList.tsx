import { FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import Footer from './UI/Footer';
import TodoCollection from './TodoCollection';
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
      <div className={styles.container} ref={parent}>
        {collections.length === 0 && <p>No todos</p>}
        {collections.length > 0 &&
          collections.map((collection) => (
            <TodoCollection key={collection.id} collection={collection} />
          ))}
      </div>
      <Footer />
    </main>
  );
};

export default TodoList;
