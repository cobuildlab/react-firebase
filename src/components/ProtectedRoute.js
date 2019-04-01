import React from 'react';
import * as R from 'ramda';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { authStore, USER_EVENT } from '../modules/auth/auth-store';

const renderComponent = (props) => {
  const { render, children, component, ...rest } = props;

  let rendered = null;

  if (component) {
    rendered = React.createElement(component, { ...rest }, children);
  }

  if (render) {
    rendered = render({ ...rest, children });
  }

  if (typeof children === 'function') {
    rendered = children(rest);
  } else if (children) {
    rendered = children;
  } else if (!rendered) {
    throw new Error(
      'Error: must specify either a render prop, a render function as children, or a component prop.',
    );
  }

  return rendered;
};

class ProtectedRoute extends React.Component {
  renderRoute = () => {
    const user = authStore.getState(USER_EVENT);
    const { ...rest } = this.props;
    if (user) return renderComponent(rest);
    return <Redirect to={{ pathname: '/login', state: { from: rest.location } }} />;
  };

  render() {
    const props = R.omit(['component', 'render'], this.props);

    return <Route {...props} render={this.renderRoute} />;
  }
}

export default withRouter(ProtectedRoute);
