import { Column } from 'rbx';
import React, { memo } from 'react';

import DrawerNav from '../DrawerNav';
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
        <DrawerNav />
        <Column className={styles.shadow} data-testid="layout-main-children">
          {children}
        </Column>
      </Column.Group>
    </>
  );
});
