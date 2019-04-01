import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Icon } from 'react-icons-kit';
import { ic_notifications } from 'react-icons-kit/md/ic_notifications';
import PropTypes from 'prop-types';
import { authStore, USER_EVENT } from '../modules/auth/auth-store';

const TopBar = ({ title = 'View Name' }) => {
  const user = authStore.getState(USER_EVENT);
  const name = `${user.firstName} ${user.lastName}`;
  return (
    <Navbar color="white" light expand="md" className="nav">
      <NavbarBrand className="text-login" href="#">
        {title}
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem className="divider-nav">
          <NavLink href="/my-profile">
            <Icon className="mr-2 item-notification" size={28} icon={ic_notifications} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="mr-2 ml-2 item-name-user">
            {name}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="p-0">
            <div className="item-profile" />
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopBar;
