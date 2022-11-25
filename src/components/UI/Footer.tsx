import { FC } from 'react';

import styles from './Footer.module.scss';

const currentYear = new Date().getFullYear();

const Footer: FC = () => (
  <footer className={styles.footer}>{currentYear} &copy; oktaani.com</footer>
);

export default Footer;
