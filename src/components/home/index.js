/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import useLoading from '../../hooks/useLoading';
import { useTranslation } from '../../../i18n';
// import { zomato } from '../service';
import ErrorToast from '../common/errorToast';
import Loader from '../common/loader';

const container = css`
  padding: 0;
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  font-family: lato;
`;

const wrapper = css`
  padding: 0;
  background: white;
  display: flex;
  font-size: 1rem;
`;

const heroImage = css`
  display: flex;
  flex: 1 1 60%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  img {
    object-fit: cover; 
    height:100%; width: 100%;
  }
  @media screen and (max-width: 950px){
    display: none;
  }
`;

const userSection = css`
  display: flex;
  flex: 1 1 40%;
  justify-content: center;
  color: rgb(64,64,64);
  padding: 0 5%;
  min-height: 100vh;
`;

const loginWrapper = css`
  width: 75%;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    input {
      margin: 1rem 0;
      border: none;
      border-bottom: 1px solid #d4d4d4;
      display: flex;
      height: 2rem;
      padding: 0 0 0 0.5rem;
      font-size: 1rem;
    }
    input[type="checkbox"]::before {
      background: white;
    }
    input[type="checkbox"]:checked::after {
      background: rgb(95,171,178);
    }
    /* input ::-webkit-input-placeholder 
    ::-moz-placeholder
    :-ms-input-placeholder
    :-moz-placeholder {
      font-size: 0.5rem;
    } */
  }
`;

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

const loginBtn = css`
  color: white;
  background: rgb(95,171,178);
  font-size: 1rem;
  border-radius: 5rem;
  padding: 0.5rem 0;
  margin: 3rem 0 0 0;
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

const headerLabel = css`
  margin: 0 0 3rem 0;
  h1 {font-size: 2rem; font-weight: 800; margin: 0};
  h2 {font-size: 1.2rem; font-weight: 400; margin: 0}
`;

const tnc = css`
  font-size: 1rem;
  position: fixed;
  bottom: 1rem;
`;

const registerBtn = css`
  color: rgb(95,171,178);
  background: white;
  margin: 1rem auto;
  font-size: 1rem;
  width: 50%;
`;

const loadingInitial = true;
const initialUser = {
  name: '',
  mobile: '',
  email: '',
  password: '',
  remember: false
};

const listWrapper = css`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 16px 0px #0000001f;
  border-radius: 0.5rem;
`;

const userCard = css`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 1rem 0;
  border-bottom: 0.0375rem solid #d4d4d4;
  :last-child{ border-bottom: none;}
`;

const Dashboard = () => {
  const { t } = useTranslation(['common']);
  const [error, setError] = useState('');
  // const [, setResults] = useState({});
  const [isLoading, setIsLoading] = useLoading(loadingInitial);
  const [user, setUser] = useState(initialUser);
  const [users, setUsers] = useState([]);
  const [loginSection, setLoginSection] = useState('login');
  const [showList, setShowList] = useState(false);

  const getUser = async () => {
    setIsLoading(true);
    const usrs = localStorage.getItem('users');
    setUsers(JSON.parse(usrs));
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
    return () => {};
  }, []);

  useEffect(() => {
    loginSection && getUser();
    return () => {};
  }, [loginSection]);

  const changeInput = (e) => {
    const target = e?.target;
    const value = target.type === 'checkbox' ? !!target?.checked : target.value;
    const name = target?.name;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const forgetPassword = () => {};

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const onLogin = (e) => {
    e.preventDefault();
    const loginCheck = users?.some(
      (u) => (u.name === user.name
        && u.password === user.password)
    );
    if (loginCheck) {
      setLoginSection(null);
      toggleList();
    } else {
      setError('USER_NOT_FOUND');
    }
  };

  const onRegister = (e) => {
    e.preventDefault();
    const usrs = JSON.parse(localStorage.getItem('users'));
    const clone = usrs?.length ? [...usrs] : [];
    clone.push(user);
    localStorage.setItem('users', JSON.stringify(clone));
    setUser(initialUser);
  };

  const toggleAuth = () => {
    setUser(initialUser);
    setLoginSection((prevState) => (prevState === 'login' ? 'register' : 'login'));
  };

  const userSelection = (data) => {
    console.log('userSelection', data);
  };

  return (
    <>
      <Loader loading={isLoading.loading} backdrop={isLoading.loading} />
      <ErrorToast errorMsg={error} setErrorMsg={() => setError('')} width={80} />
      <NextSeo
        title={t('login')}
        description={t('loginPageTxt')}
      />
      <div css={container}>
        <div css={wrapper}>
          <div css={heroImage}>
            <img src="/static/images/hero.webp" alt="hero" height="100%" width="100%" />
          </div>
          <div css={userSection}>
            <div css={loginWrapper}>
              <div css={headerLabel}>
                <h1>{loginSection === 'login' ? t('welcomeBack') : t('registerAccount')}</h1>
                {loginSection === 'login' ? <h2>{t('loginToAccount')}</h2> : null}
              </div>
              {loginSection === 'login' && (
                <>
                  <form onSubmit={onLogin}>
                    <input type="text" name="name" value={user?.name} onChange={changeInput} placeholder={t('username')} />
                    <input type="password" name="password" value={user?.password} onChange={changeInput} placeholder={t('password')} />
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
                </>
              ) }
              {loginSection === 'register' && (
                <>
                  <form onSubmit={onRegister}>
                    <input type="text" name="name" value={user?.name} onChange={changeInput} placeholder={t('username')} />
                    <input type="text" name="mobile" value={user?.mobile} onChange={changeInput} placeholder={t('mobile')} />
                    <input type="text" name="email" value={user?.email} onChange={changeInput} placeholder={t('Email')} />
                    <input type="password" name="password" value={user?.password} onChange={changeInput} placeholder={t('password')} />
                    <button type="submit" value="Submit" css={loginBtn}>{t('register')}</button>
                  </form>
                  <button type="button" css={registerBtn} onClick={toggleAuth}>{t('login')}</button>
                </>
              )}
              {!loginSection && showList
                ? (
                  <>
                  <h2>{t('accountList')}</h2>
                  <div css={listWrapper}>
                    { users?.map((user) => (
                      <div key={user.mobile} css={userCard}>
                        <div>{user?.name}</div>
                        <a href={`mailto: ${user?.email}`}>{user?.email}</a>
                      </div>
                    ))}
                  </div>
                  <button type="button" css={registerBtn} onClick={toggleAuth}>{t('Back')}</button>
                    </>
                ) : null}
            </div>
            <div css={tnc}>{t('tncLabel')}</div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

// export async function getServerSideProps() {
//   const res = await localStorage.getItem('users');
//   let data = [];
//   if (res) {
//     data = await JSON.parse(res);
//   }
//   return {
//     props: { users: data }
//   };
// }

export default Dashboard;
