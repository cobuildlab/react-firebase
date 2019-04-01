import React from 'react';
import PropTypes from 'prop-types';

const H2Blue = ({ children }) => {
  return <h2 className="indicator">{children}</h2>;
};

H2Blue.propTypes = {
  children: PropTypes.any.isRequired,
};

export default H2Blue;
