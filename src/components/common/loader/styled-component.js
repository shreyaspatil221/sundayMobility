import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const load8 = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export default styled('div')`
  ::after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  font-size: 0.625rem;
  position: fixed;
  z-index: 99999;
  width: 6.25em;
  height: 6.25em;
  top: 50%;
  left: 50%;
  margin-top: -3.125em;
  margin-left: -3.125em;
  border-radius: 50%;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 0.8em solid #888888;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${load8} 1.1s infinite linear;
  animation: ${load8} 1.1s infinite linear;
`;
