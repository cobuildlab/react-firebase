import React from 'react';

const WhiteLink = ({ href, text }) => {
  return (
    <a className={'white'} href={href} target='_blank' rel='noopener noreferrer'>{text}</a>
  );
};

export default WhiteLink;