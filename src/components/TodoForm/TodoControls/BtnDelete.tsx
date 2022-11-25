import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { deleteCollection } from '../../../context/todoSlice';
import { resetSelection } from '../../../context/selectedSlice';
import { AppDispatch } from '../../../context/store';

type Props = {
  className?: string;
  dispatch: AppDispatch;
  collectionId: string;
};

const BtnDelete: FC<Props> = ({ className, dispatch, collectionId }) => {
  const deleteBtnHandler = () => {
    if (confirm('Are you sure?')) {
      dispatch(deleteCollection({ id: collectionId }));
      dispatch(resetSelection());
    }
  };

  return (
    <li>
      <button
        className={className}
        aria-label="Remove collection"
        title="Remove collection"
        onClick={deleteBtnHandler}
        data-testid="btn-delete"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default BtnDelete;
