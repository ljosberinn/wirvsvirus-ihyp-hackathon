import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { BRAND_NAME } from '../constants/env';

/**
 *
 * @param {{
 * children: JSX.Element
 * }}
 */
export default function TemplatedHelmet({ children }) {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <Helmet titleTemplate={`%s | ${BRAND_NAME}`}>
      <html lang={language} />
      {children}
    </Helmet>
  );
}
