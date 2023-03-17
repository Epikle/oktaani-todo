import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import '@fontsource/oswald';
import '@fontsource/arvo';

import { setupStore } from './context/store';
import App from './App';

import './main.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={setupStore()}>
      <DndProvider options={HTML5toTouch}>
        <App />
      </DndProvider>
    </Provider>
  </StrictMode>,
);
