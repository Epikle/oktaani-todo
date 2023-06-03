import { FC, useEffect, useState } from 'react';

import { getSharedCollectionLogData } from '../../services/todo';
import { formatDate } from '../../utils/utils';
import { type Languages } from '../../utils/languages';
import useSelectedStore from '../../context/useSelectedStore';
import useLanguage from '../../hooks/useLanguage';

import styles from './TodoLog.module.scss';

const TodoLog: FC<{ id: string; languageName: Languages }> = ({ id, languageName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<{ id: string; shareId: string; message: string; createdAt: string }[]>([]);
  const selectedColId = useSelectedStore((state) => state.id);
  const isSelected = selectedColId === id;
  const { text } = useLanguage();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const logsData = await getSharedCollectionLogData(id);
      setLogs(logsData);
      setIsLoading(false);
    })();
  }, [id]);

  if (!isSelected) return null;

  return (
    <div className={styles.bg}>
      <div className={styles.log}>
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