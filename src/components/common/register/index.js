/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from '../../../../i18n';
import Input from '../input';
import { APP_REGEX } from '../../../utils/app-rules';

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

const Resigter = (props) => {
  const { t } = useTranslation(['common']);
  const {
    user, err, changeInput, toggleAuth, onRegister
  } = props;
  const mobileChange = (e) => {
    const { value } = e.target;
    if (APP_REGEX.NUMBER.test(value)) { changeInput(e); }
  };
  return (
    <>
      <form onSubmit={onRegister}>
        <Input
          name="name"
          value={user?.name}
          onChange={changeInput}
          placeholder={t('username')}
          inputError={err?.nameErr}
        />
        <Input
          name="mobile"
          value={user?.mobile}
          onChange={mobileChange}
          placeholder={t('mobile')}
          inputError={err?.mobileErr}
          maxlength={10}
        />
        <Input
          name="email"
          value={user?.email}
          onChange={changeInput}
          placeholder={t('Email')}
          inputError={err?.emailErr}
          maxlength={30}
        />
        <Input
          type="password"
          name="password"
          value={user?.password}
          onChange={changeInput}
          placeholder={t('password')}
          inputError={err?.passwordErr}
        />
        <button type="submit" value="Submit" css={loginBtn}>{t('register')}</button>
      </form>
      <button type="button" css={registerBtn} onClick={toggleAuth}>{t('login')}</button>
    </>
  );
};

Resigter.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default Resigter;
