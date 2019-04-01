import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const PrimaryButton = ({ text, onClick, width = 100 }) => {
  return (
    <Button
      style={{ width: `${width}px` }}
      className="btn btn-primary primary-button"
      onClick={onClick}>
      {text}
    </Button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
};

export default PrimaryButton;
