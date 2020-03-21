import { Section, Box, Title } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TemplatedHelmet } from '../../../components';
import { withSentry } from '../../../hocs';
import styles from './TasksRoute.module.scss';

export default withSentry(function TasksRoute() {
  const { t } = useTranslation('settings');

  return (
    <>
      <TemplatedHelmet>
        <title>{t('title')}</title>
      </TemplatedHelmet>
      <Section className={styles.container} aria-labelledby="section-title">
        <Box>
          <Title id="section-title">{t('title')}</Title>
        </Box>
      </Section>
    </>
  );
});
