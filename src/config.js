const constants = Object.freeze({
  WEB_PLATFORM: 'web',
  WEBVIEW_PLATFORM: 'web-view',
  LOG_LEVELS: {
    debug: 1,
    verbose: 2,
    info: 3,
    warn: 4,
    error: 5,
    critical: 6
  },
  SUBMIT_NUMBER: 'SUBMIT_NUMBER',
  PROD_ENV: 'PROD_ENV',
  DEV_ENV: 'DEV_ENV',
  SIT_ENV: 'SIT_ENV',
  PP_ENV: 'PP_ENV',
  QA_ENV: 'QA_ENV',
  LOAD_ENV: 'LOAD_ENV'
});

function deriveEnv() {
  switch (process.env.NODE_ENV) {
  case 'development':
    return constants.DEV_ENV;
  case 'production':
    return constants.PROD_ENV;
  case 'sit':
    return constants.SIT_ENV;
  case 'pp':
    return constants.PP_ENV;
  case 'qa':
    return constants.QA_ENV;
  default: return '';
  }
}

export default {
  env: deriveEnv(),
  mode: process.env.MODE
};
