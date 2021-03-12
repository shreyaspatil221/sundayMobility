/* eslint-disable no-underscore-dangle */
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
const isBrowser = typeof window !== 'undefined';

export const getRPOSVersionData = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'versionCode'
  })
);
export const launchBrowser = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'launchBrowser'
  })
);
export const launchcustombrowser = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'launchcustombrowser'
  })
);
export const call = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'call'
  })
);
export const close = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'close'
  })
);
export const invite = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'invite'
  })
);
export const share = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'share'
  })
);
export const jwt = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'jwt'
  })
);
export const webAppReady = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'webAppReady'
  })
);
export const getNativeConfirmation = isBrowser && window?.btoa(
  JSON.stringify({
    type: 'feature_enable_native_confirmation'
  })
);

export const callDialer = (mobileNo) => isBrowser && window?.btoa(
  JSON.stringify({
    type: 'makeCall',
    value: mobileNo
  })
);

export const nativeRposCall = (data) => {
  try {
    if (window?.android?.ExternalJioPOSAndroid?.getClientData) {
      return window?.android?.ExternalJioPOSAndroid?.getClientData(data);
    }
    if (window?.ExternalJioPOSAndroid?.getClientData) {
      return window?.ExternalJioPOSAndroid?.getClientData(data);
    }
    return window?.webkit?.messageHandlers?.callback?.postMessage(data);
  } catch { }
  return false;
};
export const nativeMyjioCall = (data) => {
  try {
    if (window?.android?.__externalCall) {
      return window.android.__externalCall(data);
    }
    if (window?.__externalCall) {
      return window?.__externalCall(data);
    }
    return window?.webkit?.messageHandlers?.callback?.postMessage(data);
  } catch { }
  return false;
};

export const rechargeConfirmationRequest = (payload) => isBrowser && window?.btoa(
  JSON.stringify({
    amount: payload?.amount,
    mobileNumber: payload?.mobileNumber,
    referenceNumber: payload?.referenceNumber,
    transactionId: payload?.transactionId,
    paymentMode: payload?.paymentMode,
    status: payload?.status
  })
);

export const setRechargeConfirmation = (data) => {
  try {
    if (window?.android?.ExternalJioPOSAndroid?.setRechargeConfirmationData) {
      window.android.ExternalJioPOSAndroid.setRechargeConfirmationData(data);
    } else if (window?.ExternalJioPOSAndroid?.setRechargeConfirmationData) {
      window.ExternalJioPOSAndroid.setRechargeConfirmationData(data);
    }
  } catch { }
};
