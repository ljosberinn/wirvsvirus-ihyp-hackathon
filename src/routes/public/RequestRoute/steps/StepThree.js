import classnames from 'classnames';
import { Input, Label } from 'rbx';
import React from 'react';

import styles from '../RequestPage.module.scss';

export default function StepThree({ values, onChange }) {
  return (
    <div className={classnames(styles.step, styles.stepThree)}>
      <div className={styles.stepTitle}>Wie können wir dich finden?</div>
      <div className={styles.stepContent}>
        <div className={styles.zip}>
          <Label htmlFor="zip">PLZ</Label>

          <Input
            type="text"
            placeholder="80331"
            name="zip"
            id="zip"
            onInput={e => onChange(e, 'zip')}
            defaultValue={values.zip}
          />
        </div>
        <div className={styles.street}>
          <Label htmlFor="street">Straße</Label>
          <Input
            type="text"
            placeholder="Domagkstraße 12"
            name="street"
            id="street"
            onInput={e => onChange(e, 'street')}
            defaultValue={values.street}
          />
        </div>
      </div>
    </div>
  );
}
