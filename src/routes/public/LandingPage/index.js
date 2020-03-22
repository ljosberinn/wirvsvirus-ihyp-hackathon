import { Button } from 'rbx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { TemplatedHelmet, Map } from '../../../components';
import { useNavigationContext } from '../../../context';
import { withSentry } from '../../../hocs';
import styles from './LandingPage.module.scss';
import logo from './logo_1000.svg';
import visual from './visual_1000.svg';

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
          <div className={styles.body}>
            <div className={styles.leftContainer}>
              <img src={logo} alt="logo" />
              <p>
                Es gibt viele Menschen, die in der aktuellen Situation bei
                Aufgaben des Alltags wie Lebensmitteleinkäufen Hilfe benötigen,
                beispielsweise weil sie zu einer Risikogruppe gehören.{' '}
              </p>
              <p>
                Und: es gibt auch viele Menschen, die nicht zur Risikogruppe
                gehören und anderen Menschen helfen möchten.{' '}
              </p>
              <p>
                Wir bei Help-At-Home führen beide Gruppen zusammen! Du suchst
                Hilfe aus Deiner Nachbarschaft oder willst Deine Hilfe anbieten?
                Melde Dich jetzt!
              </p>
              <p> Gemeinsam und füreinander sind wir stark!</p>
              <div className={styles.buttonContainer}>
                <Button.Group>
                  <Button
                    as={NavLink}
                    to={REGISTER.clientPath}
                    type="button"
                    size="large"
                    color="primary"
                  >
                    Ich biete Hilfe an
                  </Button>

                  <Button type="button" size="large" color="info">
                    Ich brauche Hilfe
                  </Button>
                </Button.Group>
                <p>
                  Alternativ kannst Du Dir auch telefonisch oder per WhatsApp
                  Hilfe wünschen.
                </p>
                <div class={styles.phone}>
                  <span>Anrufen unter</span>
                  <span>068 - 50 98 56 86</span>
                </div>
                <div class={styles.phone}>
                  <span>WhatsApp unter</span>
                  <span>001 415 523 - 8886</span>
                </div>
              </div>
            </div>
            <div className={styles.rightContainer}>
              <img src={visual} alt="visual" />
            </div>
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
