import { Dispatch, FC, HTMLAttributes, SetStateAction } from 'react';

import useLanguage from '../../hooks/useLanguage';
import { Button } from '../UI/Button';

type Props = {
  className: HTMLAttributes<HTMLElement>['className'];
  setIsError: Dispatch<SetStateAction<boolean>>;
};

const TodoCollectionError: FC<Props> = ({ className, setIsError }) => {
  const { text } = useLanguage();

  const disableShareBtnHandler = async () => {
    // TODO
    // await editCollection({ id, title, color, type, shared: false, noShare: true });
    setIsError(false);
  };

  return (
    <article className={className}>
      <h2>🚨 {text.common.error} 🚨</h2>
      <div>
        <p>{text.errors.apiGetCollection}</p>
        <div>
          <Button onClick={() => {}}>{text.collection.shareTryAgain}</Button>
          <Button onClick={disableShareBtnHandler}>{text.collection.shareFail}</Button>
        </div>
      </div>
    </article>
  );
};

export default TodoCollectionError;
