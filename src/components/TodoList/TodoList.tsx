import { CSSProperties, FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import useSettingsStore from '../../context/useSettingsStore';
import useTodoStore from '../../context/useTodoStore';
import TodoCollection from '../TodoCollection/TodoCollection';
import Welcome from '../UI/Welcome';

import styles from './TodoList.module.scss';

const TodoList: FC = () => {
  const parent = useRef<HTMLDivElement>(null);
  const collections = useTodoStore((state) => state.collections);
  const help = useSettingsStore((state) => state.help);
  const sort = useSettingsStore((state) => state.sort);

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const sortStyles: CSSProperties = sort ? { gridTemplateColumns: '1fr' } : {};

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.collections} ref={parent} style={sortStyles}>
          {(help || !collections) && <Welcome />}
          {!help &&
            collections?.map((collection, index) => (
              <TodoCollection key={collection.id} collection={collection} index={index} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default TodoList;
