import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../../hooks/useLanguage';
import useBoundStore from '../../../context/useBoundStore';
import Button from '../Button';

import styles from './HelpSelection.module.scss';

const HelpSelection: FC = () => {
  const { text } = useLanguage();
  const { toggleHelp, help, collections } = useBoundStore((state) => state);

  return (
    <Button
      className={help ? [styles.help, styles['help-active']].join(' ') : styles.help}
      title={text.controls.help}
      onClick={toggleHelp}
      disabled={collections.length === 0}
    >
      <FontAwesomeIcon icon={faCircleQuestion} />
    </Button>
  );
};

export default HelpSelection;
