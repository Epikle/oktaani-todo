import TodoItem from './TodoItem';

import styles from './TodoCollection.module.scss';

const TodoCollection: React.FC = () => {
  return (
    <article className={styles.collection} data-done="1" data-total="3">
      <h2>Nettisivut</h2>
      <ul className={styles['item-list']}>
        <TodoItem text="Test item" />
        <TodoItem text="Test item 2" />
        <TodoItem text="Test item 3" />
      </ul>
    </article>
  );
};

export default TodoCollection;
