import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { setSelectedCollectionEdit } from '../../../context/selectedSlice';
import { AppDispatch } from '../../../context/store';
import { TSelected } from '../../../types';

type Props = {
  dispatch: AppDispatch;
  selectedCollection: TSelected;
};

const BtnEdit: FC<Props> = ({ dispatch, selectedCollection }) => {
  const editBtnHandler = () => {
    dispatch(setSelectedCollectionEdit({ edit: !selectedCollection.edit }));
  };

  return (
    <li>
      <button
        aria-label="Edit collection title"
        title="Edit collection title"
        onClick={editBtnHandler}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
    </li>
  );
};

export default BtnEdit;
