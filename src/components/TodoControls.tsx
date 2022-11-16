import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faShareNodes,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';

import styles from './TodoControls.module.scss';

const TodoControls: React.FC = () => {
  return (
    <ul className={styles.controls}>
      <li>
        <button>
          <FontAwesomeIcon icon={faListCheck} />
        </button>
      </li>
      <li>
        <button>
          <FontAwesomeIcon icon={faShareNodes} />
        </button>
      </li>
      <li>
        <button>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </li>
      <li>
        <button>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    </ul>
  );
};

export default TodoControls;
