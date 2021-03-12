/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { basePath, isOlderBrowser } from '../../../utils/app';
import IELoader from './styled-component';

const preloader = css`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  transition: opacity 0.3s linear;
  width: 100%;
  z-index: 500;
`;
const bgWhite = css`background: white;`;
const hideBackdrop = css`
  background: black;
  opacity: 0.3;
`;
const imgCss = css`
  width: 6.25em;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -3.125em;
  margin-left: -3.125em;
  z-index: 999;
  -webkit-animation: spin 1s infinite linear;
  @-webkit-keyframes spin {
      0%   {-webkit-transform: rotate(0deg)}
      100% {-webkit-transform: rotate(360deg)}
  }
`;

const Loader = ({ loading = false, backdrop = false }) => (
  <>
    {loading ? (
      <>
        {isOlderBrowser() ? <IELoader /> : (
          <>
            <img css={imgCss} src={`${basePath.image}loading-process.svg`} alt="loading" />
            <div css={[preloader, backdrop ? bgWhite : hideBackdrop]} />
          </>
        )}

      </>
    ) : null}
  </>
);

export default Loader;

