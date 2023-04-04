import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

import useSettingsStore from '../../../context/useSettingsStore';
import useLanguage from '../../../hooks/useLanguage';
import Button from '../Button';

import styles from './LanguageSelection.module.scss';

type Props = {
  disabled: boolean;
};

const LanguageSelection: FC<Props> = ({ disabled }) => {
  const { languageName } = useSettingsStore();
  const { text, nextLang } = useLanguage();

  return (
    <Button
      data-language={languageName}
      className={styles.language}
      title={text.controls.language}
      onClick={nextLang}
      disabled={disabled}
      content={<FontAwesomeIcon icon={faEarthAmericas} />}
    />
  );
};

export default LanguageSelection;
