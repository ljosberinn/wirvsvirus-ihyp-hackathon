import React from 'react';
import { useIdentityContext } from 'react-netlify-identity';

import Map from '../../../components/Map/Map';
import { useTheme } from '../../../context';
import { withSentry } from '../../../hocs';

export default withSentry(function LandingPage() {
  const { user } = useIdentityContext();
  return <Map />;
});
