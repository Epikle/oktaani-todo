import { FC, useEffect, useState } from 'react';

import { getSharedCollectionLogData } from '../../services/todo';
import { formatDate } from '../../utils/utils';
import { type Languages } from '../../utils/languages';

import styles from './TodoLog.module.scss';

const TodoLog: FC<{ id: string; languageName: Languages }> = ({ id, languageName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<{ id: string; shareId: string; message: string; createdAt: string }[]>([]);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const logsData = await getSharedCollectionLogData(id);
      setLogs(logsData);
      setIsLoading(false);
    })();
  }, [id]);

  return (
    <div className={styles.log}>
      LOG
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        logs.map((log) => (
          <p key={log.id}>
            {log.message} -{' '}
            {formatDate(log.createdAt, languageName, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        ))}
    </div>
  );
};

export default TodoLog;
