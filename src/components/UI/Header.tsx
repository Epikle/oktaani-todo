import TodoForm from '../TodoForm';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>
            oktaani<strong>TODO</strong>
          </h1>
        </div>
        <TodoForm />
      </div>
    </header>
  );
};

export default Header;
