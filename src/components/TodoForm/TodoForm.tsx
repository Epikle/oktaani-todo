import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  createCollection,
  createItem,
  editCollection,
} from '../../context/todoSlice';
import {
  resetSelection,
  setSelectedCollection,
  setSelectedCollectionEdit,
} from '../../context/selectedSlice';

import styles from './TodoForm.module.scss';

const DEFAULT_COLOR = '#7b68ee';

const TodoForm: FC = () => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [tempColor, setTempColor] = useState(DEFAULT_COLOR);
  const [todoInput, setTodoInput] = useState('');
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector((state) => state.selected);

  useEffect(() => {
    if (selectedCollection.edit) {
      setTodoInput(selectedCollection.title);
      return;
    }
    setTodoInput('');
  }, [selectedCollection.edit, selectedCollection.title]);

  useEffect(() => {
    if (!colorInputRef.current) return;
    if (!selectedCollection.color) {
      colorInputRef.current.value = tempColor;
      return;
    }

    colorInputRef.current.value = selectedCollection.color;
  }, [selectedCollection.color]);

  const tempColorHandler = () => {
    if (!selectedCollection.color && colorInputRef.current) {
      setTempColor(colorInputRef.current.value);
    }
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const colorVal = colorInputRef.current?.value || DEFAULT_COLOR;

    if (todoInput.trim().length === 0) return;

    if (selectedCollection.edit) {
      const editedCollection = {
        id: selectedCollection.id,
        title: todoInput,
        color: colorVal,
      };
      dispatch(editCollection(editedCollection));
      dispatch(setSelectedCollection(editedCollection));
      dispatch(setSelectedCollectionEdit({ edit: false }));

      return;
    }

    if (selectedCollection.selected) {
      dispatch(
        createItem({ id: selectedCollection.id, item: { text: todoInput } }),
      );
      setTodoInput('');

      return;
    }

    dispatch(
      createCollection({
        title: todoInput,
        color: colorVal,
      }),
    );

    setTodoInput('');
  };

  const placeholderText = selectedCollection.selected
    ? `Add a new todo to ${selectedCollection.title}`
    : `Add a new collection`;

  const isBtnDisabled =
    !selectedCollection.selected && todoInput.trim().length === 0;

  const isAddBtn =
    (selectedCollection.selected && todoInput.trim().length > 0) ||
    todoInput.trim().length > 0;

  const showAddBtn =
    selectedCollection.selected && todoInput.trim().length === 0
      ? styles.blur
      : styles.hide;

  const btnStyles = isAddBtn ? styles.add : [styles.add, showAddBtn].join(' ');

  const addBtnHandler = isAddBtn
    ? submitHandler
    : () => dispatch(resetSelection());

  const formStyles = selectedCollection.selected
    ? [styles.form, styles.selected].join(' ')
    : styles.form;

  return (
    <form
      className={formStyles}
      onSubmit={submitHandler}
      data-collection={
        selectedCollection.edit
          ? `Editing: ${selectedCollection.title}`
          : selectedCollection.title
      }
    >
      <input
        type="color"
        title="Set todo collection color"
        className={styles['color-picker']}
        ref={colorInputRef}
        defaultValue={DEFAULT_COLOR}
        onBlur={tempColorHandler}
      />
      <input
        type="text"
        className={styles.todo}
        placeholder={placeholderText}
        title={placeholderText}
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
      />
      <button
        className={btnStyles}
        aria-label={isAddBtn ? 'Add' : 'Cancel'}
        title={isAddBtn ? 'Add' : 'Cancel'}
        onClick={addBtnHandler}
        disabled={isBtnDisabled}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default TodoForm;
