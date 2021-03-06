import { Button } from 'rbx';
import React, { lazy } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigationContext } from '../../context';
import { withSuspense } from '../../hocs';
import Icon from '../Icon';

const NavButton = lazy(() =>
  import(/* webpackChunkName: "navbar.nav_button" */ './NavButton'),
);

export default withSuspense(function UnauthenticatedNavButtons() {
  const { t } = useTranslation('routes');
  const {
    routes: { LOGIN },
    PreloadingLink,
  } = useNavigationContext();

  if (!LOGIN) {
    return null;
  }

  return (
    <Button.Group>
      <PreloadingLink as={NavButton} to={LOGIN}>
        <Icon svg={LOGIN.icon} />
        <span>{t('login')}</span>
      </PreloadingLink>
    </Button.Group>
  );
});
