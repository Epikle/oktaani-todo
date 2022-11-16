import TodoCollection from './TodoCollection';
import TodoControls from './TodoControls';

import styles from './TodoList.module.scss';

const TodoList: React.FC = () => {
  return (
    <main className={styles.main}>
      <TodoControls />
      <TodoCollection />
    </main>
  );
};

export default TodoList;
