import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

const BtnShare = () => {
  return (
    <li>
      <button aria-label="Share collection" title="Share collection">
        <FontAwesomeIcon icon={faShareNodes} />
      </button>
    </li>
  );
};

export default BtnShare;
