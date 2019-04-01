import React from 'react';
import { Container, Row, Col, Form, Label, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ContentLogo from '../../components/ContentLogo';
import { PropTypes } from 'prop-types';
import { onChangeInputMixin, onErrorMixin } from '../../shared/mixins';
import * as R from 'ramda';
import { LoginModel } from './auth-models';
import View from 'react-flux-state';
import { loginAction } from './auth-actions';
import { authStore, LOGIN_ERROR_EVENT, LOGIN_EVENT } from './auth-store';
import { ClipLoader } from 'react-spinners';

/**
 * The Login View
 */
class LoginView extends View {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: R.clone(LoginModel),
    };
    this.onChange = onChangeInputMixin.bind(this);
    this.onError = onErrorMixin.bind(this);
  }

  componentDidMount() {
    this.subscribe(authStore, LOGIN_ERROR_EVENT, this.onError);
    this.subscribe(authStore, LOGIN_EVENT, (state) => {
      this.props.history.push('/home');
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    loginAction(R.clone(this.state.data));
  };

  render() {
    const { loading, data } = this.state;
    const { email, password /* rememberMe */ } = data;
    return (
      <Container fluid>
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={12} className="mx-auto my-auto pt-3">
            <h1 className="text-center text-login">Welcome!</h1>
            <h4 className="text-center font-weight-light mb-5 text-login">
              Please Login to your account
            </h4>
            <Col xs={12} md={6} className="mx-auto">
              <Form className="vertical-align m-10">
                <div className="group">
                  <input
                    className="input"
                    onChange={this.onChange}
                    name="email"
                    value={email}
                    type="text"
                    required
                  />
                  <span className="highlight" />
                  <span className="bar" />
                  <label>Email</label>
                </div>

                <div className="group">
                  <input
                    className="input"
                    onChange={this.onChange}
                    name="password"
                    value={password}
                    type="password"
                    required
                  />
                  <span className="highlight" />
                  <span className="bar" />
                  <Label>Password</Label>
                </div>
                <div className="d-flex pb-4">
                  {loading ? (
                    <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading={loading} />
                  ) : (
                      <Button
                        className="ml-4 btn btn-primary mx-auto pl-4 pr-4"
                        onClick={this.onSubmit}>
                        Login
                    </Button>
                    )}
                </div>
              </Form>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

LoginView.propTypes = {
  history: PropTypes.object,
};

export default LoginView;
