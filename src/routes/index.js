import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useNavigationContext } from '../context';
import LoadableComponent, { withMaxDelay } from './loadUtils';

const RedirectToHome = LoadableComponent(() =>
  withMaxDelay(import('./RedirectToHome')),
);

export default memo(function Routes() {
  const { routes } = useNavigationContext();

  return (
    <Switch>
      {Object.values(routes).map(({ routerPath, component }) => (
        <Route path={routerPath} component={component} exact key={routerPath} />
      ))}
      <Route component={RedirectToHome} />
    </Switch>
  );
});
