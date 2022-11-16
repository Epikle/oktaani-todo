import { Fragment, FC } from 'react';

import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import TodoList from './components/TodoList';
import { TCollection } from './types';

const DUMMY_DATA: TCollection[] = [
  {
    id: '1',
    title: 'First Collection',
    color: '#a25b5b',
    shared: true,
    todos: [
      { id: '11', text: 'Todo Item 1', done: false },
      { id: '12', text: 'Todo Item 2', done: true },
    ],
  },
  {
    id: '2',
    title: 'Second Collection',
    color: '#7c9473',
    shared: false,
    todos: [
      { id: '21', text: 'Todo Item 1', done: false },
      { id: '22', text: 'Todo Item 2', done: true },
      { id: '23', text: 'Todo Item 3', done: false },
      { id: '24', text: 'Todo Item 4', done: true },
    ],
  },
  {
    id: '3',
    title: 'Third Collection',
    color: 'goldenrod',
    shared: false,
    todos: [
      { id: '31', text: 'Todo Item 1', done: false },
      { id: '32', text: 'Todo Item 2', done: true },
    ],
  },
];

const App: FC = () => {
  return (
    <Fragment>
      <Header />
      <TodoList collections={DUMMY_DATA} />
      <Footer />
    </Fragment>
  );
};

export default App;
