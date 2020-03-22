import classnames from 'classnames';
import React, { useState } from 'react';

import { TemplatedHelmet } from '../../../components';
import { withSentry } from '../../../hocs';
import { useNavigate } from '../../../hooks';
import { createRequest } from '../../../services/RequestService';
import { LANDING_PAGE } from '../index';
import styles from './RequestPage.module.scss';
import StepFour from './steps/StepFour';
import StepOne from './steps/StepOne';
import StepThree from './steps/StepThree';
import StepTwo from './steps/StepTwo';

export default withSentry(function RequestPage() {
  const steps = [StepOne, StepTwo, StepThree, StepFour];
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    completeName: null,
    email: null,
    zip: null,
    street: null,
    comment: null,
  });
  const push = useNavigate();

  function handleFormChange(e, key) {
    setForm({
      ...form,
      [key]: e.target.value,
    });
  }

  function renderStep() {
    if (done === true) {
      return renderSent();
    } else {
      const ActiveStep = steps[step];
      return <ActiveStep values={form} onChange={handleFormChange}/>;
    }
  }

  function handleNextStep() {
    setStep(step + 1);
  }

  function handlePreviousStep() {
    if (step > 0) {
      setStep(step - 1);
    } else {
      push(LANDING_PAGE.routerPath);
    }
  }

  function handleSend() {
    createRequest({
      ...form,
      requestState: 'pending',
    })
      .then(() => {
        setDone(true);
      })
      .catch(console.error);
  }

  function renderSent() {
    return (
      <div className={classnames(styles.step, styles.stepFinish)}>
        <div className={styles.stepTitle}>Anfrage wurde abgesendet!</div>
        <div className={styles.stepContent}>
          Sobald sich ein freiwilliger Helfer findet bekommst du eine Benachrichtigung.
        </div>
      </div>
    );
  }

  function renderPrevious() {
    return (
      <div className={classnames(styles.button, styles.secondary)} onClick={handlePreviousStep}>
        Zurück
      </div>
    );
  }

  function renderNext() {
    if (step < steps.length - 1) {
      return (
        <div className={classnames(styles.button)} onClick={handleNextStep}>
          Weiter
        </div>
      );
    }
  }

  function renderFinish() {
    if (step === steps.length - 1) {
      return (
        <div className={classnames(styles.button)} onClick={handleSend}>
          Absenden
        </div>
      );
    }
  }

  function renderBack() {
    return (
      <div className={classnames(styles.button)} onClick={() => push(LANDING_PAGE.routerPath)}>
        Zur Startseite
      </div>
    );
  }

  function renderControls() {
    if (done === false) {
      return (
        <div className={styles.controls}>
          {renderPrevious()}
          {renderNext()}
          {renderFinish()}
        </div>
      );
    } else {
      return (
        <div className={styles.controls}>
          {renderBack()}
        </div>
      );
    }
  }

  return (
    <>
      <TemplatedHelmet>
        <title>Home</title>
      </TemplatedHelmet>
      <div className={styles.requestPage}>
        <div className={styles.steps}>
          {renderStep()}
          {renderControls()}
        </div>
      </div>
    </>
  );
});
