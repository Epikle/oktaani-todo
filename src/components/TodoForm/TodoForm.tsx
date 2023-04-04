import { FC, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { nanoid } from 'nanoid';

import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';
import Button from '../UI/Button';
import ColorChooser from './ColorChooser';
import TodoInput from './TodoInput';

import styles from './TodoForm.module.scss';

const DEFAULT_COLOR = '#7b68ee';
const COLLECTION_LENGTH = 100;
const ITEM_LENGTH = 300;

const TodoForm: FC = () => {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [todoInput, setTodoInput] = useState('');
  const selectedCollection = useSelectedStore();
  const { createCollection, createCollectionItem, editCollection } = useTodoStore();
  const { text } = useLanguage();
  const trimmedInput = todoInput.trim().replace(/\s+/g, ' ');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCollection.edit) {
      setTodoInput(selectedCollection.title);
      return;
    }
    setTodoInput('');
  }, [selectedCollection.edit, selectedCollection.title]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (trimmedInput.length === 0) return;
    setIsLoading(true);

    if (selectedCollection.edit) {
      const editedCollection = {
        id: selectedCollection.id,
        title: trimmedInput,
        color: selectedCollection.color,
        shared: selectedCollection.shared,
      };
      await editCollection(editedCollection);
      selectedCollection.setSelectedCollection(editedCollection);
      selectedCollection.setSelectedCollection({ edit: false });
      setIsLoading(false);
      return;
    }

    if (selectedCollection.selected) {
      await createCollectionItem({
        id: selectedCollection.id,
        itemEntry: { text: trimmedInput },
      });

      setTodoInput('');
      setIsLoading(false);
      return;
    }

    const newCollectionEntry = {
      title: trimmedInput,
      color,
      id: nanoid(),
      shared: false,
    };

    createCollection(newCollectionEntry);
    selectedCollection.setSelectedCollection(newCollectionEntry);

    setTodoInput('');
    setIsLoading(false);
  };

  const isBtnDisabled = !selectedCollection.selected && trimmedInput.length === 0;

  const isAddBtn = (selectedCollection.selected && trimmedInput.length > 0) || trimmedInput.length > 0;

  const showAddBtnStyles = selectedCollection.selected && trimmedInput.length === 0 ? styles.blur : styles.hide;

  const btnStyles = isAddBtn ? styles.add : [styles.add, showAddBtnStyles].join(' ');

  const addBtnHandler = isAddBtn ? submitHandler : () => selectedCollection.resetSelection();

  const formStyles = selectedCollection.selected ? [styles.form, styles.selected].join(' ') : styles.form;

  const maxLength = !selectedCollection.selected || selectedCollection.edit ? COLLECTION_LENGTH : ITEM_LENGTH;

  const inputLengthText = `${todoInput.length}/${maxLength}`;
  const showInputLength = isAddBtn ? inputLengthText : '';

  return (
    <form
      className={formStyles}
      onSubmit={submitHandler}
      data-collection={
        selectedCollection.edit ? `${text.common.editing}: ${selectedCollection.title}` : selectedCollection.title
      }
      data-length={showInputLength}
    >
      <ColorChooser
        color={color}
        setColor={setColor}
        defaultColor={DEFAULT_COLOR}
        text={text}
        selectedCollection={selectedCollection}
      />

      <TodoInput
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        selectedCollection={selectedCollection}
        text={text}
        maxLength={maxLength}
        isLoading={isLoading}
      />

      <Button
        className={btnStyles}
        title={isAddBtn ? text.common.add : text.common.cancel}
        onClick={addBtnHandler}
        disabled={isBtnDisabled || isLoading}
        content={isLoading ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : <FontAwesomeIcon icon={faPlus} />}
        testId="submit-btn"
      />
    </form>
  );
};

export default TodoForm;
