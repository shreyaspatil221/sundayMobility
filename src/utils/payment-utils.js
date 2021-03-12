import React, { useEffect } from 'react';
import { redirectToURL } from './urlUtility';

const PaymentUtil = (props) => {
  const { payObject: { paymentURL = null, post = null } = {} } = props;

  useEffect(() => {
    if (post) {
      if (document.getElementById('jioPayment')) {
        document.getElementById('jioPayment').submit();
      }
    } else {
      redirectToURL(paymentURL);
    }
  }, []);

  return post ? <div dangerouslySetInnerHTML={{ __html: paymentURL }} /> : null;
};

export default PaymentUtil;
