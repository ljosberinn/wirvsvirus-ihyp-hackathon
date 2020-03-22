import { Button } from 'rbx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { TemplatedHelmet, Map } from '../../../components';
import { useNavigationContext } from '../../../context';
import { withSentry } from '../../../hocs';
import styles from './LandingPage.module.scss';

const defaultLocation = {
  lng: 48.1828776,
  lat: 11.5940998,
};

export default withSentry(function LandingPage() {
  const {
    routes: { REGISTER },
  } = useNavigationContext();

  return (
    <>
      <TemplatedHelmet>
        <title>Home</title>
      </TemplatedHelmet>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.buttonContainer}>
            <Button.Group>
              <Button
                as={NavLink}
                to={REGISTER.clientPath}
                type="button"
                size="large"
                color="primary"
              >
                Ich brauche Hilfe
              </Button>

              <Button type="button" size="large" color="info">
                Ich biete Hilfe an
              </Button>
            </Button.Group>
          </div>
        </div>
        <Map
          accessToken="pk.eyJ1IjoicmV0aW5hZGVzaWduIiwiYSI6ImNrODFnazBkMzA4aGUzZ293azg4MGxud3oifQ.jMmSszx6gA2v9OnztjCA5Q"
          mapStyle="mapbox://styles/retinadesign/ck82bajtp0f6j1il7sek7byl8"
          defaultLocation={defaultLocation}
          forceFallback
        />
      </div>
    </>
  );
});
