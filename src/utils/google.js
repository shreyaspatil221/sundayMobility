/* eslint-disable camelcase */
import { APP_CONSTANTS } from '../constants/app.constants';
import { validateResponse } from '../network/fetch';

export const getLocationFromLatLng = async (location) => {
  const { lat, lng } = location;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${APP_CONSTANTS.googleAPIKey}`;
  return fetch(url)
    .then(validateResponse)
    .then((resp) => resp?.data?.results[0]?.formatted_address);
};

const transformPincodeResponseData = (results) => {
  const resp = results[0] && results[0].address_components;
  const cityResp = resp.find(
    (loc) => loc.types.includes('locality')
  ) || resp.find((loc) => loc.types.includes('administrative_area_level_2'));
  const stateResp = resp.find(
    (loc) => loc.types.includes('administrative_area_level_1')
  );
  return {
    state: stateResp && stateResp.long_name ? stateResp.long_name : '',
    city: cityResp && cityResp.long_name ? cityResp.long_name : ''
  };
};

export const getStateCityFromPincode = (pincode) => {
  const geocoder = new window.google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: pincode, region: 'in' }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        reject(status);
      } else {
        resolve(transformPincodeResponseData(results));
      }
    });
  });
};

const reverseGeoCode = (latitude, longitude) => {
  const lat = latitude;
  const lng = longitude;
  const latlng = new window.google.maps.LatLng(lat, lng);
  const geocoder = new window.google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        reject(status);
      } else {
        resolve({ data: results, lat, lng });
      }
    });
  });
};

export const getZipCodeFromGeoData = (address) => {
  const { data = [] } = address;
  const { address_components = {} } = data[0];
  const filteredComponent = address_components.filter(
    (addressComponent) => addressComponent.types.indexOf('postal_code') >= 0
  )[0];
  return filteredComponent ? filteredComponent.long_name : '';
};

export const getAddressFromGeoData = (address) => {
  const { data = [] } = address;
  const { formatted_address = '' } = data[0];
  return formatted_address;
};

export const getStateFromGeoData = (address) => {
  const { data = [] } = address;
  const { address_components = {} } = data[0];
  const filteredComponent = address_components.filter(
    (addressComponent) => addressComponent.types.indexOf('administrative_area_level_1') >= 0
  )[0];
  return filteredComponent ? filteredComponent.long_name : '';
};

export const getCityFromGeoData = (address) => {
  const { data = [] } = address;
  const { address_components = {} } = data[0];
  const filteredComponent = address_components.filter(
    (addressComponent) => addressComponent.types.indexOf('administrative_area_level_2') >= 0
  )[0];
  return filteredComponent ? filteredComponent.long_name : '';
};

export const getAddressComponentFromLatLong = async (latitude, longitude) => {
  try {
    const address = await reverseGeoCode(latitude, longitude);
    return {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      pincode: getZipCodeFromGeoData(address)
    };
  } catch (e) {
    return {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      pincode: ''
    };
  }
};
