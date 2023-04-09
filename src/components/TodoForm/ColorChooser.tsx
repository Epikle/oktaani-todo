import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import useBoundStore from '../../context/useBoundStore';
import useLanguage from '../../hooks/useLanguage';

import styles from './ColorChooser.module.scss';

type Props = {
  defaultColor: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

const ColorChooser: FC<Props> = ({ defaultColor, color, setColor }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const { editCollection, setSelectedCollection, color: storeColor, id, title, shared } = useBoundStore();
  const { text } = useLanguage();

  const colorInputHandler = async () => {
    if (!colorInputRef.current) return;
    if (!storeColor) {
      setColor(colorInputRef.current.value);
      return;
    }

    const editedCollection = {
      id,
      title,
      color: colorInputRef.current.value,
      shared,
    };

    await editCollection(editedCollection);

    setSelectedCollection({
      color: colorInputRef.current.value,
    });
  };

  useEffect(() => {
    if (!colorInputRef.current) return;
    if (!storeColor) {
      colorInputRef.current.value = color;
      return;
    }

    colorInputRef.current.value = storeColor;
  }, [storeColor, color]);

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
