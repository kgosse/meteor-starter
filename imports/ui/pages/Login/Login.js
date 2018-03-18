import React from 'react';
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import { Button, notification } from 'antd/lib';
import translation from '../../../modules/translation';
import log from '../../../modules/logger';

import './Login.scss';

const tf = (key) => translation('Login')('fields', key);
const te = (key) => translation('Login')('errors', key);
const tn = (key) => translation('Login')('notifications', key);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleForm = (e) => {
    e.preventDefault();
    const component = this;

    validate(component.form).destroy();

    const validator = validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: te('email:required'),
          email: te('email'),
        },
        password: {
          required: te('password'),
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
 
    validator.form() && component.handleSubmit();
  }

  handleSubmit = () => {
    Meteor.loginWithPassword(this.emailAddress.value, this.password.value, (error) => {
      if (error) {
        log.error('Login.handleSubmit', error, Meteor.userId());
        notification.error({
          message: tn('error'),
          description: tn('error:description') 
        });
      } else {
        notification.success({
          message: tn('success'),
        });
      }
    })
  }

  render() {
    return (
      <div className="login">
        <Row className="center">
          <Col xs={12} sm={6} md={5} lg={4}>
            <h4 className="page-header center">{tf('title')}</h4>
            {/* <Row>
              <Col xs={12}>
                <OAuthLoginButtons
                  services={['facebook', 'github', 'google']}
                  emailMessage={{
                    offset: 100,
                    text: 'Log In with an Email Address',
                  }}
                />
              </Col>
            </Row> */}
            <form ref={form => (this.form = form)} onSubmit={this.handleForm}>
              <FormGroup>
                <ControlLabel>{tf('email')}</ControlLabel>
                <input
                  type="email"
                  name="emailAddress"
                  ref={emailAddress => (this.emailAddress = emailAddress)}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel className="clearfix">
                  <span className="pull-left">{tf('password')}</span>
                  <Link className="pull-right" to="/recover-password">{tf('password:forgotten')}</Link>
                </ControlLabel>
                <input
                  type="password"
                  name="password"
                  ref={password => (this.password = password)}
                  className="form-control"
                />
              </FormGroup>
              <Button type="primary" htmlType="submit">{tf('submit')}</Button>
              <AccountPageFooter>
                <p>{tf('anaccount?')} <Link to="/signup">{tf('signup')}</Link>.</p>
              </AccountPageFooter>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
