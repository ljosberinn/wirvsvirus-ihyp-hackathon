import React from 'react';

import { Map } from '../../../components';
import { withSentry } from '../../../hocs';
import { useGuardian } from '../../../hooks';

export default withSentry(function LandingPage() {
  const guardian = useGuardian();

  return <Map />;
});
