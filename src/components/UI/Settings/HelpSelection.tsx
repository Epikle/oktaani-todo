import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import useTodoStore from '../../../context/useTodoStore';
import useLanguage from '../../../hooks/useLanguage';
import Button from '../Button';

import styles from './HelpSelection.module.scss';

const HelpSelection: FC = () => {
  const { text } = useLanguage();
  const collections = useTodoStore((state) => state.collections);
  const help = useTodoStore((state) => state.help);
  const { toggleHelp } = useTodoStore((state) => state.actions);

  return (
    <Button
      className={help ? [styles.help, styles['help-active']].join(' ') : styles.help}
      title={text.controls.help}
      onClick={toggleHelp}
      disabled={collections.length === 0}
      testId="help-btn"
    >
      <FontAwesomeIcon icon={faCircleQuestion} />
    </Button>
  );
};

export default HelpSelection;
