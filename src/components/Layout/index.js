import { Column } from 'rbx';
import React, { memo } from 'react';

import Navbar from '../Navbar';
import styles from './Layout.module.scss';
/**
 *
 * @param {{
 * children: JSX.Element;
 * }}
 */
export default memo(function Layout({ children }) {
  return (
    <>
      <Navbar data-testid="navbar" />
      <Column.Group
        gapless
        marginless
        as="main"
        className={styles.main}
        data-testid="layout-main"
      >
        <Column className={styles.shadow} data-testid="layout-main-children">
          {children}
        </Column>
      </Column.Group>
    </>
  );
});
