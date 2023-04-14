import { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './TodoNote.module.scss';
import useTodoStore from '../../context/useTodoStore';

type Props = {
  id: string;
  isSelected: boolean;
  note: string;
};

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let timeoutId2: ReturnType<typeof setTimeout> | null = null;

const TodoNote: FC<Props> = ({ id, isSelected, note }) => {
  const { editNote } = useTodoStore((state) => state.actions);
  const [saving, setSaving] = useState('');

  const textareaChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (timeoutId2) clearTimeout(timeoutId2);

    timeoutId = setTimeout(async () => {
      await editNote({ id, note: event.target.value });
      setSaving('✓ Saved...');
    }, 2000);

    timeoutId2 = setTimeout(() => {
      setSaving('');
    }, 5000);
  };

  if (!isSelected) {
    return (
      <div className={styles.markdown}>
        <ReactMarkdown>{note}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className={styles.note} data-saved={saving}>
      <textarea rows={16} placeholder="Enter your text here..." onChange={textareaChangeHandler} defaultValue={note} />
    </div>
  );
};

export default TodoNote;
