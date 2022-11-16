import { Fragment, FC } from 'react';

import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import TodoList from './components/TodoList';
import { TCollection } from './types';

const DUMMY_DATA: TCollection[] = [
  {
    title: 'First Collection',
    color: '#a25b5b',
    todos: [
      { text: 'Todo Item 1', done: false },
      { text: 'Todo Item 2', done: true },
    ],
  },

  {
    title: 'Second Collection',
    color: '#7c9473',
    todos: [
      { text: 'Todo Item 1', done: false },
      { text: 'Todo Item 2', done: true },
      { text: 'Todo Item 3', done: false },
    ],
  },
];

const App: FC = () => {
  return (
    <Fragment>
      <Header />
      <TodoList todos={DUMMY_DATA} />
      <Footer />
    </Fragment>
  );
};

export default App;
