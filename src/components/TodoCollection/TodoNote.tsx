import { ClipboardEvent, FC, useRef } from 'react';

import styles from './TodoNote.module.scss';

type Props = {
  isSelected: boolean;
};

const TodoNote: FC<Props> = ({ isSelected }) => {
  // TODO: WIP
  const note = useRef<HTMLSpanElement>(null);
  const pasteAsPlainText = (event: ClipboardEvent<HTMLSpanElement>) => {
    event.preventDefault();
    if (!note.current) return;
    note.current.innerText = event.clipboardData.getData('text/plain');
  };
  return (
    <div className={styles.note}>
      <span role="textbox" contentEditable={isSelected} onPaste={pasteAsPlainText} ref={note} />
    </div>
  );
};

export default TodoNote;
