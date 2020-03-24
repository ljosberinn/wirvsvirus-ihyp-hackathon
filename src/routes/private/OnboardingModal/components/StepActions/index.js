import PropTypes from 'prop-types';
import { Button } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaStepBackward, FaStepForward, FaCheck } from 'react-icons/fa';

import { steps } from '../..';
import { Icon } from '../../../../../components';

export default function StepActions({
  currentStep,
  handleStepChange,
  isLoading,
  mayCurrentlyContinue,
}) {
  console.log({currentStep, mayCurrentlyContinue});
  const { t } = useTranslation('onboarding');

  function handleGoBack() {
    if (currentStep === 0) {
      return;
    }

    handleStepChange(currentStep - 1);
  }

  function handleContinue() {
    if (currentStep === steps.length - 1) {
      return;
    }

    handleStepChange(currentStep + 1);
  }

  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      <Button onClick={handleGoBack} type="button" disabled={currentStep === 0}>
        <Icon svg={FaStepBackward} />
        <span>{t('back')}</span>
      </Button>
      {isLastStep ? (
        <Button
          color="primary"
          type="submit"
          state={isLoading ? 'loading' : undefined}
          disabled={!mayCurrentlyContinue}
        >
          <Icon svg={FaCheck} />
          <span>{t('completeRegistration')}</span>
        </Button>
      ) : (
        <Button
          type="button"
          color="info"
          key="next-button"
          disabled={!mayCurrentlyContinue || currentStep === steps.length - 1}
          onClick={mayCurrentlyContinue ? handleContinue : undefined}
        >
          <span>{t('continue')}</span>
          <Icon svg={FaStepForward} />
        </Button>
      )}
    </>
  );
}

StepActions.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  handleStepChange: PropTypes.func.isRequired,
  mayCurrentlyContinue: PropTypes.bool.isRequired,
};
