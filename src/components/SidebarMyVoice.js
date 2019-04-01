import React from 'react';
import Sidebar from 'react-sidebar';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import TopBar from './TopBar';
import { Link } from 'react-router-dom';
import icoMyVoice from '../assets/image/IcoMyVoice.png';
import { Icon } from 'react-icons-kit';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_keyboard_voice } from 'react-icons-kit/md/ic_keyboard_voice';
import { ic_person } from 'react-icons-kit/md/ic_person';
import { building } from 'react-icons-kit/fa/building';
import { ic_settings } from 'react-icons-kit/md/ic_settings';
import { ic_exit_to_app } from 'react-icons-kit/md/ic_exit_to_app';
import Advance from '../assets/image/advancement-fill.svg';
import Collaboration from '../assets/image/collaboration-fill.svg';
import Feedback from '../assets/image/feedback-and-reflection-fill.svg';
import Clear from '../assets/image/clear-and-unified-direction-fill.svg';
import Empowerment from '../assets/image/empowerment-fill.svg';
import Professional from '../assets/image/professional-engagement-fill.svg';
import Supporting from '../assets/image/supporting-belonging-and-caring-fill.svg';
import SenseOfBelonging from '../assets/image/belonging-fill.svg';
import Instructional from '../assets/image/instructional-autonomy-fill.svg';
// import Belonging  from '../assets/image/belonging-fill.svg'
import Resource from '../assets/image/resource-priorities-fill.svg';

const mql = window.matchMedia(`(min-width: 800px)`);

class SideBarMyVoiceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      sidebarTransition: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
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

  currentRoute = (route) => {
    return window.location.pathname === route;
  };

  render() {
    const { children, currentRoute } = this.props;
    const urls = [
      {
        href: '/home',
        name: 'Home',
        disabled: false,
        icon: <Icon className="mr-2" icon={ic_home} />,
      },
      {
        href: '/my-voice',
        name: 'MyVoice',
        disabled: false,
        icon: <Icon className="mr-2" icon={ic_keyboard_voice} />,
      },
      {
        href: '/my-school',
        name: 'My School',
        disabled: false,
        icon: <Icon className="mr-2" icon={building} />,
      },
      {
        href: '/my-profile',
        name: 'My Profile',
        disabled: false,
        icon: <Icon className="mr-2" icon={ic_person} />,
      },
      {
        href: '/settings',
        name: 'Settings',
        disabled: false,
        icon: <Icon className="mr-2" icon={ic_settings} />,
      },
      {
        href: '/login',
        name: 'Log Out',
        disabled: false,
        icon: <Icon className="mr-2" icon={ic_exit_to_app} />,
        renderfirst: true,
      },
    ];
    const myVoiceNavigation = [
      {
        href: '/clear-and-unified-direction',
        name: 'Clear & Unified Direction',
        disabled: false,
        icon: Clear,
        data: 3.2,
      },
      {
        href: '/professional-engagement',
        name: 'Professional Engagement',
        disabled: false,
        icon: Professional,
        data: 5,
      },
      {
        href: '/instructional-autonomy',
        name: 'Instructional Autonomy',
        disabled: false,
        icon: Instructional,
        data: 3.2,
      },
      {
        href: '/collaboration',
        name: 'Collaboration',
        disabled: false,
        icon: Collaboration,
        data: 4,
      },
      { href: '/empowerment', name: 'Empowerment', disabled: false, icon: Empowerment, data: 1.8 },
      {
        href: '/feedback-and-reflection',
        name: 'Feedback & Reflection',
        disabled: false,
        icon: Feedback,
        data: 1.25,
      },
      {
        href: '/resource-priorities',
        name: 'Resource Priorities',
        disabled: false,
        icon: Resource,
        data: 2,
      },
      {
        href: '/support-and-care',
        name: 'Support & Care',
        disabled: false,
        icon: Supporting,
        data: 3.875,
      },
      {
        href: '/sense-of-belonging',
        name: 'Sense of Belonging',
        disabled: false,
        icon: SenseOfBelonging,
        data: 3.8,
      },
      { href: '/advancement', name: 'Advancement', disabled: false, icon: Advance, data: 3.8 },
    ];

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
              {urls.map((url, index) => (
                <Link to={url.href} key={index}>
                  <ListGroupItem disabled={url.disabled} active={url.href === currentRoute}>
                    {url.icon} {url.name}
                  </ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          </React.Fragment>
        }
        open={this.state.sidebarOpen}
        sidebarClassName="bg-menu"
        transitions={false}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}>
        <TopBar title={'My Voice'} />

        <div className="sub-bar">
          <ListGroup>
            <Link to="/my-voice">
              <ListGroupItem className="justify-content-between sub-list-item font-weight-bold">
                Culture Drivers
              </ListGroupItem>
            </Link>
            {myVoiceNavigation.map((item, index) => {
              return (
                <Link key={index} to={item.href}>
                  <ListGroupItem
                    className="justify-content-between sub-list-item"
                    active={this.currentRoute(item.href)}>
                    <img src={item.icon} alt="icon" width={40} /> {item.name}{' '}
                    <Badge pill className="float-right mt-2">
                      {item.data}
                    </Badge>
                  </ListGroupItem>
                </Link>
              );
            })}
          </ListGroup>
        </div>
        {children}
      </Sidebar>
    );
  }
}

SideBarMyVoiceView.propTypes = {
  children: PropTypes.any.isRequired,
  currentRoute: PropTypes.any.isRequired,
};

export default SideBarMyVoiceView;
