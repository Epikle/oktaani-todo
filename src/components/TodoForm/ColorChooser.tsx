import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import useSelectedStore from '../../context/useSelectedStore';
import useStatusStore from '../../context/useStatusStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';

import styles from './ColorChooser.module.scss';

type Props = {
  defaultColor: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

const ColorChooser: FC<Props> = ({ defaultColor, color, setColor }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const storeColor = useSelectedStore((state) => state.color);
  const id = useSelectedStore((state) => state.id);
  const { setSelectedCollection } = useSelectedStore((state) => state.actions);
  const { editCollection } = useTodoStore((state) => state.actions);
  const { setError } = useStatusStore((state) => state.actions);
  const { text } = useLanguage();

  const colorInputHandler = async () => {
    if (!colorInputRef.current) return;
    if (!storeColor) {
      setColor(colorInputRef.current.value);
      return;
    }

    try {
      await editCollection({
        id,
        color: colorInputRef.current.value,
      });
    } catch (error) {
      setError(text.errors.apiUpdateCollection);
    }

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
      data-testid="input-color"
    />
  );
};

export default ColorChooser;
