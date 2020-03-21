import { Modal, Box } from 'rbx';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIdentityContext } from 'react-netlify-identity';

import { Form, Step, Loader } from '../../../components';
import { withSentry } from '../../../hocs';
import { createGuardian, getGuardian } from '../../../services/GuardianService';
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
    imgSecurity: false,
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
      const { img, imgSecurity } = Object.values(data)[currentStep];

      return !!img && imgSecurity;
    default:
      return false;
  }
};

export default withSentry(function OnboardingModal() {
  const { user, setUser } = useIdentityContext();
  const { t } = useTranslation('onboarding');

  const [isLoadingGuardian, setGuardianLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialState);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    getGuardian(user.id)
      .then(guardian => {
        user.user_metadata = { ...user.user_metadata, guardian };

        setUser(user);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => setGuardianLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  if (isLoadingGuardian) {
    return <Loader isFullPage defer />;
  }

  if (user.user_metadata.guardian) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (currentStep !== steps.length - 1) {
      if (validateCurrentStep(data, currentStep)) {
        handleStepChange(currentStep + 1);
      }
      return;
    }

    setIsLoading(true);

    const payload = Object.values(data).reduce(
      (carry, dataset) => ({ ...carry, ...dataset }),
      { id: user.id },
    );

    try {
      await createGuardian(payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange({ target: { value, name, type, checked, files } }) {
    const key = steps[currentStep].name;

    if (type === 'checkbox') {
      const currentlySelectedValues = data[key][name];

      // checkbox with multiple names
      if (Array.isArray(currentlySelectedValues)) {
        setData({
          ...data,
          [key]: {
            ...data[key],
            [name]: checked
              ? [...currentlySelectedValues, value]
              : currentlySelectedValues.filter(val => val !== value),
          },
        });
      } else {
        // checkbox with boolean flip
        setData({
          ...data,
          [key]: {
            ...data[key],
            [name]: !data[key][name],
          },
        });
      }

      return;
    }

    if (type === 'file') {
      // reset
      if (files.length === 0 && data[key][name].length > 0) {
        setData({
          ...data,
          [key]: { ...data[key], [name]: undefined },
        });

        return;
      }

      const [file] = files;

      const reader = new FileReader();

      if (file) {
        reader.addEventListener(
          'load',
          function() {
            setData({
              ...data,
              [key]: { ...data[key], [name]: reader.result },
            });
          },
          false,
        );

        reader.readAsDataURL(file);
      }

      return;
    }

    // plain old input[type="text"]
    setData({
      ...data,
      [key]: { ...data[key], [name]: value },
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
    <Modal active clipped>
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
