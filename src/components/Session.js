import React from 'react';
import PropTypes from 'prop-types';
import View from 'react-flux-state';
import firebase from 'firebase';
import { ClipLoader } from 'react-spinners';
import { Container } from 'reactstrap';
import { fetchUser } from '../modules/auth/auth-actions';
import { authStore, USER_EVENT } from '../modules/auth/auth-store';
import { withRouter } from 'react-router-dom';

/**
 * User Session component
 */
class Session extends View {
  constructor(props) {
    super(props);
    this.state = {
      firebaseAcquired: false,
    };
  }

  async componentDidMount() {
    const that = this;
    firebase.auth().onAuthStateChanged(async function(firebaseUser) {
      if (firebaseUser) {
        await fetchUser(firebaseUser.email);
      } else that.setState({ firebaseAcquired: true });
    });

    this.subscribe(authStore, USER_EVENT, (user) => {
      console.log('SESS:USER_EV', user);
      this.setState({ firebaseAcquired: true }, () => {
        /** @type UserModel */
        if (user.needsProfile) this.props.history.push('/edit-profile');
      });
    });
  }

  render() {
    const { firebaseAcquired } = this.state;

    if (firebaseAcquired === false)
      return (
        <Container
          fluid
          className="h-100 d-flex align-items-center d-flex justify-content-center bg-left">
          <ClipLoader sizeUnit={'px'} size={150} color={'#123abc'} loading={true} />
        </Container>
      );

    return this.props.children;
  }
}

Session.propTypes = {
  client: PropTypes.any,
  logOut: PropTypes.func,
  children: PropTypes.any,
};

export default withRouter(Session);
