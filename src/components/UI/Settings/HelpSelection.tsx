import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import useLanguage from '../../../hooks/useLanguage';
import useTodoStore from '../../../context/useTodoStore';
import Button from '../Button';

import styles from './HelpSelection.module.scss';

type Props = {
  disabled: boolean;
};

const HelpSelection: FC<Props> = ({ disabled }) => {
  const { text } = useLanguage();
  const { toggleHelp, help, collections } = useTodoStore();

  return (
    <Button
      className={help ? [styles.help, styles['help-active']].join(' ') : styles.help}
      title={text.controls.help}
      onClick={toggleHelp}
      disabled={disabled || collections.length === 0}
    >
      <FontAwesomeIcon icon={faCircleQuestion} />
    </Button>
  );
};

export default HelpSelection;
