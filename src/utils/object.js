function objClone(clone, obj) {
  const keys = Object.keys(obj);
  try {
    for (let i = 0; i < keys.length; i += 1) {
      clone[i] = (typeof obj[i] === 'object' && obj[i] != null) ? this.objClone(obj[i].constructor(), obj[i])
        : obj[i];
    }
  } catch (e) {
    //
  }
  return clone;
}

export function getNewObjectCopy(ogObj) {
  const clone = {};
  return objClone(clone, ogObj);
}

export const removeNullPropsFromObj = (obj) => {
  Object.keys(obj).length && Object.keys(obj).forEach((key) => {
    !obj[key] && delete obj[key];
  });
  return obj;
};

export const getNextQueryParams = (baseURL, queryParams = {}) => {
  let hash = {};
  let responseURL = baseURL;
  let queryString = '';
  if (queryParams.pathVars) {
    const hash = { ...queryParams.pathVars };
    Object.keys(hash).forEach((keyName) => {
      responseURL = baseURL.replace(new RegExp(`{${keyName}}`, 'g'), (hash[keyName] || ''));
    });
    return baseURL;
  }
  if (queryParams.querystring) {
    hash = { ...queryParams.querystring || {} };
    Object.keys(hash).forEach((keyName) => {
      queryString += `&${keyName}=${hash[keyName]}`;
    });
    const containsQuery = baseURL.indexOf('?') > 0;

    if (!containsQuery) {
      queryString = (queryString || '').substring(1);
      responseURL = `${baseURL}?`;
    }
    return `${responseURL}${queryString}`;
  }
  return '';
};

export const createURLParamsbyObject = (obj) => {
  const queryParams = removeNullPropsFromObj(obj);
  const query = Object.keys(queryParams).map((key) => `${key}=${queryParams[key]}`).join('&');
  return query.length ? `?${query}` : '';
};
