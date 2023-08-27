import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';

import styles from './ColorChooser.module.scss';
import { updateSharedCollection } from '../../services/todo';

type Props = {
  defaultColor: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

const ColorChooser: FC<Props> = ({ defaultColor, setColor, color }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { updateCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();

  const colorInputHandler = async () => {
    if (!colorInputRef.current) return;
    if (!selectedCollection) {
      setColor(colorInputRef.current.value);
    } else {
      updateCollection({ id: selectedCollection.id, color: colorInputRef.current.value });
      if (selectedCollection.shared) {
        await updateSharedCollection({ id: selectedCollection.id, color: colorInputRef.current.value });
      }
    }
  };

  useEffect(() => {
    if (!colorInputRef.current) return;
    if (selectedCollection?.color) {
      colorInputRef.current.value = selectedCollection.color;
    } else {
      colorInputRef.current.value = color;
    }
  }, [selectedCollection?.color, color]);

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
