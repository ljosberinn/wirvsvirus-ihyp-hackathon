import PropTypes from 'prop-types';
import { Modal, Box, Button } from 'rbx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStepBackward, FaStepForward, FaCheck } from 'react-icons/fa';
import { useIdentityContext } from 'react-netlify-identity';

import { Form, Step, Icon } from '../../../components';
import { withSentry } from '../../../hocs';
import styles from './OnboardingModal.module.scss';

const steps = [
  { name: 'contact', i18nKey: 'contactData' },
  {
    name: 'activities',
    i18nKey: 'activities',
  },
  { name: 'photo', i18nKey: 'photo' },
];

const initialState = {
  [steps[0]]: {
    title: null,
    firstName: null,
    lastName: null,
    phone: null,
  },
  [steps[1]]: {
    radius: 10, // km
    address: null,
    activities: [],
  },
  [steps[2]]: {
    img: null,
  },
};

export default withSentry(function OnboardingModal() {
  const {
    user: { id },
  } = useIdentityContext();
  const { t } = useTranslation('onboarding');

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ ...initialState, id });
  const [currentStep, setCurrentStep] = useState(steps[2].name);

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  function handleChange({ target: { value, name } }) {
    setData({
      ...data,
      [currentStep]: { ...data[currentStep], [name]: value },
    });
  }

  function findIndexOfCurrentStep() {
    return steps.findIndex(({ name }) => currentStep === name);
  }

  function handleStepChange(newIndex) {
    if (newIndex > steps.length) {
      return;
    }

    const currentIndex = findIndexOfCurrentStep();

    if (newIndex < currentIndex) {
      setCurrentStep(steps[newIndex].name);
    }
  }

  const indexOfCurrentStep = findIndexOfCurrentStep();

  return (
    <Modal active>
      <Modal.Background />

      <Modal.Content>
        <Box className={styles.box}>
          <Form onSubmit={handleSubmit}>
            <fieldset disabled={isLoading}>
              <Step.Container
                steps={steps.map(({ i18nKey, name }, index) => (
                  <Step
                    title={t(i18nKey)}
                    index={index + 1}
                    completed={indexOfCurrentStep > index}
                    active={name === currentStep}
                    onClick={
                      index > indexOfCurrentStep
                        ? undefined
                        : () => handleStepChange(index)
                    }
                    key={name}
                  />
                ))}
                actions={
                  <StepActions
                    currentStep={currentStep}
                    handleStepChange={handleStepChange}
                    indexOfCurrentStep={indexOfCurrentStep}
                    isLoading={isLoading}
                  />
                }
              >
                {currentStep === steps[2].name ? (
                  <ImageStep />
                ) : currentStep === steps[1].name ? (
                  <ActivitiesStep />
                ) : (
                  <ContactStep />
                )}
              </Step.Container>
            </fieldset>
          </Form>
        </Box>
      </Modal.Content>
    </Modal>
  );
});

function StepActions({
  currentStep,
  handleStepChange,
  indexOfCurrentStep,
  isLoading,
}) {
  const { t } = useTranslation('onboarding');

  function handleGoBack() {
    if (currentStep === steps[0].name) {
      return;
    }

    handleStepChange(indexOfCurrentStep - 1);
  }

  return (
    <Button.Group>
      <Button
        onClick={handleGoBack}
        type="button"
        disabled={currentStep === steps[0].name}
      >
        <Icon svg={FaStepBackward} />
        <span>{t('back')}</span>
      </Button>
      {currentStep === steps[steps.length - 1].name ? (
        <Button
          color="primary"
          type="submit"
          state={isLoading ? 'loading' : undefined}
        >
          <Icon svg={FaCheck} />
          <span>{t('completeRegistration')}</span>
        </Button>
      ) : (
        <Button
          type="button"
          color="info"
          disabled={currentStep === steps.length - 1}
        >
          <span>{t('continue')}</span>
          <Icon svg={FaStepForward} />
        </Button>
      )}
    </Button.Group>
  );
}

StepActions.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

function ContactStep() {
  const { t } = useTranslation('onboarding');

  return <p>{t('contactData')}</p>;
}

function ActivitiesStep() {
  const { t } = useTranslation('onboarding');

  return <p>HelpStep</p>;
}

function ImageStep() {
  const { t } = useTranslation('onboarding');

  return <p>ImageStep</p>;
}
