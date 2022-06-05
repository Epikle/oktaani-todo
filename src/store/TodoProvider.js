import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';

import TodoContext from './todo-context';

const defaultTodoState = {
  todoList: [],
  selectedTodoList: { id: '', title: '', color: '#a25b5b' },
};

const todoReducer = (state, action) => {
  //CREATE new collection or new todo under existing collection
  if (action.type === 'CREATE') {
    let newTodoList;

    //If ID then add todo to existing collection
    if (state.selectedTodoList.id) {
      const todoIndex = state.todoList.findIndex(
        (list) => list.id === state.selectedTodoList.id
      );

      const createId = uuid();
      const newTodo = {
        id: createId,
        todo: action.todo,
        done: false,
      };

      const addedTodo = state.todoList[todoIndex].todos.concat(newTodo);

      const oldList = [...state.todoList];
      oldList[todoIndex] = { ...state.todoList[todoIndex], todos: addedTodo };

      newTodoList = oldList;
    } else {
      const createId = uuid();

      console.log('create new todo:', state.selectedTodoList.color);

      const newList = {
        id: createId,
        title: action.todo,
        color: state.selectedTodoList.color,
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

  //READ todos from localstorage
  if (action.type === 'READ') {
    const storedList = localStorage.getItem('todoList') || '[]';

    return {
      ...state,
      todoList: JSON.parse(storedList),
    };
  }

  //UPDATE todo text or collection text
  if (action.type === 'UPDATE') {
    console.log('Updating...');

    return {
      ...state,
    };
  }

  //DELETE collection
  if (action.type === 'DELETE') {
    const newCollections = state.todoList.filter(
      (collection) => collection.id !== action.id
    );

    localStorage.setItem('todoList', JSON.stringify(newCollections));

    return {
      ...state,
      todoList: newCollections,
    };
  }

  //DONE status for todo, toggle
  if (action.type === 'DONE') {
    const collectionIndex = state.todoList.findIndex(
      (todoList) => todoList.id === action.done.collectionId
    );
    const todoIndex = state.todoList[collectionIndex].todos.findIndex(
      (todo) => todo.id === action.done.todoId
    );

    const oldTodoList = [...state.todoList[collectionIndex].todos];
    oldTodoList[todoIndex] = {
      ...oldTodoList[todoIndex],
      done: !oldTodoList[todoIndex].done,
    };

    const newTodo = { ...state.todoList[collectionIndex], todos: oldTodoList };

    const newTodoList = [...state.todoList];
    newTodoList[collectionIndex] = { ...newTodo };

    localStorage.setItem('todoList', JSON.stringify(newTodoList));

    return {
      ...state,
      todoList: newTodoList,
    };
  }

  //CLEAR done todos
  if (action.type === 'CLEAR') {
    const collectionIndex = state.todoList.findIndex(
      (collection) => collection.id === action.id
    );
    const filteredTodos = state.todoList[collectionIndex].todos.filter(
      (todo) => !todo.done
    );

    const newTodoList = {
      ...state.todoList[collectionIndex],
      todos: filteredTodos,
    };

    const newCollectionList = [...state.todoList];
    newCollectionList[collectionIndex] = { ...newTodoList };

    localStorage.setItem('todoList', JSON.stringify(newCollectionList));

    return {
      ...state,
      todoList: newCollectionList,
    };
  }

  //SET selected todolist id
  if (action.type === 'SET') {
    return {
      ...state,
      selectedTodoList: {
        id: action.selected.id,
        title: action.selected.title,
        color: action.selected.color,
      },
    };
  }

  //If no action.type then return default state
  return defaultTodoState;
};

const TodoProvider = ({ children }) => {
  const [todoState, dispatchTodoAction] = useReducer(
    todoReducer,
    defaultTodoState
  );

  const createTodoHandler = (todo) => {
    dispatchTodoAction({ type: 'CREATE', todo });
  };

  const readTodosHandler = () => {
    dispatchTodoAction({ type: 'READ' });
  };

  const updateTodoHandler = (id, text) => {
    dispatchTodoAction({ type: 'UPDATE', update: { id, text } });
  };

  const deleteCollectionHandler = (id) => {
    dispatchTodoAction({ type: 'DELETE', id });
  };

  const setDoneTodoHandler = (collectionId, todoId) => {
    dispatchTodoAction({ type: 'DONE', done: { collectionId, todoId } });
  };

  const clearDoneTodosHandler = (id) => {
    dispatchTodoAction({ type: 'CLEAR', id });
  };

  const setSelectedCollectionHandler = (id, title, color) => {
    dispatchTodoAction({ type: 'SET', selected: { id, title, color } });
  };

  const todoContext = {
    todoList: todoState.todoList,
    selectedTodoList: todoState.selectedTodoList,
    createTodo: createTodoHandler,
    readTodos: readTodosHandler,
    updateTodo: updateTodoHandler,
    deleteCollection: deleteCollectionHandler,
    setDoneTodo: setDoneTodoHandler,
    clearDoneTodos: clearDoneTodosHandler,
    setSelected: setSelectedCollectionHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
