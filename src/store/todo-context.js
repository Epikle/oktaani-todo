import React from 'react';

const TodoContext = React.createContext({
  todoList: [],
  selectedTodoList: { id: '', title: '' },
  createTodo: () => {},
  readTodos: () => {},
  updateTodo: () => {},
  deleteCollection: () => {},
  setDoneTodo: () => {},
  clearDoneTodos: () => {},
  setSelected: () => {},
});

export default TodoContext;
