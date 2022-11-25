import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';

import { removeDoneItems } from '../../../context/todoSlice';
import { AppDispatch } from '../../../context/store';

type Props = {
  dispatch: AppDispatch;
  collectionId: string;
};

const BtnRemoveDone: FC<Props> = ({ dispatch, collectionId }) => {
  const removeDoneBtnHandler = () => {
    dispatch(removeDoneItems({ id: collectionId }));
  };

  return (
    <li>
      <button
        aria-label="Remove done items"
        title="Remove done items"
        onClick={removeDoneBtnHandler}
      >
        <FontAwesomeIcon icon={faListCheck} />
      </button>
    </li>
  );
};

export default BtnRemoveDone;
