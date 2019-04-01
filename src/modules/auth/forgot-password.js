import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ContentLogo from '../../components/ContentLogo';
import firebase from 'firebase';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { email } = this.state;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((send) => window.alert('Please check your email.'))
      .catch((err) => window.alert(err));
  };

  render() {
    return (
      <Container fluid>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={6} className="bg-left p-0">
            <ContentLogo />
          </Col>
          <Col xs={6} md={6} className="m-auto">
            <h2 className="text-center font-weight-light mt-5 mb-5 text-login">
              Enter you Email and we will send <br /> you a password reset link
            </h2>
            <Col xs={12} md={6} className="mx-auto my-auto pt-3">
              <Form className="vertical-align m-10">
                <div className="group">
                  <input
                    className="input"
                    name="email"
                    type="Email"
                    required
                    onChange={this.onChange}
                  />
                  <span className="highlight" />
                  <span className="bar" />
                  <label>Email</label>
                </div>
              </Form>
              <div className="text-center pb-4">
                <Button
                  className="btn btn-primary text-center"
                  color="primary"
                  size="md"
                  onClick={this.onSubmit}>
                  Send request
                </Button>
              </div>
              <div className="text-center pb-4">
                <Link to="/login">Already have an account? Log in.</Link>
              </div>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ForgotPassword;
