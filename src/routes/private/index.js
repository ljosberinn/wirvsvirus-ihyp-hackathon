import { FaCog, FaHome, FaTasks } from 'react-icons/fa';

import LoadableComponent, { withMaxDelay } from '../loadUtils';

export const TASKS = {
  routerPath: '/aufgaben',
  clientPath: '/aufgaben',
  title: 'routes:tasks',
  icon: FaTasks,
  visibleInDrawerNav: true,
  component: LoadableComponent(() =>
    withMaxDelay(
      import(/* webpackChunkName: "private.tasks" */ './TasksRoute'),
    ),
  ),
};

export const LANDING_PAGE = {
  routerPath: '/',
  clientPath: '/',
  title: 'routes:landingPage',
  icon: FaHome,
  visibleInDrawerNav: false,
  component: LoadableComponent(() =>
    withMaxDelay(
      import(/* webpackChunkName: "private.landing_page" */ './LandingPage'),
    ),
  ),
};

export const SETTINGS = {
  routerPath: '/settings/:setting',
  clientPath: '/settings/site',
  title: 'routes:settings',
  icon: FaCog,
  visibleInDrawerNav: false,
  component: LoadableComponent(() =>
    withMaxDelay(
      import(/* webpackChunkName: "private.settings" */ './SettingsRoute'),
    ),
  ),
};

export const ONBOARDING_MODAL = {
  routerPath: '/',
  clientPath: '/',
  title: 'routes:onboardingModal',
  icon: undefined,
  visibleInDrawerNav: false,
  isModal: true,
  component: LoadableComponent(() =>
    withMaxDelay(
      import(
        /* webpackChunkName: "private.onboarding_modal" */ './OnboardingModal'
      ),
    ),
  ),
};
