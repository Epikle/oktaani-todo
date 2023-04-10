import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './TodoNote.module.scss';
import useTodoStore from '../../context/useTodoStore';

type Props = {
  id: string;
  isSelected: boolean;
  note: string;
};

let timeoutId: ReturnType<typeof setTimeout> | null = null;

// TODO: this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const TodoNote: FC<Props> = ({ id, isSelected, note }) => {
  const { editNote } = useTodoStore((state) => state.actions);
  const textareaChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    debounce(async () => {
      await editNote({ id, note: event.target.value });
    }, 2000)();
  };

  if (!isSelected) {
    return (
      <div className={styles.markdown}>
        <ReactMarkdown>{note}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className={styles.note}>
      <textarea rows={10} placeholder="Enter your text here..." onChange={textareaChangeHandler} defaultValue={note} />
    </div>
  );
};

export default TodoNote;
