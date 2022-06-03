import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import TodoContext from './todo-context';

const DUMMY_DATA = [
  {
    id: 'list1',
    title: 'First collection',
    color: 'red',
    todos: [
      { id: 'todo1', todo: 'this is a todo.', done: false },
      { id: 'todo2', todo: 'this is a todo 2.', done: true },
    ],
  },
  {
    id: 'list2',
    title: 'Second collection',
    color: 'blue',
    todos: [{ id: 'todo3', todo: 'this is a todo.', done: false }],
  },
];

const defaultTodoState = {
  todoList: DUMMY_DATA,
  selectedTodoList: { id: '', title: '' },
};

const todoReducer = (state, action) => {
  if (action.type === 'ADD') {
    let newTodoList;
    //if ID then add todo to list else create new list
    if (state.selectedTodoList.id) {
      console.log('adding new');
      newTodoList = [];
    } else {
      const createId = uuid();

      const newTodo = {
        id: createId,
        title: action.todo.text,
        color: action.todo.color,
        todos: [],
      };
      newTodoList = state.todoList.concat(newTodo);
    }

    return {
      ...state,
      todoList: newTodoList,
    };
  }

  //Set selected todolist id
  if (action.type === 'SET') {
    return {
      ...state,
      selectedTodoList: {
        id: action.selected.id,
        title: action.selected.title,
      },
    };
  }

  return defaultTodoState;
};

const TodoProvider = (props) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    defaultTodoState
  );

  const addTodoHandler = (todo, color) => {
    dispatchTodoAction({ type: 'ADD', todo: { text: todo, color: color } });
  };

  const setSelectedTodoListHandler = (id, title) => {
    dispatchTodoAction({ type: 'SET', selected: { id, title } });
  };

  const todoContext = {
    todoList: todoState.todoList,
    selectedTodoList: todoState.selectedTodoList,
    addTodo: addTodoHandler,
    setSelected: setSelectedTodoListHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
