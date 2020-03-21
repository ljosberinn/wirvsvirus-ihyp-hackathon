import React, { useState, useEffect } from 'react';

import { Map } from '../../../components';
import { GOOGLE_MAPS_KEY } from '../../../constants/env';
import { withSentry } from '../../../hocs';
import { getAllRequests } from '../../../services/RequestService';

async function resolvePosition(zip) {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?language=de&region=eu&address=D${zip}&key=${GOOGLE_MAPS_KEY}`;

    const response = await fetch(url);
    const json = await response.json();

    if (json.status === 'OK' && json.results.length > 0) {
      return json.results[0].geometry.location;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default withSentry(function LandingPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAllRequests()
      .then(async requests => {
        const sanitizedRequests = await Promise.all(
          requests.map(async request => ({
            ...request,
            results: await resolvePosition(request.zip),
          })),
        );

        setRequests(sanitizedRequests);
      })
      .catch(console.error);
  }, []);

  return <Map requests={requests} />;
});
