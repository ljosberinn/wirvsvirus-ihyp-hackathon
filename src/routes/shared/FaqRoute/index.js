import { Section, Title } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TemplatedHelmet } from '../../../components';
import { withSentry } from '../../../hocs';
import styles from './Faq.module.scss';

export default withSentry(function FaqRoute() {
  const { t } = useTranslation(['routes', 'faq']);

  return (
    <>
      <TemplatedHelmet>
        <title>{t('faq')}</title>
      </TemplatedHelmet>
      <Section className={styles.container} aria-labelledby="section-title">
        <Title id="section-title">{t('faq')}</Title>
      </Section>
    </>
  );
});
