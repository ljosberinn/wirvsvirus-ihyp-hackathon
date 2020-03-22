import classnames from 'classnames';
import { Input } from 'rbx';
import React from 'react';

import styles from '../RequestPage.module.scss';

export default function StepOne({values, onChange}) {
  return (
    <div className={classnames(styles.step, styles.stepOne)}>
      <div className={styles.stepTitle}>Wie dürfen wir dich nennen?</div>
      <div className={styles.stepContent}>
        <Input
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          onInput={(e) => onChange(e, 'completeName')}
          defaultValue={values.completeName}
          required />
      </div>
    </div>
  );
}
