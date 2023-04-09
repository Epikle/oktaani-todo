import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../../hooks/useLanguage';
import Button from '../Button';

import styles from './Sort.module.scss';
import useBoundStore from '../../../context/useBoundStore';

type Props = {
  disabled: boolean;
};

const Sort: FC<Props> = ({ disabled }) => {
  const { sort, collections, sortCollections } = useBoundStore();
  const { text } = useLanguage();

  return (
    <Button
      className={sort ? [styles.sort, styles['sort-active']].join(' ') : styles.sort}
      onClick={sortCollections}
      title={text.controls.sort}
      disabled={disabled || collections.length === 0}
    >
      <FontAwesomeIcon icon={faArrowDownShortWide} />
    </Button>
  );
};

export default Sort;
