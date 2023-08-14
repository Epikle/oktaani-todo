import { CSSProperties, FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import useTodoStore from '../../context/useTodoStore';
import useSettingsStore from '../../context/useSettingsStore';
import Welcome from '../UI/Welcome';
import TodoCollection from '../TodoCollection/TodoCollection';
import Footer from '../UI/Footer';

import styles from './TodoList.module.scss';

const TodoList: FC = () => {
  const parent = useRef<HTMLDivElement>(null);
  const collections = useTodoStore((state) => state.collections);
  const help = useTodoStore((state) => state.help);
  const sort = useSettingsStore((state) => state.sort);
  const { changeOrder } = useTodoStore((state) => state.actions);

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const moveCollection = (dragIndex: number, hoverIndex: number) => {
    changeOrder({ dragIndex, hoverIndex });
  };

  const sortStyles: CSSProperties = sort ? { gridTemplateColumns: '1fr' } : {};

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.collections} ref={parent} style={sortStyles}>
          {collections && collections.length > 0 && !help ? (
            collections.map((collection, index) => (
              <TodoCollection
                key={collection.id}
                collection={collection}
                index={index}
                moveCollection={moveCollection}
              />
            ))
          ) : (
            <Welcome />
          )}
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default TodoList;
