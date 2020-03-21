import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ActivitiesStep({ handleChange }) {
  const { t } = useTranslation('onboarding');

  return <p>HelpStep</p>;
}

ActivitiesStep.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
