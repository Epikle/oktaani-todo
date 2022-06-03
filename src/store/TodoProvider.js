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
      const todoIndex = state.todoList.findIndex(
        (list) => list.id === state.selectedTodoList.id
      );

      const createId = uuid();
      const newTodo = {
        id: createId,
        todo: action.todo.text,
        done: false,
      };

      const addedTodo = state.todoList[todoIndex].todos.concat(newTodo);

      const oldList = [...state.todoList];
      oldList[todoIndex] = { ...state.todoList[todoIndex], todos: addedTodo };

      newTodoList = oldList;
    } else {
      const createId = uuid();

      const newList = {
        id: createId,
        title: action.todo.text,
        color: action.todo.color || 'red',
        todos: [],
      };

      newTodoList = state.todoList.concat(newList);
    }

    localStorage.setItem('todoList', JSON.stringify(newTodoList));

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

  if (action.type === 'LOAD') {
    const storedList = localStorage.getItem('todoList');
    console.log(JSON.parse(storedList));

    return {
      ...state,
      todoList: JSON.parse(storedList),
    };
  }

  return defaultTodoState;
};

const TodoProvider = ({ children }) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    defaultTodoState
  );

  const addTodoHandler = (todo, color = null) => {
    dispatchTodoAction({ type: 'ADD', todo: { text: todo, color: color } });
  };

  const setSelectedTodoListHandler = (id, title) => {
    dispatchTodoAction({ type: 'SET', selected: { id, title } });
  };

  const loadTodosHandler = () => {
    dispatchTodoAction({ type: 'LOAD' });
  };

  const todoContext = {
    todoList: todoState.todoList,
    selectedTodoList: todoState.selectedTodoList,
    addTodo: addTodoHandler,
    setSelected: setSelectedTodoListHandler,
    loadTodo: loadTodosHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
