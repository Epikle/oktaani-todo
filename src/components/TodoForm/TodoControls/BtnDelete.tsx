import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { deleteCollection } from '../../../context/todoSlice';
import { resetSelection } from '../../../context/selectedSlice';
import { AppDispatch } from '../../../context/store';
import { TSelected } from '../../../types';

type Props = {
  className: string;
  dispatch: AppDispatch;
  selectedCollection: TSelected;
};

const BtnDelete: FC<Props> = ({ className, dispatch, selectedCollection }) => {
  const deleteBtnHandler = () => {
    if (confirm('Are you sure?')) {
      dispatch(deleteCollection({ id: selectedCollection.id }));
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
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
};

export default BtnDelete;
