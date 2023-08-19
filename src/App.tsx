import { FC, useEffect } from 'react';

import useSelectedStore from './context/useSelectedStore';
import useSettingsStore from './context/useSettingsStore';
import useTodoStore from './context/useTodoStore';
import useStatusStore from './context/useStatusStore';
import useLanguage from './hooks/useLanguage';
import { isStorageAvailable } from './utils/utils';
import TodoList from './components/TodoList/TodoList';
import Overlay from './components/UI/Overlay';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import Toast from './components/UI/Toast';
import env from './utils/env';

import styles from './App.module.scss';

const shareParam = new URLSearchParams(document.location.search).get('share');

const App: FC = () => {
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const darkMode = useSettingsStore((state) => state.darkMode);
  const { initSettings } = useSettingsStore((state) => state.actions);
  const { initCollections, initItems, initNotes } = useTodoStore((state) => state.actions);
  const { setError } = useStatusStore((state) => state.actions);
  const { text } = useLanguage();

  document.title = selectedCollection?.title ? `${selectedCollection.title} | oktaaniTODO` : 'oktaaniTODO';

  useEffect(() => {
    initCollections();
    initItems();
    initNotes();
    initSettings();
    if (shareParam) {
      (async () => {
        try {
          // TODO
          // await createSharedCollection(shareParam);
          window.location.replace(env.BASE_URL);
        } catch (error) {
          setError(text.errors.apiGetCollection);
          setTimeout(() => {
            window.location.replace(env.BASE_URL);
          }, 5000);
        }
      })();
    }
  }, [initSettings, initCollections, initItems, setError, initNotes, text]);

  return (
    <div className={darkMode ? 'content dark-mode' : 'content'}>
      {!isStorageAvailable() && <Overlay>{text.errors.localStorage}</Overlay>}
      <Toast darkMode={darkMode} />
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          {shareParam && <p>Loading...</p>}
          {!shareParam && <TodoList />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
