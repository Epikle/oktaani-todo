import { Dispatch, FC, HTMLAttributes, SetStateAction } from 'react';

import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import { Button } from '../UI/Button';
import useSelectedStore from '../../context/useSelectedStore';

type Props = {
  id: string;
  className: HTMLAttributes<HTMLElement>['className'];
  setIsError: Dispatch<SetStateAction<boolean>>;
  onRetry: () => Promise<void>;
};

const TodoCollectionError: FC<Props> = ({ id, className, setIsError, onRetry }) => {
  const { updateCollection } = useTodoStore((state) => state.actions);
  const { setSelectedCollection } = useSelectedStore((state) => state.actions);
  const { text } = useLanguage();

  const disableShareBtnHandler = async () => {
    updateCollection({ id, shared: false });
    setIsError(false);
    setSelectedCollection({ id, edit: false });
  };

  return (
    <article className={className}>
      <h2>🚨 {text.common.error} 🚨</h2>
      <div>
        <p>{text.errors.apiGetCollection}</p>
        <div>
          <Button onClick={onRetry}>{text.collection.shareTryAgain}</Button>
          <Button onClick={disableShareBtnHandler}>{text.collection.shareFail}</Button>
        </div>
      </div>
    </article>
  );
};

export default TodoCollectionError;
