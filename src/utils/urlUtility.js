/* eslint-disable consistent-return */
import canUseDOM from 'can-use-dom';
import {
  trimLastChar, isLastChar, trimFirstChar, isFirstChar
} from './string';

export function getRootURL() {
  // eslint-disable-next-line no-useless-escape
  if (canUseDOM) { return window?.location?.href?.toString().replace(/^(.*\/\/[^\/?#]*).*$/, '$1'); }
}

export function redirectToURL(url = '') {
  if (canUseDOM) {
    window.location.href = url;
  }
}

export function printDocument() {
  if (canUseDOM) {
    window.print();
  }
}

export function redirectMenuLinks(url = '') {
  if (canUseDOM) {
    const isFullUrl = /^(http|https)?:\/\//i;
    if (isFullUrl.test(url)) {
      window.location.href = url;
    } else {
      window.location.href = getRootURL() + url;
    }
  }
}

export function getUrlParameterByName(paramName = '', url = '') {
  if (canUseDOM) {
    // eslint-disable-next-line no-param-reassign
    url = url || window.location.search;
    const searchParams = new URLSearchParams(url.split('?')[1]);
    return searchParams.get(paramName);
  }
  return null;
}

export function dropQueryStringFromPath(input = '') {
  return input.split('?')[0];
}

export const pipeAll = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export function maybeTrimLastChar(path = '') {
  return isLastChar(path, '/') ? trimLastChar(path, '/') : path;
}

export function maybeTrimFirstChar(path = '') {
  return isFirstChar(path, '/') ? trimFirstChar(path, '/') : path;
}

export function maybeTrimEdges(path = '') {
  const trimChars = pipeAll(maybeTrimFirstChar, maybeTrimLastChar);
  return trimChars(path);
}

export function getCurrentSubModule(pathname = undefined) {
  let currentPath = pathname || '';
  currentPath = maybeTrimEdges(currentPath);
  const moduleList = currentPath.split('/');
  return dropQueryStringFromPath(moduleList[moduleList.length - 1]) || '';
}

export function getQueryStringParameters(url) {
  if (canUseDOM) {
    let query = null;
    if (url) {
      if (url.split('?').length > 1) {
        // eslint-disable-next-line prefer-destructuring
        query = url.split('?')[1];
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      url = window.location.href;
      query = window.location.search.substring(1);
    }
    return query && (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        const [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {});
  }
}
