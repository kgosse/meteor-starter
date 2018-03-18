import React from 'react';
import { Session } from 'meteor/session';
import {setLanguage, getLanguage} from '../../../modules/translation';

function getClass(key) {
    return getLanguage() === key ? 'active' : '';
}

const Language = () => (
    <div className="tl-navbar-li">
        <span className={getClass('en')} onClick={() => setLanguage('en')}>EN</span> | <span onClick={() => setLanguage('fr')} className={getClass('fr')}>FR</span>
    </div>
);

Language.propTypes = {};

export default Language;
