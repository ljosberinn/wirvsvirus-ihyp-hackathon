import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Button } from 'rbx';
import React from 'react';

import styles from './Step.module.scss';

function Step({ active, title, completed, index, onClick, isForm }) {
  const TitleTag = isForm && active ? 'legend' : 'p';

  return (
    <div
      className={classnames(
        'step-item',
        active && 'is-active',
        completed && 'is-completed',
      )}
      onClick={onClick}
    >
      <div className="step-marker">{index}</div>
      <div className="step-details">
        <TitleTag className="step-title">{title}</TitleTag>
      </div>
    </div>
  );
}

Step.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  isForm: PropTypes.bool,
};

function StepsContainer({ children, steps, actions }) {
  return (
    <div className="steps">
      {steps}
      <div className="steps-content">{children}</div>
      <Button.Group
        className={classnames('steps-actions', styles.actionContainer)}
      >
        {actions}
      </Button.Group>
    </div>
  );
}

StepsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  steps: PropTypes.arrayOf(PropTypes.node).isRequired,
  actions: PropTypes.node.isRequired,
};

const Steps = Object.assign(Step, { Container: StepsContainer });

export default Steps;
