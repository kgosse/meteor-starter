import React from 'react';
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Button, notification } from 'antd/lib'
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import InputHint from '../../components/InputHint/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';
import translation from '../../../modules/translation';
import log from '../../../modules/logger';
import './Signup.scss'

const tf = (key) => translation('Signup')('fields', key);
const te = (key) => translation('Signup')('errors', key);
const tn = (key) => translation('Signup')('notifications', key);

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleForm = (e) => {
    e.preventDefault();
    const component = this;

    validate(component.form).destroy();

    const validator = validate(component.form, {
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
        confirm: {
          required: true,
          minlength: 6,
          equalTo: "#password"
        },
      },
      messages: {
        firstName: {
          required: te('firstname'),
        },
        lastName: {
          required: te('lastname'),
        },
        emailAddress: {
          required: te('email:required'),
          email: te('email'),
        },
        password: {
          required: te('password'),
          minlength: te('password:minlength'),
        },
        confirm: {
          required: te('confirm'),
          minlength: te('confirm:minlength'),
          equalTo: te('confirm:equalto')
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
 
    validator.form() && component.handleSubmit();
  }

  handleSubmit = () => {
    const { history } = this.props;

    Accounts.createUser({
      email: this.emailAddress.value,
      password: this.password.value,
      profile: {
        name: {
          first: this.firstName.value,
          last: this.lastName.value,
        },
      },
    }, (error) => {
      if (error) {
        log.error('SingUp.handleSubmit', error, Meteor.userId());
        notification.error({
          message: tn('error'),
          description: tn('error:description')
          // description: error.reason
        });
      } else {
        // Meteor.call('users.sendVerificationEmail');
        notification.success({
          message: tn('success'),
        });
        // history.push('/');
      }
    });
  }

  render() {
    return (
      <div className="signup">
        <Row className="center">
          <Col xs={12} sm={6} md={5} lg={4}>
            <h4 className="page-header center">{tf('title')}</h4>
            <form ref={form => (this.form = form)} onSubmit={this.handleForm}>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>{tf('firstname')}</ControlLabel>
                    <input
                      type="text"
                      name="firstName"
                      ref={firstName => (this.firstName = firstName)}
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <ControlLabel>{tf('lastname')}</ControlLabel>
                    <input
                      type="text"
                      name="lastName"
                      ref={lastName => (this.lastName = lastName)}
                      className="form-control"
                    />
                  </FormGroup>
                </Col>
              </Row>
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
                <ControlLabel>{tf('password')}</ControlLabel>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={password => (this.password = password)}
                  className="form-control"
                />
                <InputHint>{tf('hint')}</InputHint>
              </FormGroup>
              <FormGroup>
                <ControlLabel>{tf('confirm')}</ControlLabel>
                <input
                  type="password"
                  name="confirm"
                  ref={password => (this.confirm = password)}
                  className="form-control"
                />
              </FormGroup>
              <Button type="primary" htmlType="submit">{tf('submit')}</Button>
              <AccountPageFooter>
                <p>{tf('anaccount?')} <Link to="/login">{tf('login')}</Link>.</p>
              </AccountPageFooter>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
