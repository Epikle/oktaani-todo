import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { setSettings } from '../../../context/settingsSlice';
import useLanguage from '../../../hooks/useLanguage';
import Button from '../Button';

import styles from './Sort.module.scss';

type Props = {
  disabled: boolean;
};

const Sort: FC<Props> = ({ disabled }) => {
  const { languageName, darkMode, sort } = useAppSelector(
    (state) => state.settings,
  );
  const dispatch = useAppDispatch();
  const { text } = useLanguage();

  const sortBtnHandler = () => {
    dispatch(setSettings({ languageName, darkMode, sort: !sort }));
  };

  return (
    <Button
      className={
        sort ? [styles.sort, styles['sort-active']].join(' ') : styles.sort
      }
      onClick={sortBtnHandler}
      title={text.controls.sort}
      disabled={disabled}
      content={<FontAwesomeIcon icon={faArrowDownShortWide} />}
    />
  );
};

export default Sort;
