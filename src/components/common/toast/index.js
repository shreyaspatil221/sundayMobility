/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import { baseStyles } from '../../../../public/styles/variables';

const popupOnAnimate = (percent) => keyframes`
  0% { transform: ${`translate(-50%,${percent}%)`}; opacity: 0; }
  100% { transform: translate(-50%,0); opacity: 1; }
`;

const popupOffAnimate = (percent) => keyframes`
  0% { transform: translate(-50%,0); opacity: 1; }
  100% { transform: ${`translate(-50%,${percent}%)`}; opacity: 0;}
`;
const toastOn = css`
  animation: ${popupOnAnimate(100)} 0.3s ease-out;
  @media screen and (max-width: ${baseStyles.xl1_1}){
    animation: ${popupOnAnimate(-100)} 0.3s ease-out;
  }
`;

const toastOff = css`
  opacity: 0;
  animation: ${popupOffAnimate(100)} 0.3s ease-out;
  @media screen and (max-width: ${baseStyles.xl1_1}){
    animation: ${popupOffAnimate(-100)} 0.3s ease-out;
  }
`;
const toastType = {
  success: css`background: #d4edda; color: #155724;`,
  danger: css`background: #f8d7da; color: #721c24;`,
  error: css`background: #959595; color: #ffffff;`,
  warning: css`background: #fff3cd; color: #856404;`,
  info: css`background: #d1ecf1; color: #0c5460;`,
  light: css`background: #FFFFFF; color: #818182;`,
  dark: css`background: #7D7D7D; color: #ffffff;`,
  green: css`background: #489E42; color: #ffffff;`
};

const closeBtn = css`
  border: none;
  position: absolute;
  right: 0.0625rem;
  top: 0.0625rem;
  background: none;
  cursor: pointer;
`;

const none = css`display:none;`;

const display = {
  null: none,
  true: toastOn,
  false: toastOff
};

const Toast = ({
  type, children, visible, position, onClose, setVisible, timeout, customePositions = {}, width, style
}) => {
  const {
    topPx, bottomPx, rightPx, leftPx
  } = customePositions;

  const container = css`
    position: absolute;
    width: ${width || 50}%;
    @media screen and (min-width: 48rem) { width: 40%;top:20%;max-width: 31.25rem; }
    margin: 0 auto;
    background: #7D7D7D;
    padding: 1rem;
    font-size: 0.75rem;
    color: #FFFFFF;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
`;

  const top = css`
  top: ${topPx || '10%;'};
  left: ${leftPx || '50%'};
  transform:translate(-50%,0);
`;
  const topLeft = css`
  top: ${topPx || '10%'};
  left: ${leftPx || '1%'};
`;
  const topRight = css`
  top: ${topPx || '10%'};
  right: ${rightPx || '1%'};
`;
  const bottom = css`
  bottom: ${bottomPx || '10%;'};
  left: ${leftPx || '50%'};
  transform:translate(-50%,0);
`;
  const bottomLeft = css`
  bottom: ${bottomPx || '10%'};
  left: ${leftPx || '1%'};
`;
  const bottomRight = css`
  bottom: ${bottomPx || '10%'};
  right: ${rightPx || '1%'};
`;

  const allPositions = {
    top, bottom, topLeft, topRight, bottomLeft, bottomRight
  };
  const positionCSS = allPositions[position] ? allPositions[position] : bottom;
  const firstRender = useRef(true);
  const timer = useRef();
  const [showToast, setShowToast] = useState(null);

  useEffect(() => {
    if (!firstRender.current || visible) {
      if (visible === true) {
        setShowToast(true);
        if (timeout) {
          timer.current = setTimeout(() => {
            setVisible(false);
          }, timeout);
        }
      } else {
        clearTimeout(timer.current);
        setShowToast(false);
        setTimeout(() => {
          setShowToast(null);
        }, 500);
      }
    }
    firstRender.current && (firstRender.current = false);
  }, [visible]);

  return (
    <div data-testid="toast" css={[container, positionCSS, toastType[type], display[showToast], style]}>
      {onClose ? <button type="submit" css={closeBtn} onClick={onClose}> X </button> : null}
      {children}
    </div>
  );
};
export default Toast;
