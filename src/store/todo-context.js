import React from 'react';

const TodoContext = React.createContext({
  todoList: [],
  selectedTodoList: { id: '', title: '', color: '' },
  createTodo: () => {},
  readTodos: () => {},
  updateTodo: () => {},
  deleteCollection: () => {},
  setDoneTodo: () => {},
  clearDoneTodos: () => {},
  setSelected: () => {},
  setUpdating: () => {},
});

export default TodoContext;
