import { FC, HTMLAttributes } from 'react';

import useSelectedStore from '../../context/useSelectedStore';
import useLanguage from '../../hooks/useLanguage';
import useTodoStore from '../../context/useTodoStore';
import { TypeEnum } from '../../utils/types';
import { Button } from '../UI/Button';

type Props = {
  id: string;
  className: HTMLAttributes<HTMLElement>['className'];
};

const TodoCollectionUnset: FC<Props> = ({ id, className }) => {
  const { setSelectedCollection } = useSelectedStore((state) => state.actions);
  const { updateCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();

  return (
    <div className={className}>
      <span>{text.collection.selectType}</span>
      <Button
        onClick={() => {
          updateCollection({ id, type: TypeEnum.enum.todo });
          setSelectedCollection({ id, edit: false });
        }}
        testId="add-todo-btn"
      >
        {text.collection.todo}
      </Button>
      <Button
        onClick={() => {
          updateCollection({ id, type: TypeEnum.enum.note });
          setSelectedCollection({ id, edit: false });
        }}
        testId="add-note-btn"
      >
        {text.collection.note}
      </Button>
    </div>
  );
};

export default TodoCollectionUnset;
