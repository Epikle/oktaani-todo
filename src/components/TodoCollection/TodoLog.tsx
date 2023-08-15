import { FC, useEffect, useState } from 'react';

// import { getSharedCollectionLogData } from '../../services/todo';
import { formatDate } from '../../utils/utils';
import { type Languages } from '../../utils/languages';
import useSelectedStore from '../../context/useSelectedStore';
import useLanguage from '../../hooks/useLanguage';

import styles from './TodoLog.module.scss';

type Props = {
  id: string;
  languageName: Languages;
};

export type Log = {
  id: string;
  shareId: string;
  message: string;
  createdAt: string;
};

const TodoLog: FC<Props> = ({ id, languageName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<Log[] | []>([]);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const isSelected = selectedCollection?.id === id;
  const { text } = useLanguage();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        // TODO
        // const logsData = await getSharedCollectionLogData(id);
        setLogs(logsData);
      } catch (error) {
        setLogs([]);
      }
      setIsLoading(false);
    })();
  }, [id]);

  if (!isSelected) return null;

  return (
    <div className={styles.bg}>
      <div className={styles.log} data-testid="log-container">
        {text.collection.log} <span>{text.collection.logLatest}</span>
        {isLoading && <p>{text.common.loading}</p>}
        {!isLoading && logs.length === 0 && <p>{text.collection.noLogs}</p>}
        {!isLoading &&
          logs &&
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
