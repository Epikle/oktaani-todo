import { useContext } from 'react';

import TodoContext from '../../store/todo-context';

import './ColorChooser.css';

const DEFAULT_COLORS = [
  'var(--cc-1)',
  'var(--cc-2)',
  'var(--cc-3)',
  'var(--cc-4)',
  'var(--cc-5)',
];

const ColorChooser = () => {
  const todoCtx = useContext(TodoContext);

  const colorChooserClickHandler = () => {
    const currentColorIndex = DEFAULT_COLORS.indexOf(
      todoCtx.selectedTodoList.color
    );

    if (currentColorIndex === DEFAULT_COLORS.length - 1) {
      todoCtx.setSelected(
        todoCtx.selectedTodoList.id,
        todoCtx.selectedTodoList.title,
        DEFAULT_COLORS[0]
      );
      if (todoCtx.selectedTodoList.id) {
        todoCtx.updateTodo(todoCtx.selectedTodoList.title, DEFAULT_COLORS[0]);
      }
      return;
    }

    todoCtx.setSelected(
      todoCtx.selectedTodoList.id,
      todoCtx.selectedTodoList.title,
      DEFAULT_COLORS[currentColorIndex + 1]
    );
    if (todoCtx.selectedTodoList.id) {
      todoCtx.updateTodo(
        todoCtx.selectedTodoList.title,
        DEFAULT_COLORS[currentColorIndex + 1]
      );
    }
  };

  return (
    <div className="color-chooser">
      <button
        className="color-chooser-btn red"
        onClick={colorChooserClickHandler}
        style={{ backgroundColor: todoCtx.selectedTodoList.color }}
      >
        CLR
      </button>
    </div>
  );
};

export default ColorChooser;
