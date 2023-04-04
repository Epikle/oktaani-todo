import { CSSProperties, FC, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

import useSettingsStore from '../../context/useSettingsStore';
import useTodoStore from '../../context/useTodoStore';

import useLanguage from '../../hooks/useLanguage';
import TodoCollection from '../TodoCollection/TodoCollection';
import Footer from '../UI/Footer';

import styles from './TodoList.module.scss';

const TodoList: FC = () => {
  const parent = useRef<HTMLDivElement>(null);
  const { sort } = useSettingsStore();
  const { collections, changeOrder } = useTodoStore();
  const { text } = useLanguage();

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
