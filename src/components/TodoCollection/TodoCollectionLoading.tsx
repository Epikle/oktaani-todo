import { FC, HTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../hooks/useLanguage';

type Props = {
  className: HTMLAttributes<HTMLElement>['className'];
};

const TodoCollectionLoading: FC<Props> = ({ className }) => {
  const { text } = useLanguage();

  return (
    <div className={className} style={{ textAlign: 'center' }}>
      <div>
        <h2>{text.common.loading}</h2>
        <FontAwesomeIcon icon={faSpinner} size="2xl" spinPulse />
      </div>
    </div>
  );
};

export default TodoCollectionLoading;
