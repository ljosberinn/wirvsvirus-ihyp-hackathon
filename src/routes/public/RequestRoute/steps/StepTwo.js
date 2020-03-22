import classnames from 'classnames';
import { Input } from 'rbx';
import React from 'react';

import styles from '../RequestPage.module.scss';

export default function StepTwo({values, onChange}) {
  return (
    <div className={classnames(styles.step, styles.stepTwo)}>
      <div className={styles.stepTitle}>Wie können wir dich erreichen?</div>
      <div className={styles.stepContent}>
        <Input
          type="mail"
          placeholder="max.mustermann@gmail.com"
          name="mail"
          id="mail"
          onInput={(e) => onChange(e, 'email')}
          defaultValue={values.email}/>
      </div>
    </div>
  );
}
