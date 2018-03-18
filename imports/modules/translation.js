import i18n from 'meteor/universe:i18n';
import log from './logger';

export function setLanguage(lang = 'en', params) {
  i18n.setLocale(lang, params);
}

export function subscribe(fn) {
  i18n.onChangeLocale(fn);
}

export function unsubscribe(fn) {
  i18n.offChangeLocale (fn);
}

export function getLanguage() {
  const lang = i18n.getLocale();
  return lang;
}

export default function (component) {
  return function (feature, key) {
    return i18n.createTranslator(component)(feature, key);
  }
}