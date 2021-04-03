/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// import { useTranslation } from '../../../../i18n';

const invalid = css`
  color: red;
  font-size: 0.75rem;
  text-align: left;
  padding-left: 0.5rem;
`;

const inputStyle = (inputError) => css`
  input {
    margin: 1rem 0;
    border: none;
    /* border-bottom: 0.0625rem solid #d4d4d4; */
    border-bottom: ${inputError ? '0.0625rem solid red' : '0.0625rem solid #d4d4d4'};
    display: flex;
    height: 2rem;
    padding: 0 0 0 0.5rem;
    font-size: 1rem;
    width: 100%;
  }
`;

const Input = (props) => {
  const {
    type = 'text', name = '', value = '',
    onChange, placeholder, inputError = '',
    maxlength = 20
  } = props;
  return (
    <div css={inputStyle(inputError)}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxlength}
      />
      {inputError && (
        <div css={invalid}>
          {inputError}
        </div>
      )}
    </div>
  );
};

Input.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default Input;
