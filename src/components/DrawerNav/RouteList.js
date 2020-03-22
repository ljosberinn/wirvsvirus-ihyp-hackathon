import PropTypes from 'prop-types';
import { Menu } from 'rbx';
import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMap } from 'react-icons/fa';
import { useLocation, NavLink } from 'react-router-dom';

import { useNavigationContext } from '../../context';
import { useMediaQuery } from '../../hooks';
import Icon from '../Icon';

const NavigationLink = lazy(() =>
  import(
    /* webpackChunkName: "drawer_nav.navigation_link"*/ './NavigationLink'
  ),
);

export default function RouteList({ isExpanded }) {
  const { t } = useTranslation('routes');
  const { routes, PreloadingLink } = useNavigationContext();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { pathname } = useLocation();

  return (
    <Menu.List>
      <Menu.List.Item as={NavLink} to="/" active={pathname === '/'}>
        <Icon svg={FaMap} />
        <span>Übersicht</span>
      </Menu.List.Item>
      {Object.values(routes)
        .filter(({ visibleInDrawerNav }) => visibleInDrawerNav)
        .map(route => (
          <PreloadingLink
            as={NavigationLink}
            to={route}
            path={route.clientPath}
            active={route.clientPath === pathname}
            svg={route.icon}
            isExpanded={isDesktop ? isExpanded : true}
            key={route.clientPath}
          >
            {t(route.title)}
          </PreloadingLink>
        ))}
    </Menu.List>
  );
}

RouteList.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
};
