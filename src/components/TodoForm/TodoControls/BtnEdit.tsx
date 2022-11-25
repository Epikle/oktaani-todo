import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { setSelectedCollectionEdit } from '../../../context/selectedSlice';
import { AppDispatch } from '../../../context/store';

type Props = {
  dispatch: AppDispatch;
  collectionEdit: boolean;
};

const BtnEdit: FC<Props> = ({ dispatch, collectionEdit }) => {
  const editBtnHandler = () => {
    dispatch(setSelectedCollectionEdit({ edit: !collectionEdit }));
  };

  return (
    <li>
      <button
        aria-label="Edit collection title"
        title="Edit collection title"
        onClick={editBtnHandler}
        data-testid="btn-edit"
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
    </li>
  );
};

export default BtnEdit;
