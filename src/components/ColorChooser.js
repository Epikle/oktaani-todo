import { useState, useContext } from 'react';

import TodoContext from '../store/todo-context';

import './ColorChooser.css';

const DEFAULT_COLORS = ['#a25b5b', '#809A6F', '#CC9C75', '#D5D8B5'];

const ColorChooser = () => {
  const [color, setColor] = useState(DEFAULT_COLORS[0]);
  const todoCtx = useContext(TodoContext);

  const colorChooserClickHandler = () => {
    const currentColorIndex = DEFAULT_COLORS.indexOf(color);

    if (currentColorIndex === DEFAULT_COLORS.length - 1) {
      setColor(DEFAULT_COLORS[0]);
      todoCtx.setSelected(
        todoCtx.selectedTodoList.id,
        todoCtx.selectedTodoList.title,
        DEFAULT_COLORS[0]
      );
      return;
    }

    setColor(DEFAULT_COLORS[currentColorIndex + 1]);
    todoCtx.setSelected(
      todoCtx.selectedTodoList.id,
      todoCtx.selectedTodoList.title,
      DEFAULT_COLORS[currentColorIndex + 1]
    );
  };

  return (
    <div className="color-chooser">
      <ul>
        <li>
          <button
            className="color-chooser-btn red"
            onClick={colorChooserClickHandler}
            style={{ backgroundColor: color }}
          >
            CLR
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ColorChooser;
