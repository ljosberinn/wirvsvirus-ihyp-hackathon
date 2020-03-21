import PropTypes from 'prop-types';
import { Card, Button, Content } from 'rbx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { useGeolocation } from 'react-use';

import Loader from '../Loader';
import styles from './Map.module.scss';

const MapLayer = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmV0aW5hZGVzaWduIiwiYSI6ImNrODFnbnpwOTAwajQzZm5zeXFxZjg3ZmwifQ.fP1f-G79abYwRqsMMUx3WQ',
});

const fallbackLocation = {
  lng: 11.576124,
  lat: 48.137154,
};

export default function Map({ requests }) {
  const { latitude, longitude, loading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 2500,
  });

  const [location, setLocation] = useState({ lng: null, lat: null, zoom: 13 });
  const [activeRequest, setActiveRequest] = useState(null);

  useEffect(() => {
    /*
      map.on('move', () => {
        setLocation({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        });
      });

      */
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!location.lng && !location.lat) {
      const lng = longitude || fallbackLocation.lng;
      const lat = latitude || fallbackLocation.lat;

      setLocation({
        lng,
        lat,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, location.lat, location.lng]);

  if (loading) {
    return <Loader />;
  }

  function toggleModal(event, id) {
    if (event) {
      event.preventDefault();
    }
    setActiveRequest(activeRequest ? null : id);
  }

  function onMove(event) {
    return;
    const {
      transform: { _center, _zoom },
    } = event;
    const { lng, lat } = _center;

    console.log({ lng, lat });

    setLocation({
      lng: lng.toFixed(4),
      lat: lat.toFixed(4),
      zoom: _zoom.toFixed(2),
    });
  }

  return (
    <div className={styles.map}>
      <MapLayer
        zoom={[13]}
        center={[location.lng, location.lat]}
        style="mapbox://styles/retinadesign/ck81gqhvb0pg11io6607jo0xo"
        className={styles.mapContainer}
        onMove={onMove}
      >
        {requests
          .filter(request => !!request.results)
          .map(({ id, results: { lat, lng } }) => {
            return (
              <Marker
                coordinates={[lng, lat]}
                onClick={e => toggleModal(e, id)}
                key={id}
              >
                {activeRequest && activeRequest === id ? (
                  <RequestModal
                    toggleModal={toggleModal}
                    request={requests.find(
                      dataset => dataset.id === activeRequest,
                    )}
                  />
                ) : (
                  <div className={styles.marker} />
                )}
              </Marker>
            );
          })}
      </MapLayer>
    </div>
  );
}

function RequestModal({ request, toggleModal }) {
  const { t } = useTranslation('onboarding');

  const ts = new Date(request.date);

  return (
    <Content>
      <Card>
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
            <Button type="button" color="success">
              Annehmen
            </Button>
          </Card.Footer.Item>
          <Card.Footer.Item>
            <Button type="button" onClick={toggleModal}>
              Cancel
            </Button>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </Content>
  );
}

Map.propTypes = {
  requests: PropTypes.array.isRequired,
};
