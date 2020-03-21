import PropTypes from 'prop-types';
import { Modal, Box } from 'rbx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIdentityContext } from 'react-netlify-identity';

import { Form, Step } from '../../../components';
import { withSentry } from '../../../hocs';
import styles from './OnboardingModal.module.scss';
import {
  StepActions,
  ContactStep,
  ImageStep,
  ActivitiesStep,
} from './components';

export const steps = [
  { name: 'contact', i18nKey: 'contactData', component: ContactStep },
  {
    name: 'activities',
    i18nKey: 'activities',
    component: ActivitiesStep,
  },
  { name: 'photo', i18nKey: 'photo', component: ImageStep },
];

const initialState = {
  [steps[0].name]: {
    title: undefined,
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
  },
  [steps[1].name]: {
    radius: 10, // km
    address: undefined,
    activities: [],
  },
  [steps[2].name]: {
    img: undefined,
  },
};

const validateCurrentStep = (data, currentStep) => {
  switch (currentStep) {
    case 0:
      const { title, firstName, lastName, phone } = Object.values(data)[
        currentStep
      ];

      return !!title && !!firstName && !!lastName && !!phone;
    case 1:
      const { radius, address, activities } = Object.values(data)[currentStep];

      return radius >= 1 && radius <= 20 && !!address && activities.length > 0;

    case 2:
      const { img } = Object.values(data)[currentStep];
      return !!img;
    default:
      return false;
  }
};

export default withSentry(function OnboardingModal() {
  const {
    user: { id },
  } = useIdentityContext();
  const { t } = useTranslation('onboarding');

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ ...initialState, id });
  const [currentStep, setCurrentStep] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  function handleChange({ target: { value, name, type, checked } }) {
    const dataKey = steps[currentStep].name;

    if (type !== 'checkbox') {
      setData({
        ...data,
        [dataKey]: { ...data[dataKey], [name]: value },
      });
      return;
    }

    const currentlySelectedValues = data[dataKey][name];

    setData({
      ...data,
      [dataKey]: {
        ...data[dataKey],
        [name]: checked
          ? [...currentlySelectedValues, value]
          : currentlySelectedValues.filter(val => val !== value),
      },
    });
  }

  function handleStepChange(newIndex) {
    if (newIndex > steps.length) {
      return;
    }

    setCurrentStep(newIndex);
  }

  const StepComponent = steps[currentStep].component;

  return (
    <Modal active>
      <Modal.Background />

      <Modal.Content>
        <Box className={styles.box}>
          <Form onSubmit={handleSubmit}>
            <fieldset disabled={isLoading}>
              <Step.Container
                isForm
                steps={steps.map(({ i18nKey }, index) => (
                  <Step
                    isForm
                    title={t(i18nKey)}
                    index={index + 1}
                    completed={currentStep > index}
                    active={index === currentStep}
                    onClick={
                      index > currentStep
                        ? undefined
                        : () => handleStepChange(index)
                    }
                    key={steps[index].name}
                  />
                ))}
                actions={
                  <StepActions
                    currentStep={currentStep}
                    handleStepChange={handleStepChange}
                    mayCurrentlyContinue={validateCurrentStep(
                      data,
                      currentStep,
                    )}
                    isLoading={isLoading}
                  />
                }
              >
                <StepComponent
                  handleChange={handleChange}
                  {...data[steps[currentStep].name]}
                />
              </Step.Container>
            </fieldset>
          </Form>
        </Box>
      </Modal.Content>
    </Modal>
  );
});
