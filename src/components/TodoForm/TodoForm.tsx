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
import Button from '../UI/Button';
import useLanguage from '../../hooks/useLanguage';

const DEFAULT_COLOR = '#7b68ee';
const COLLECTION_LENGTH = 100;
const ITEM_LENGTH = 300;

const TodoForm: FC = () => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [tempColor, setTempColor] = useState(DEFAULT_COLOR);
  const [todoInput, setTodoInput] = useState('');
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector((state) => state.selected);
  const trimmedInput = todoInput.trim().replace(/\s+/g, ' ');
  const { text } = useLanguage();

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
    if (!colorInputRef.current) return;
    if (!selectedCollection.color) {
      setTempColor(colorInputRef.current.value);
      return;
    }

    const editedCollection = {
      id: selectedCollection.id,
      title: selectedCollection.title,
      color: colorInputRef.current.value,
    };

    dispatch(editCollection(editedCollection));
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const colorVal = colorInputRef.current?.value || DEFAULT_COLOR;

    if (trimmedInput.length === 0) return;

    if (selectedCollection.edit) {
      const editedCollection = {
        id: selectedCollection.id,
        title: trimmedInput,
        color: colorVal,
      };
      dispatch(editCollection(editedCollection));
      dispatch(setSelectedCollection(editedCollection));
      dispatch(setSelectedCollectionEdit({ edit: false }));

      return;
    }

    if (selectedCollection.selected) {
      dispatch(
        createItem({ id: selectedCollection.id, item: { text: trimmedInput } }),
      );
      setTodoInput('');

      return;
    }

    dispatch(
      createCollection({
        title: trimmedInput,
        color: colorVal,
      }),
    );

    setTodoInput('');
  };

  const placeholderText = selectedCollection.selected
    ? `${text.header.newTodo} ${selectedCollection.title}`
    : text.header.newCollection;

  const isBtnDisabled =
    !selectedCollection.selected && trimmedInput.length === 0;

  const isAddBtn =
    (selectedCollection.selected && trimmedInput.length > 0) ||
    trimmedInput.length > 0;

  const showAddBtnStyles =
    selectedCollection.selected && trimmedInput.length === 0
      ? styles.blur
      : styles.hide;

  const btnStyles = isAddBtn
    ? styles.add
    : [styles.add, showAddBtnStyles].join(' ');

  const addBtnHandler = isAddBtn
    ? submitHandler
    : () => dispatch(resetSelection());

  const formStyles = selectedCollection.selected
    ? [styles.form, styles.selected].join(' ')
    : styles.form;

  const maxLength =
    !selectedCollection.selected || selectedCollection.edit
      ? COLLECTION_LENGTH
      : ITEM_LENGTH;

  const inputLengthText = `${todoInput.length}/${maxLength}`;
  const showInputLength = isAddBtn ? inputLengthText : '';

  return (
    <form
      className={formStyles}
      onSubmit={submitHandler}
      data-collection={
        selectedCollection.edit
          ? `Editing: ${selectedCollection.title}`
          : selectedCollection.title
      }
      data-length={showInputLength}
    >
      <input
        type="color"
        title={text.header.setColorTitle}
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
        maxLength={maxLength}
      />

      <Button
        className={btnStyles}
        title={isAddBtn ? text.common.add : text.common.cancel}
        onClick={addBtnHandler}
        disabled={isBtnDisabled}
        content={<FontAwesomeIcon icon={faPlus} />}
      />
    </form>
  );
};

export default TodoForm;
