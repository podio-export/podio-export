/* eslint-env node */
'use strict';

var podioOAuth = {};

const checkAuthType = (authType) => /server|client|password/.test(authType);

function get(authType, callback) {
  if (checkAuthType(authType) && podioOAuth[authType]) {
    callback(podioOAuth[authType]);
  } else {
    callback();
  }
}

function set(newPodioOAuth, authType, callback) {
  if (checkAuthType(authType)) {
    podioOAuth[authType] = newPodioOAuth;
  }
  if (typeof callback === 'function') {
    callback();
  }
}

module.exports = {
  get,
  set
};
