import { Title } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ChangeTheme() {
  const { t } = useTranslation('settings');

  return (
    <>
      <Title as="h3">{t('changeTheme')}</Title>
    </>
  );
}
