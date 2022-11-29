import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';

import styles from './LanguageSelection.module.scss';

type Props = {
  disabled: boolean;
};

const LanguageSelection: FC<Props> = ({ disabled }) => {
  const languageBtnHandler = () => {
    console.log('change language...');
  };

  return (
    <Button
      data-language="en-us"
      className={styles.language}
      aria-label="Change language"
      onClick={languageBtnHandler}
      disabled={disabled}
      content={<FontAwesomeIcon icon={faEarthAmericas} />}
    />
  );
};

export default LanguageSelection;
