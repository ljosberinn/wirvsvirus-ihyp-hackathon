import {
  FaBookReader,
  FaShieldAlt,
  FaHandshake,
  FaQuestionCircle,
  FaStamp,
} from 'react-icons/fa';

import LoadableComponent, { withMaxDelay } from '../loadUtils';

export const TOS = {
  routerPath: '/nutzungsbedingungen',
  clientPath: '/nutzungsbedingungen',
  title: 'routes:tos',
  icon: FaBookReader,
  visibleInDrawerNav: false,
  component: LoadableComponent(() =>
    withMaxDelay(import(/* webpackChunkName: "shared.tos" */ './TosRoute')),
  ),
};

export const PRIVACY_POLICY = {
  routerPath: '/datenschutz',
  clientPath: '/datenschutz',
  title: 'routes:privacyPolicy',
  icon: FaShieldAlt,
  visibleInDrawerNav: false,
  component: LoadableComponent(() =>
    withMaxDelay(
      import(
        /* webpackChunkName: "shared.privacypolicy" */ './PrivacyPolicyRoute'
      ),
    ),
  ),
};

export const PARTNER = {
  routerPath: '/partnerprogramm',
  clientPath: '/partnerprogramm',
  title: 'routes:partner',
  icon: FaHandshake,
  visibleInDrawerNav: true,
  component: LoadableComponent(() =>
    withMaxDelay(
      import(/* webpackChunkName: "shared.partner" */ './PartnerRoute'),
    ),
  ),
};

export const FAQ = {
  routerPath: '/häufige-fragen',
  clientPath: '/häufige-fragen',
  title: 'routes:faq',
  icon: FaQuestionCircle,
  visibleInDrawerNav: true,
  component: LoadableComponent(() =>
    withMaxDelay(import(/* webpackChunkName: "shared.faq" */ './FaqRoute')),
  ),
};

export const IMPRINT = {
  routerPath: '/impressum',
  clientPath: '/impressum',
  title: 'routes:imprint',
  icon: FaStamp,
  visibleInDrawerNav: true,
  component: LoadableComponent(() =>
    withMaxDelay(
      import(/* webpackChunkName: "shared.imprint" */ './ImprintRoute'),
    ),
  ),
};
