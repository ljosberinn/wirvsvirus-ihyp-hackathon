import { Section, Title } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TemplatedHelmet } from '../../../components';
import { withSentry } from '../../../hocs';
import styles from './Partner.module.scss';

export default withSentry(function PartnerRoute() {
  const { t } = useTranslation(['routes', 'partner']);

  return (
    <>
      <TemplatedHelmet>
        <title>{t('partner')}</title>
      </TemplatedHelmet>
      <Section className={styles.container} aria-labelledby="section-title">
        <Title id="section-title">{t('partner')}</Title>
      </Section>
    </>
  );
});
