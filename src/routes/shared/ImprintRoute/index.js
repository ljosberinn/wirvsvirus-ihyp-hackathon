import { Section, Title } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TemplatedHelmet } from '../../../components';
import { withSentry } from '../../../hocs';
import styles from './Imprint.module.scss';

export default withSentry(function ImprintRoute() {
  const { t } = useTranslation(['routes', 'imprint']);

  return (
    <>
      <TemplatedHelmet>
        <title>{t('imprint')}</title>
      </TemplatedHelmet>
      <Section className={styles.container} aria-labelledby="section-title">
        <Title id="section-title">{t('imprint')}</Title>
      </Section>
    </>
  );
});
