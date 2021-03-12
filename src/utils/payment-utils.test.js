import React from 'react';
import { render, wait } from '@testing-library/react';
import PaymentUtil from './payment-utils';

const paymentHTML = "<div data-testid='container'><div>Hello world</div></div>";
const paymentUrlLink = 'https://www.jio.com';

test('post:true render test', async () => {
  const { getByTestId } = render(<PaymentUtil payObject={{ paymentURL: paymentHTML, post: true }} />);
  await wait(() => {
    getByTestId('container');
  });
  expect(getByTestId('container')).toContainHTML('<div>Hello world</div>');
});

test('post:false render test', async () => {
  const { container } = render(<PaymentUtil payObject={{ paymentURL: paymentUrlLink, post: false }} />);
  await wait(() => {
    expect(container.innerHTML).toBeFalsy();
  });
});
