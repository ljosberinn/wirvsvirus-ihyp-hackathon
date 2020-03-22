import { Section, Title } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TemplatedHelmet } from '../../../components';
import { withSentry } from '../../../hocs';
import styles from './Partner.module.scss';
import logos1 from './company-logos.jpg';
import logos2 from './ngo-logos.jpg';

export default withSentry(function PartnerRoute() {
  const { t } = useTranslation(['routes', 'partner']);

  return (
    <>
      <TemplatedHelmet>
        <title>{t('partner')}</title>
      </TemplatedHelmet>
      <Section className={styles.container} aria-labelledby="section-title">
        <Title id="section-title">Unser Partnerprogramm</Title>
        <p>
          (für den Hackathon illustrativ und spontan skizziert, natürlich
          besteht keine der genannten Partnerschaften aktuell)
        </p>
        <Title id="section-title">Karma-Programm</Title>
        <p>
          Als Freiwilliger bietest Du Deine Hilfe natürlich nicht an, um
          Belohnungen dafür zu bekommen. Aber Du bekommst trotzdem welche! :)
        </p>
        <p>
          Du sammelst Karma-Punkte mit jeder geleisteten Hilfe. Deine Punkte
          siehst Du, wenn Du angemeldet bist, rechts oben bei Deinem Namen.
          Sobald wir diese Krise gemeinsam überstanden haben, kannst Du bei
          folgenden Partnern Deine Karma-Punkte für eine heiße Tasse Kaffee,
          einen schönen Kinogutschein, einen frischen Mittags-Snack, ein
          spannendes Buch und viel mehr eintauschen...
        </p>
        <img src={logos1} alt="logos1" />
        <Title id="section-title">Helfer-Netzwerk</Title>
        <p>
          Gemeinsam und füreinander sind wir stark! Das gilt auch für
          Helfer-Organisationen.
        </p>
        <p>
          Deswegen könnten wir im Rahmen einer Kooperation beispielsweise mit
          WirHelfen.eu die telefonisch eingehenden Hilfewünsche an die
          fantastischen Freiwilligen von WirHelfen.eu weiterleiten.
        </p>
        <img src={logos2} alt="logos2" />
        <p>.... #FlattenTheCurve # WirvsVirusHack #BleibtGesund</p>
      </Section>
    </>
  );
});
