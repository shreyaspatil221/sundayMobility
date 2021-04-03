/** @jsxImportSource @emotion/react */
// import { useContext } from 'react';
import { css } from '@emotion/react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useTranslation } from '../../../../i18n';
import Input from '../input';

const spaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  span {margin-left: 1ch;}
  button {font-size: 1rem;}
`;

const forgetBtn = css`
  color: rgb(95,171,178);
  background: white;
`;

const rememberCheck = css`
  display: flex;
  align-items: center;
  input {
    margin: 1rem 0 !important;
    height: 1rem !important; 
    width: 1rem; 
  }
`;

const registerBtn = css`
  color: rgb(95,171,178);
  background: white;
  margin: 1rem auto;
  font-size: 1rem;
  width: 60%;
`;

const loginBtn = css`
  color: white;
  background: rgb(95,171,178);
  font-size: 1rem;
  border-radius: 5rem;
  padding: 0.5rem 0;
  margin: 3rem 0 0 0;
`;

const Login = (props) => {
  const { t } = useTranslation(['common']);
  const {
    user, err, changeInput, forgetPassword, toggleAuth, faceBookLogin, onLogin
  } = props;
  return (
    <>
      <form onSubmit={onLogin}>
        <Input
          name="name"
          value={user?.name}
          onChange={changeInput}
          placeholder={t('username')}
          inputError={err?.nameErr}
        />
        <Input
          type="password"
          name="password"
          value={user?.password}
          onChange={changeInput}
          placeholder={t('password')}
          inputError={err?.passwordErr}
        />
        <div css={spaceBetween}>
          <div css={rememberCheck}>
            <input type="checkbox" name="remember" checked={user.remember} onChange={changeInput} />
            <span>{t('rememberMe')}</span>
          </div>
          <button type="button" onClick={forgetPassword} css={forgetBtn}>{t('forgetPassword')}</button>
        </div>
        <button type="submit" value="Submit" css={loginBtn}>{t('login')}</button>
      </form>
      <button type="button" css={registerBtn} onClick={toggleAuth}>{t('register')}</button>
      <FacebookLogin
        appId="774977839795707"
        fields="name,email,picture"
        callback={faceBookLogin}
        autoLoad={false}
        render={(renderProps) => (
          <button type="button" onClick={renderProps.onClick} css={registerBtn}>{t('loginFaceBook')}</button>
        )}
      />
    </>
  );
};

Login.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default Login;
