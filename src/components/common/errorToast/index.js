/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import Toast from '../toast';
import { basePath } from '../../../utils/app';
import { withTranslation } from '../../../../i18n';
import { baseStyles } from '../../../../public/styles/variables';

const cancel = css`
  background:transparent;
  background-repeat: no-repeat;
  width: 1.25rem;
  height: 1.25rem;
  background-size: contain;
  display: inline-block;
  text-align: center;
  background-image: url(${basePath.image}ic_close.svg);
  border: none;
  align-self: flex-start;
  cursor: pointer;
`;

const flexContainer = css`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  width:100%;
  position: relative;
`;

const style = css`
  position:fixed;
  background:#EB0000;
  color:#FFFFFF;
  width:90%;
  top:4.6875rem;
  bottom:unset;
  max-width:21.5rem;
  z-index:9;
  border-radius:0.625rem;
  padding: 1.25rem 0.625rem 1.25rem 1.25rem;
  font-size: 0.875rem;
  max-height: 9.375rem;
  @media screen and (min-width: ${baseStyles.xl1}) {
    width:90%;
    top: unset;
    bottom:1.875rem;
    max-width:21.5rem;
  }
`;

const size = css`
  min-height: 1.25rem;
  width: calc(100% - 1.25rem);
`;

const ErrorToast = ({
  errorMsg, translatedMessage, setErrorMsg, t, dynMsg
}) => {
  const errorMessage = errorMsg ? t([`error:${errorMsg}`, 'error:GENERIC_ERROR'], dynMsg != null ? { dynMsg } : null) : translatedMessage;
  const [message, setMessage] = useState(errorMessage);

  useEffect(() => {
    if (errorMessage) setMessage(errorMessage);
  }, [errorMessage]);

  return (
    <Toast visible={!!errorMessage} timeout={3000} setVisible={setErrorMsg} style={style}>
      <>
        <div css={flexContainer}>
          <span css={size}>{message}</span>
        </div>
        <button type="button" aria-label={t('close')} css={cancel} onClick={() => setErrorMsg('')} />
      </>
    </Toast>
  );
};

export default withTranslation(['error'])(ErrorToast);
