import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

import useTodoStore from '../../../context/useTodoStore';
import useSettingsStore from '../../../context/useSettingsStore';
import useLanguage from '../../../hooks/useLanguage';
import Button from '../Button';

import styles from './Sort.module.scss';

type Props = {
  disabled: boolean;
};

const Sort: FC<Props> = ({ disabled }) => {
  const collections = useTodoStore((state) => state.collections);
  const sort = useSettingsStore((state) => state.sort);
  const { toggleSort } = useSettingsStore((state) => state.actions);
  const { text } = useLanguage();

  return (
    <Button
      className={sort ? [styles.sort, styles['sort-active']].join(' ') : styles.sort}
      onClick={toggleSort}
      title={text.controls.sort}
      disabled={disabled || !collections}
    >
      <FontAwesomeIcon icon={faArrowDownShortWide} />
    </Button>
  );
};

export default Sort;
