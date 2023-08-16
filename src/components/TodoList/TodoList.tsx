import { CSSProperties, FC, Suspense, lazy, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import useSettingsStore from '../../context/useSettingsStore';
import useTodoStore from '../../context/useTodoStore';
import LoadingSpinner from '../UI/LoadingSpinner';

import styles from './TodoList.module.scss';

const Welcome = lazy(() => import('../UI/Welcome'));
const TodoCollection = lazy(() => import('../TodoCollection/TodoCollection'));

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
        <Suspense fallback={<LoadingSpinner />}>
          <div className={styles.collections} ref={parent} style={sortStyles}>
            {(help || !collections) && <Welcome />}

            {!help &&
              collections?.map((collection, index) => (
                <TodoCollection key={collection.id} collection={collection} index={index} />
              ))}
          </div>
        </Suspense>
      </div>
    </main>
  );
};

export default TodoList;
