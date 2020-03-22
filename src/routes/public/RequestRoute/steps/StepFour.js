import classnames from 'classnames';
import { Textarea } from 'rbx';
import React from 'react';

import styles from '../RequestPage.module.scss';

export default function StepFour({ values, onChange }) {
  return (
    <div className={classnames(styles.step, styles.stepOne)}>
      <div className={styles.stepTitle}>Was können wir für dich tun?</div>
      <div className={styles.stepContent}>
        <Textarea onChange={e => onChange(e, 'comment')}></Textarea>
      </div>
    </div>
  );
}
