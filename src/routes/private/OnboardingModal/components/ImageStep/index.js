import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ImageStep({ handleChange }) {
  const { t } = useTranslation('onboarding');

  return <p>HelpStep</p>;
}

ImageStep.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
