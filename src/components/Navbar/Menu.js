import { Navbar } from 'rbx';
import React, { lazy } from 'react';
import { useIdentityContext } from 'react-netlify-identity';

import withSuspense from '../../hocs/withSuspense';

const AuthenticatedNavButtons = lazy(() =>
  import(
    /* webpackChunkName: "navbar.authenticated_nav_buttons" */ './AuthenticatedNavButtons'
  ),
);

const UnauthenticatedNavButtons = lazy(() =>
  import(
    /* webpackChunkName: "navbar.unauthenticated_nav_buttons" */ './UnauthenticatedNavButtons'
  ),
);

export default withSuspense(function Menu() {
  const { isLoggedIn, isConfirmedUser } = useIdentityContext();

  const authAwareButtons = !isLoggedIn ? (
    <UnauthenticatedNavButtons />
  ) : isConfirmedUser ? (
    <AuthenticatedNavButtons />
  ) : null;

  return (
    <Navbar.Menu className="is-active">
      <Navbar.Segment align="end">{authAwareButtons}</Navbar.Segment>
    </Navbar.Menu>
  );
});
