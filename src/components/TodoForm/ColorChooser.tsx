import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import { editCollection } from '../../context/todoSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import type { Texts, TSelected } from '../../types';

import styles from './ColorChooser.module.scss';

type Props = {
  defaultColor: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  selectedCollection: TSelected;
  text: Texts;
};

const ColorChooser: FC<Props> = ({
  defaultColor,
  color,
  setColor,
  selectedCollection,
  text,
}) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const colorInputHandler = () => {
    if (!colorInputRef.current) return;
    if (!selectedCollection.color) {
      setColor(colorInputRef.current.value);
      return;
    }

    const editedCollection = {
      id: selectedCollection.id,
      title: selectedCollection.title,
      color: colorInputRef.current.value,
    };

    dispatch(editCollection(editedCollection));
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
