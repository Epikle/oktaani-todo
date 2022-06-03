import React from 'react';

const TodoContext = React.createContext({
  todoList: [],
  selectedTodoList: { id: '', title: '' },
  addTodo: () => {},
  editTodo: () => {},
  removeTodo: () => {},
  setSelected: () => {},
  loadTodo: () => {}
});

export default TodoContext;
