import React from 'react';
import PropTypes from 'prop-types';

const DriverIcon = ({ icon }) => {
  return <img src={icon} alt="icon" width="70%" />;
};

DriverIcon.propTypes = {
  icon: PropTypes.any.isRequired,
};

export default DriverIcon;
