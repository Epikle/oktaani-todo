import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

import useSettingsStore from '../../../context/useSettingsStore';
import useLanguage from '../../../hooks/useLanguage';
import Button from '../Button';

import styles from './Sort.module.scss';

type Props = {
  disabled: boolean;
};

const Sort: FC<Props> = ({ disabled }) => {
  const { sort, sortCollections } = useSettingsStore();
  const { text } = useLanguage();

  return (
    <Button
      className={sort ? [styles.sort, styles['sort-active']].join(' ') : styles.sort}
      onClick={sortCollections}
      title={text.controls.sort}
      disabled={disabled}
      content={<FontAwesomeIcon icon={faArrowDownShortWide} />}
    />
  );
};

export default Sort;
