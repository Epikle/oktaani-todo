import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button';
import { useAppSelector } from '../../../hooks/useRedux';
import useLanguage from '../../../hooks/useLanguage';

import styles from './LanguageSelection.module.scss';

type Props = {
  disabled: boolean;
};

const LanguageSelection: FC<Props> = ({ disabled }) => {
  const { language } = useAppSelector((state) => state.settings);
  const { text, nextLang } = useLanguage();

  const languageBtnHandler = () => {
    nextLang();
  };

  return (
    <Button
      data-language={language}
      className={styles.language}
      title={text.controls.language}
      onClick={languageBtnHandler}
      disabled={disabled}
      content={<FontAwesomeIcon icon={faEarthAmericas} />}
    />
  );
};

export default LanguageSelection;
