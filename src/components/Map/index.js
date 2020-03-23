import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import { Card, Button, Content } from 'rbx';
import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { useIdentityContext } from 'react-netlify-identity';
import 'tippy.js/dist/tippy.css';

import { useNavigate } from '../../hooks';
import { TASKS } from '../../routes/private';
import { updateRequest } from '../../services/RequestService';
import toast from '../../utils/toast';
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
}) {
  const Map = useMemo(
    () =>
      ReactMapboxGl({
        accessToken,
      }),
    [accessToken],
  );

  useEffect(() => {
    // fixes sometimes broken mobile width
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 350);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.map}>
      <Map
        zoom={[13]}
        center={[fallbackLocation.lng, fallbackLocation.lat]}
        style={mapStyle}
        className={styles.mapContainer}
      >
        <MapBody requests={requests} />
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
              <RequestModal toggleModal={toggleModal} request={request} />
            }
          >
            <div
              className={`${styles.marker} ${styles[request.requestState]}`}
            />
          </Tippy>
        </Marker>
      );
    });
}

const formatText = text => {
  if (text.startsWith('Bot:')) {
    return (
      <>
        <strong>Bot</strong>
        {text.replace('Bot', '')}
      </>
    );
  }

  if (text.startsWith('Hilfesuchender')) {
    return (
      <>
        <strong>Hilfesuchender</strong>
        {text.replace('Hilfesuchender', '')}
      </>
    );
  }

  return text;
};

function RequestModal({
  request: { task, requestState, audio, date, id: requestId, comment },
}) {
  const { t } = useTranslation('onboarding');
  const push = useNavigate();
  const {
    user: { id },
  } = useIdentityContext();

  function handleAcceptRequest() {
    toast({ content: 'Du hast dir die Aufgabe zugewiesen.' });
    updateRequest(requestId, { guardian: id, requestState: 'progress' })
      .then(() => {
        push(TASKS.routerPath);
      })
      .catch(console.error);
  }

  function renderActionButton() {
    if (requestState === 'pending') {
      return (
        <Button
          type="button"
          className={styles.actionButton}
          color="success"
          onClick={handleAcceptRequest}
        >
          Annehmen
        </Button>
      );
    }
  }

  return (
    <Content>
      <Card className={styles.card}>
        <Card.Header className={styles.cardHeader}>
          <Card.Header.Title className={styles.cardHeaderTitle}>
            <div className={styles.titleText}>
              Hilfegesuch {task && t(`activity-${task.toLowerCase()}`)}
            </div>
            <div className={styles.karma}>{20}</div>
          </Card.Header.Title>
        </Card.Header>
        <Card.Content className={styles.cardContent}>
          <Content>
            <div className={styles.cardTitle}>
              {date && (
                <div className={styles.date}>
                  vom{' '}
                  {new Intl.DateTimeFormat('de-DE').format(Date.parse(date))}
                </div>
              )}
            </div>
            {comment &&
              comment
                .split('\n')
                .filter(text => text !== 'Bot: undefined')
                .map((text, index) => {
                  return (
                    <p key={index}>
                      {formatText(text)}
                      <br />
                    </p>
                  );
                })}
            {audio && (
              <audio controls src={audio} preload="metadata">
                Ihr Browser unterstützt leider keine Audiodateien.
              </audio>
            )}
          </Content>
        </Card.Content>
        <Card.Footer className={styles.cardFooter}>
          <Card.Footer.Item>{renderActionButton()}</Card.Footer.Item>
        </Card.Footer>
      </Card>
    </Content>
  );
}

Map.propTypes = {
  requests: PropTypes.array,
  mapStype: PropTypes.string,
};
