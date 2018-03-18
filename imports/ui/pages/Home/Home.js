import React from 'react';
// import { Button } from 'react-bootstrap';
import { Button, notification } from 'antd/lib'
import translation from '../../../modules/translation';

const t = translation('Home');

import './Home.scss';

const Home = () => (
  <div className="home well">
    <h1 className="title">TubeLeads</h1>
    <div className="content">
        <p style={{marginBottom: '20px'}}>
          {t("paragraphs", "first")}
        </p>
        <p style={{marginBottom: '20px'}}>
          {t("paragraphs", "second")}
        </p>
        <p>
          {t("paragraphs", "third")}
        </p>
      </div>
    <div className="button">
      <Button href="/search">
          {t("button", "text")}
      </Button>
    </div>
  </div>
);

export default Home