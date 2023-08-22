import { FC, useEffect, useState } from 'react';

import { getSharedLogs } from '../../services/todo';
import { formatDate } from '../../utils/utils';
import { type Languages } from '../../utils/languages';
import useStatusStore from '../../context/useStatusStore';
import useSelectedStore from '../../context/useSelectedStore';
import useLanguage from '../../hooks/useLanguage';
import { Log } from '../../utils/types';

import styles from './TodoLog.module.scss';

type Props = {
  id: string;
  languageName: Languages;
};

const TodoLog: FC<Props> = ({ id, languageName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<Log[] | []>([]);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { setError } = useStatusStore((state) => state.actions);
  const isSelected = selectedCollection?.id === id;
  const { text } = useLanguage();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const logsData = await getSharedLogs(id);
        setLogs(logsData);
      } catch (error) {
        setError(text.errors.default);
      }
      setIsLoading(false);
    })();
  }, [id, setError, text.errors.default]);

  if (!isSelected) return null;

  return (
    <div className={styles.bg}>
      <div className={styles.log} data-testid="log-container">
        {text.collection.log} <span>{text.collection.logLatest}</span>
        {isLoading && <p>{text.common.loading}</p>}
        {!isLoading && logs.length === 0 && <p>{text.collection.noLogs}</p>}
        {!isLoading &&
          logs.length > 0 &&
          logs.map((log) => (
            <p key={log.id}>
              {log.message} -{' '}
              {formatDate(log.createdAt, languageName, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
          ))}
      </div>
    </div>
  );
};

export default TodoLog;
