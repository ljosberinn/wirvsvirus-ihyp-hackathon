import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

function Step({ active, title, completed, index, onClick }) {
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
        <p className="step-title">{title}</p>
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
};

function StepsContainer({ children, steps, actions }) {
  return (
    <div className="steps">
      {steps}
      <div className="steps-content">{children}</div>
      <div className="steps-actions">{actions}</div>
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
