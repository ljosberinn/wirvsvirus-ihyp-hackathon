import classnames from 'classnames';
import { Button, Help } from 'rbx';
import React from 'react';
import { FaWhatsapp, FaMobile } from 'react-icons/all';
import { NavLink } from 'react-router-dom';

import { Icon, TemplatedHelmet } from '../../../components';
import { useNavigationContext } from '../../../context';
import { withSentry } from '../../../hocs';
import styles from './LandingPage.module.scss';
import logo from './logo.png';

function ButtonNavLink(props) {
  return <Button as={NavLink} {...props} />;
}

export default withSentry(function LandingPage() {
  const {
    routes: { REGISTER, REQUEST },
    PreloadingLink,
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
              <div className={styles.logo}>
                <img src={logo} alt={'logo'} height={50} />
              </div>
              <div className={styles.name}>Help At Home</div>
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
            </div>
            <div className={styles.rightContainer}>
              <div>
                <div className={styles.header}>
                  Was können wir für dich tun?
                </div>
                <div className={styles.buttonContainer}>
                  <Button.Group>
                    <PreloadingLink
                      as={ButtonNavLink}
                      to={REGISTER}
                      type="button"
                      size="large"
                      color="primary"
                      className={styles.button}
                    >
                      Ich biete Hilfe an
                    </PreloadingLink>

                    <PreloadingLink
                      as={ButtonNavLink}
                      to={REQUEST}
                      type="button"
                      size="large"
                      color="info"
                      className={styles.button}
                    >
                      Ich brauche Hilfe
                    </PreloadingLink>
                  </Button.Group>
                </div>
                <div className={styles.alternative}>
                  <p>
                    Alternativ kannst Du Dir auch telefonisch* oder per
                    WhatsApp** Hilfe wünschen:
                  </p>
                  <div>
                    <div className={styles.phone}>
                      <Icon
                        className={classnames(styles.icon, styles.mobile)}
                        svg={FaMobile}
                      />
                      <span className={styles.number}>
                        <a href="tel:+015735996669">0157 - 35 99 66 69</a>
                      </span>
                    </div>
                    <div className={styles.phone}>
                      <Icon className={styles.icon} svg={FaWhatsapp} />
                      <span className={styles.number}>
                        <a href="tel:+0014155238886">001 415 523 - 8886</a>
                      </span>
                    </div>
                  </div>
                  <div>
                    <Help>* normale Mobilfunkkosten können anfallen</Help>
                    <Help>
                      ** muss zu Testzwecken noch freigeschaltet werden
                    </Help>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
