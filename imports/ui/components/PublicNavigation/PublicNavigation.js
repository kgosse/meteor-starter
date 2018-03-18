import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import Language from '../Language/Language';
import translation from '../../../modules/translation';

const t = (key) => translation('Navigation')('public', key);

const PublicNavigation = () => (
  <Nav className="tl-navbar" pullRight>
    <LinkContainer to="/signup">
      <NavItem eventKey={1} href="/signup">
        {t('signup')}
      </NavItem>
    </LinkContainer>
    <LinkContainer to="/login">
      <NavItem eventKey={2} href="/login">
        {t('login')}
      </NavItem>
    </LinkContainer>
    <Language></Language>
  </Nav>
);

export default PublicNavigation;
