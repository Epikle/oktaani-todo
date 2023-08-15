import { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';

import useSelectedStore from '../../context/useSelectedStore';
import useTodoStore from '../../context/useTodoStore';
import useLanguage from '../../hooks/useLanguage';

import styles from './ColorChooser.module.scss';

type Props = {
  defaultColor: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};
// TODO color bug
const ColorChooser: FC<Props> = ({ defaultColor, setColor, color }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const selectedCollection = useSelectedStore((state) => state.selectedCollection);
  const { updateCollection } = useTodoStore((state) => state.actions);
  const { text } = useLanguage();

  const colorInputHandler = () => {
    if (!colorInputRef.current) return;
    setColor(colorInputRef.current.value);
    if (!selectedCollection) return;
    updateCollection({
      id: selectedCollection.id,
      color: colorInputRef.current.value,
    });
  };

  useEffect(() => {
    if (!colorInputRef.current) return;
    if (selectedCollection?.color) {
      colorInputRef.current.value = selectedCollection.color;
    } else {
      colorInputRef.current.value = defaultColor;
    }
  }, [selectedCollection?.color, defaultColor, color]);

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
