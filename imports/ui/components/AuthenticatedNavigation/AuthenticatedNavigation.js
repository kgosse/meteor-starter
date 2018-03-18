import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Language from '../Language/Language';
import translation from '../../../modules/translation';

const t = (key) => translation('Navigation')('authenticated', key);

const AuthenticatedNavigation = ({ name, history }) => (
  <div>
    <Nav>
      <LinkContainer to="/home">
        <NavItem eventKey={1} href="/home">
          {t('home')}
        </NavItem>
      </LinkContainer>
      <LinkContainer to="/search">
        <NavItem eventKey={1} href="/search">
          {t('search')}
        </NavItem>
      </LinkContainer>
      <LinkContainer to="/history">
        <NavItem eventKey={1} href="/history">
          {t('history')}
        </NavItem>
      </LinkContainer>
      <LinkContainer to="/favorites">
        <NavItem eventKey={1} href="/favorites">
          {t('favorites')}
        </NavItem>
      </LinkContainer>
    </Nav>
    <Nav className="tl-navbar" pullRight>
      <NavDropdown eventKey={2} title={name} id="user-nav-dropdown">
        <LinkContainer to="/profile">
          <NavItem eventKey={2.1} href="/profile">
            {t('profile')}
          </NavItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem eventKey={2.2} onClick={() => history.push('/logout')}>
          {t('logout')}
        </MenuItem>
      </NavDropdown>
      <Language></Language>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AuthenticatedNavigation);
