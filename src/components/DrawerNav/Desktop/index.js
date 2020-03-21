import PropTypes from 'prop-types';
import { Column, Menu, Box } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDoubleDown } from 'react-icons/fa';

import Icon from '../../Icon';
import RouteList from '../RouteList';
import styles from './Desktop.module.scss';

export default function Desktop({ isExpanded, toggleMenu, ...rest }) {
  const { t } = useTranslation('navigation');

  return (
    <Column
      size={isExpanded ? 2 : 1}
      className={styles.transitionAll}
      {...rest}
    >
      <Box as={Menu} textAlign="right" className={styles.box}>
        <nav aria-label="primary navigation">
          <RouteList isExpanded={isExpanded} />
          <Menu.List>
            <Menu.List.Item
              onClick={toggleMenu}
              tooltip={isExpanded ? undefined : t('toggleMenu')}
              tooltipPosition="right"
              data-testid="drawer-nav-desktop-toggle"
            >
              <Icon
                svg={FaAngleDoubleDown}
                className={
                  isExpanded ? styles.transform90 : styles.transform270
                }
              />
              <span>{t('toggleMenu')}</span>
            </Menu.List.Item>
          </Menu.List>
        </nav>
      </Box>
    </Column>
  );
}

Desktop.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};
