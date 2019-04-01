import React from 'react';
import Stepper from 'react-stepper-horizontal';
import PropTypes from 'prop-types';

const StepperElement = ({ title = 'Lorem', steps = {}, active = '1', index, onClick }) => {
  const calculateStepsFrom = (steps) => {
    return []
      .constructor(steps)
      .fill(null)
      .map((step, index) => {
        return {
          title: (index + 1).toString(),
        };
      });
  };

  return (
    <React.Fragment>
      <h4 className="blue-text">{title}</h4>
      <Stepper
        activeColor="#5096FF"
        completeColor="#002a40"
        circleFontSize={0}
        size={22}
        titleFontSize={10}
        steps={calculateStepsFrom(steps)}
        activeStep={active}
      />
      {/* <div className="text-center">
          <Button color="link" className="mr-2" onClick={() => onClick('back', index)}>Back</Button>
          <Button color="link" className="ml-2" onClick={() => onClick('next', index)}>Next</Button>
        </div> */}
    </React.Fragment>
  );
};

StepperElement.propTypes = {
  title: PropTypes.string,
  steps: PropTypes.any,
  active: PropTypes.string,
  index: PropTypes.any,
  onClick: PropTypes.func,
};

export default StepperElement;
