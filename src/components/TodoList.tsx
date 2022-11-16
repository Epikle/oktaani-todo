import { FC } from 'react';

import { TCollection } from '../types';
import TodoCollection from './TodoCollection';

import styles from './TodoList.module.scss';

type Props = {
  collections: TCollection[] | [];
};

const TodoList: FC<Props> = ({ collections }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {collections.length === 0 && <p>No todos</p>}
        {collections.length > 0 &&
          collections.map((collection) => (
            <TodoCollection key={collection.id} collection={collection} />
          ))}
      </div>
    </main>
  );
};

export default TodoList;
