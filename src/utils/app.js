import canUseDOM from 'can-use-dom';
import getConfig from 'next/config';
import config from '../config';
import { getRootURL } from './urlUtility';

const { publicRuntimeConfig } = getConfig();

export function isDevMode() {
  return (config.env.indexOf('DEV') >= 0);
}

export const basePathURL = process.env.NODE_ENV === 'production' ? publicRuntimeConfig.basePath : '';

const prefix = process.env.NODE_ENV === 'production' ? publicRuntimeConfig.basePath : '';

export const basePath = {
  image: `${prefix}/static/images/`,
  font: `${prefix}/static/fonts/`,
  locale: `${prefix}/static/locales/`
};

export const isOlderBrowser = () => {
  const sUsrAg = canUseDOM && navigator.userAgent;
  return (canUseDOM && ((~sUsrAg.indexOf('Firefox')) || (~sUsrAg.indexOf('Trident')) || (~sUsrAg.indexOf('Edg'))));
};

export const isIE = () => {
  const sUsrAg = canUseDOM && navigator.userAgent;
  return (canUseDOM && (~sUsrAg.indexOf('Trident')));
};

export const isIEorEdge = () => canUseDOM && (document.documentMode || /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent));

export const envBaseURL = {
  PROD_ENV: 'https://www.jio.com',
  SIT_ENV: 'https://sit.webselfcare.jio.com',
  PP_ENV: 'https://selfcare.jiolabs.com',
  DEV_ENV: 'https://sit.webselfcare.jio.com'
};
export const canonicalBaseURL = () => (canUseDOM ? getRootURL() : envBaseURL[config.env]);

// export const publicRuntimeConfig = {
//   awsBaseAssetPath: 'https://jep-asset.akamaized.net/jiocom/static/images/'
// };

export const getMobileOperatingSystem = () => {
  const isBrowser = typeof window !== 'undefined';
  const value = '';
  if (isBrowser) {
    const userAgent = navigator?.userAgent || navigator?.vendor || window.opera;
    let type = '';
    if (/android/i.test(userAgent)) {
      type = 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      type = 'iOS';
    }
    return type;
  }
  return value;
};
