import React from 'react';

import Map from '../../../components/Map/Map';
import { withSentry } from '../../../hocs';

export default withSentry(function LandingPage() {
  return <Map />;
});
