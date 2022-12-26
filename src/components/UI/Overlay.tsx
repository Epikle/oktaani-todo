import { FC, ReactNode } from 'react';

import styles from './Overlay.module.scss';
type Props = {
  children?: ReactNode;
};

const Overlay: FC<Props> = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};

export default Overlay;
