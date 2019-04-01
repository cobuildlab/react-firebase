import React from 'react';
import PropTypes from 'prop-types';

const DriverText = ({ children }) => {
  return <span className={'normal-text'}>{children}</span>;
};

DriverText.propTypes = {
  children: PropTypes.any.isRequired,
};

export default DriverText;
