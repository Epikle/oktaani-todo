import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Share from './components/Share/Share';

import './index.css';
import TodoProvider from './store/TodoProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/share/:id" element={<Share />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </TodoProvider>
);
