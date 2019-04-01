import { Icon } from 'react-icons-kit';
import React from 'react';
import { radioUnchecked } from 'react-icons-kit/icomoon/radioUnchecked';
import { radioChecked } from 'react-icons-kit/icomoon/radioChecked';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const MarginIcon = styled(Icon)`
  margin-right: 3px;
`;

const ClickableIcon = styled(MarginIcon)`
  cursor: pointer;
`;

const Radio = ({ checked, onClick, clickable = true }) => {
  const Component = clickable ? ClickableIcon : MarginIcon;
  if (checked === false || checked === null || checked === undefined || checked === 'false')
    return <Component icon={radioUnchecked} onClick={onClick} />;
  return <Component icon={radioChecked} onClick={onClick} />;
};

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Radio;
