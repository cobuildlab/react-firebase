import React from 'react';
import {
  Row,
  Col,
  } from 'reactstrap';
import logo from '../assets/image/logo.png';

const openKademWeb = () => window.open('https://www.kademeducation.com/');

const ContentLogo = () => {
    return(
      <Row className="h-100">
        <Col xs={12} md={9} className="mx-auto my-auto">
          <div className='logo-container'>
            <img
              className='img-fluid logo pb-4'
              src={logo}
              alt='placeholder'
            />
            <h3 className='logo-text'>Log-In and be part of Your Schools Process of<br /><strong>Improving From Within</strong></h3>
            <a href='' onClick={openKademWeb} className='logo-link'>www.KademEducation.com</a>
          </div>
        </Col>
      </Row>

)}

export default ContentLogo;
