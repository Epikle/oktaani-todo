import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import type { Texts, Selected } from '../../types';
import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';

import styles from './ColorChooser.module.scss';

type Props = {
  defaultColor: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  selectedCollection: Selected;
  text: Texts;
};

const ColorChooser: FC<Props> = ({ defaultColor, color, setColor, selectedCollection, text }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const { setSelectedCollection } = useSelectedStore();
  const { editCollection } = useTodoStore();

  const colorInputHandler = async () => {
    if (!colorInputRef.current) return;
    if (!selectedCollection.color) {
      setColor(colorInputRef.current.value);
      return;
    }

    const editedCollection = {
      id: selectedCollection.id,
      title: selectedCollection.title,
      color: colorInputRef.current.value,
      shared: selectedCollection.shared,
    };

    await editCollection(editedCollection);

    setSelectedCollection({
      ...selectedCollection,
      color: colorInputRef.current.value,
    });
  };

  useEffect(() => {
    if (!colorInputRef.current) return;
    if (!selectedCollection.color) {
      colorInputRef.current.value = color;
      return;
    }

    colorInputRef.current.value = selectedCollection.color;
  }, [selectedCollection.color, color]);

  return (
    <input
      type="color"
      title={text.header.setColorTitle}
      className={styles['color-picker']}
      ref={colorInputRef}
      defaultValue={defaultColor}
      onBlur={colorInputHandler}
    />
  );
};

export default ColorChooser;
