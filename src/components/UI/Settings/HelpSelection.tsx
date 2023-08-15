import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import useTodoStore from '../../../context/useTodoStore';
import useLanguage from '../../../hooks/useLanguage';
import Button from '../Button';

import styles from './HelpSelection.module.scss';
import useSettingsStore from '../../../context/useSettingsStore';
import { cn } from '../../../utils/utils';

const HelpSelection: FC = () => {
  const { text } = useLanguage();
  const collections = useTodoStore((state) => state.collections);
  const help = useSettingsStore((state) => state.help);
  const { toggleHelp } = useSettingsStore((state) => state.actions);

  return (
    <Button
      className={cn(styles.help, { [styles['help-active']]: help })}
      title={text.controls.help}
      onClick={toggleHelp}
      disabled={!collections}
      testId="help-btn"
    >
      <FontAwesomeIcon icon={faCircleQuestion} />
    </Button>
  );
};

export default HelpSelection;
