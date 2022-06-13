import React from 'react';

const TodoContext = React.createContext({
  todoList: [],
  selectedTodoList: { id: '', title: '', color: '', isUpdating: false },
  createTodo: () => {},
  readTodos: () => {},
  updateTodo: () => {},
  deleteCollection: () => {},
  setDoneTodo: () => {},
  clearDoneTodos: () => {},
  setSelected: () => {},
});

export default TodoContext;
