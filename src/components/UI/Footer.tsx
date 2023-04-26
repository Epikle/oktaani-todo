import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import styles from './Footer.module.scss';

const currentYear = new Date().getFullYear();

const Footer: FC = () => (
  <footer className={styles.footer}>
    Made with <FontAwesomeIcon icon={faHeart} style={{ color: '#ff0000', paddingInline: '0.125rem' }} /> by oktaani.com
    &copy; {currentYear}
  </footer>
);

export default Footer;
