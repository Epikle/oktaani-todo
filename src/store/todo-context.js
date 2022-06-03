import React from 'react';

const TodoContext = React.createContext({
  todoList: [],
  selectedTodoList: { id: '', title: '' },
  addTodo: (text, color) => {},
  editTodo: (id, text) => {},
  removeTodo: (id) => {},
  setSelected: (id, title) => {},
});

export default TodoContext;
