import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import { Card, Button, Content } from 'rbx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { useIdentityContext } from 'react-netlify-identity';
import { useGeolocation } from 'react-use';
import 'tippy.js/dist/tippy.css'; // optional

import { updateRequest } from '../../services/RequestService';
import Loader from '../Loader';
import styles from './Map.module.scss';

const defaultLocation = {
  lng: 11.576124,
  lat: 48.137154,
};

const defaultStyle = 'mapbox://styles/retinadesign/ck81gqhvb0pg11io6607jo0xo';
const defaultToken =
  'pk.eyJ1IjoicmV0aW5hZGVzaWduIiwiYSI6ImNrODFnbnpwOTAwajQzZm5zeXFxZjg3ZmwifQ.fP1f-G79abYwRqsMMUx3WQ';

export default function Map({
  accessToken = defaultToken,
  requests = [],
  mapStyle = defaultStyle,
  fallbackLocation = defaultLocation,
  forceFallback = false,
}) {
  const MapLayer = ReactMapboxGl({
    accessToken,
  });

  const { latitude, longitude, loading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 2500,
  });

  const [location, setLocation] = useState({ lng: null, lat: null, zoom: 13 });

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!location.lng && !location.lat) {
      const lng = longitude || fallbackLocation.lng;
      const lat = latitude || fallbackLocation.lat;

      setLocation({
        lng: forceFallback ? fallbackLocation.lng : lng,
        lat: forceFallback ? fallbackLocation.lat : lat,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, location.lat, location.lng]);

  if (loading || !location.lng || !location.lat) {
    return <Loader />;
  }

  return (
    <div className={styles.map}>
      <MapLayer
        zoom={[13]}
        center={[location.lng, location.lat]}
        style={mapStyle}
        className={styles.mapContainer}
      >
        <MapBody requests={requests} />
      </MapLayer>
    </div>
  );
}

function MapBody({ requests }) {
  const [activeRequest, setActiveRequest] = useState(null);

  function toggleModal(id) {
    setActiveRequest(activeRequest ? null : id);
  }

  return requests
    .filter(request => !!request.results)
    .map(request => {
      const {
        id,
        results: { lat, lng },
      } = request;

      return (
        <Marker coordinates={[lng, lat]} key={id}>
          <Tippy
            interactive
            content={
              <RequestModal toggleModal={toggleModal} request={request} />
            }
          >
            <div className={styles.marker} />
          </Tippy>
        </Marker>
      );
    });
}

function RequestModal({ request }) {
  const { t } = useTranslation('onboarding');
  const {
    user: { id },
  } = useIdentityContext();

  const ts = new Date(request.date);

  function handleAcceptRequest() {
    updateRequest(request.id, { ...request, guardian: id });
  }

  return (
    <Content>
      <Card className={styles.card}>
        <Card.Header>
          <Card.Header.Title>
            Hilfegesuch{' '}
            {request.task && t(`activity-${request.task.toLowerCase()}`)}
          </Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Content>
            <p>{request.date}</p>
            <p>{request.comment}</p>
          </Content>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            <Button type="button" color="success" onClick={handleAcceptRequest}>
              Annehmen
            </Button>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </Content>
  );
}

Map.propTypes = {
  requests: PropTypes.array,
  mapStype: PropTypes.string,
  forceFallback: PropTypes.bool,
};
