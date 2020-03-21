import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useNavigationContext } from '../context';
import LoadableComponent, { withMaxDelay } from './loadUtils';

const RedirectToHome = LoadableComponent(() =>
  withMaxDelay(import('./RedirectToHome')),
);

export default memo(function Routes() {
  const { routes } = useNavigationContext();

  const { modals, regularRoutes } = Object.values(routes).reduce(
    (carry, route) => {
      if (route.isModal) {
        return { ...carry, modals: [...carry.modals, route] };
      }

      return { ...carry, regularRoutes: [...carry.regularRoutes, route] };
    },
    {
      modals: [],
      regularRoutes: [],
    },
  );

  return (
    <>
      <Switch>
        {modals.map(({ routerPath, component }) => (
          <Route path={routerPath} component={component} key={routerPath} />
        ))}
      </Switch>

      <Switch>
        {regularRoutes.map(({ routerPath, component }) => (
          <Route
            path={routerPath}
            component={component}
            exact
            key={routerPath}
          />
        ))}
        <Route component={RedirectToHome} />
      </Switch>
    </>
  );
});
