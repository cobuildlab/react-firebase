import React from 'react';
import Sidebar from 'react-sidebar';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import TopBar from './TopBar';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_keyboard_voice } from 'react-icons-kit/md/ic_keyboard_voice';
import { building } from 'react-icons-kit/fa/building';
import { ic_person } from 'react-icons-kit/md/ic_person';
import { ic_settings } from 'react-icons-kit/md/ic_settings';
import { ic_exit_to_app } from 'react-icons-kit/md/ic_exit_to_app';
import icoMyVoice from '../assets/image/IcoMyVoice.png';
import { logOutAction } from '../modules/auth/auth-actions';
import { authStore, LOGOUT_EVENT, UPDATE_USER_EVENT, USER_EVENT } from '../modules/auth/auth-store';
import { PropTypes } from 'prop-types';
import View from 'react-flux-state';

const mql = window.matchMedia(`(min-width: 800px)`);
const urls = [
  {
    href: '/home',
    name: 'Home',
    disabled: false,
    icon: <Icon className="mr-2" icon={ic_home} />,
    renderfirst: true,
  },
  {
    href: '/my-voice',
    name: 'MyVoice',
    disabled: false,
    icon: <Icon className="mr-2" icon={ic_keyboard_voice} />,
    renderfirst: true,
  },
  {
    href: '/my-school',
    name: 'My School',
    disabled: false,
    icon: <Icon className="mr-2" icon={building} />,
    renderfirst: true,
  },
  {
    href: '/my-profile',
    name: 'My Profile',
    disabled: false,
    icon: <Icon className="mr-2" icon={ic_person} />,
    renderfirst: true,
  },
  {
    href: null,
    name: 'Settings',
    disabled: false,
    icon: <Icon className="mr-2" icon={ic_settings} />,
    renderfirst: false,
  },
  {
    href: null,
    name: 'Log Out',
    disabled: false,
    icon: <Icon className="mr-2" icon={ic_exit_to_app} />,
    renderfirst: true,
  },
];

class NavigationBar extends View {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      sidebarTransition: false,
      user: authStore.getState(USER_EVENT),
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    this.subscribe(authStore, LOGOUT_EVENT, () => {
      this.props.history.push('/home');
    });
    this.subscribe(authStore, USER_EVENT, (user) => {
      this.setState({ user });
    });
    this.subscribe(authStore, UPDATE_USER_EVENT, (user) => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  onLogout = (e) => {
    logOutAction();
  };

  render() {
    const { children, currentRoute } = this.props;
    const { user } = this.state;
    let menuUrls = urls;
    if (user && user.needsProfile) {
      menuUrls = urls.filter((url) => url.name === 'My Profile');
    }
    const currentUrl = urls.find((url) => url.href === currentRoute);

    return (
      <Sidebar
        sidebar={
          <React.Fragment>
            <div className="title-menu mb-0 pb-0">
              <img className="flex-d sidebar-logo" src={icoMyVoice} alt="MyVoice" />
            </div>
            <ListGroup flush>
              <div className="p-3 text-light">
                <h5 className="m-0 ml-4">Kadem Elementary</h5>
              </div>
              {menuUrls.map((url, index) => {
                return url.href === null ? (
                  <Button
                    key={index}
                    active={false}
                    className="list-group-item mr-2"
                    onClick={this.onLogout}>
                    {url.icon} {url.name}
                  </Button>
                ) : (
                  url.renderfirst && (
                    <Link to={url.href} key={index}>
                      <ListGroupItem disabled={url.disabled} active={url.href === currentRoute}>
                        {url.icon} {url.name}
                      </ListGroupItem>
                    </Link>
                  )
                );
              })}
            </ListGroup>
          </React.Fragment>
        }
        open={this.state.sidebarOpen}
        sidebarClassName="bg-menu"
        transitions={true}
        defaultSidebarWidth={267}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}>
        <TopBar title={currentUrl.name} />
        {children}
      </Sidebar>
    );
  }
}

NavigationBar.propTypes = {
  history: PropTypes.object,
};

export default NavigationBar;
