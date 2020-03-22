import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import { Card, Button, Content } from 'rbx';
import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { useIdentityContext } from 'react-netlify-identity';
import { useGeolocation } from 'react-use';
import 'tippy.js/dist/tippy.css'; // optional

import { updateRequest } from '../../services/RequestService';
import Loader from '../Loader';
import styles from './Map.module.scss';
import toast from '../../utils/toast';
import { useNavigate } from '../../hooks';
import { TASKS } from '../../routes/private';

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
  const Map = useMemo(() => {
    return ReactMapboxGl({
      accessToken
    })
  }, [accessToken]);


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
    return <Loader/>;
  }

  return (
    <div className={styles.map}>
      <Map
        zoom={[13]}
        center={[location.lng, location.lat]}
        style={mapStyle}
        className={styles.mapContainer}>
        <MapBody requests={requests}/>
      </Map>
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
              <RequestModal toggleModal={toggleModal} request={request}/>
            }
          >
            <div className={`${styles.marker} ${styles[request.requestState]}`}/>
          </Tippy>
        </Marker>
      );
    });
}

function ToastContent() {
  return (<div>Test</div>)
}

function RequestModal({ request }) {
  const { t } = useTranslation('onboarding');
  const push = useNavigate()
  const {
    user: { id },
  } = useIdentityContext();

  const ts = new Date(request.date);

  function handleAcceptRequest() {
    toast({content: "Du hast dir die Aufgabe zugewiesen."});
    updateRequest(request.id, { guardian: id, requestState: 'progress' })
      .then(() => {
        push(TASKS.routerPath);
      })
      .catch(console.error);
  }

  function renderActionButton() {
    if (request.requestState === 'pending') {
      return (
        <Button type="button" className={styles.actionButton} color="success" onClick={handleAcceptRequest}>
          Annehmen
        </Button>
      )
    }
  }

  return (
    <Content>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>
          <Card.Header.Title className={styles.cardHeaderTitle}>
            <div className={styles.titleText}>
              Hilfegesuch{' '}
              {request.task && t(`activity-${request.task.toLowerCase()}`)}
            </div>
            <div className={styles.karma}>{20}</div>
          </Card.Header.Title>
        </Card.Header>
        <Card.Content className={styles.cardContent}>
          <Content>
            <div className={styles.cardTitle}>
              <div className={styles.date}>vom {new Intl.DateTimeFormat('de-DE').format(Date.parse(request.date))}</div>
            </div>
            <p>{request.comment}</p>
          </Content>
        </Card.Content>
        <Card.Footer className={styles.cardFooter}>
          <Card.Footer.Item>
            {renderActionButton()}
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
