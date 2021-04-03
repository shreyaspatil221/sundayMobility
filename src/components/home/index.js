/* eslint-disable no-nested-ternary */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import useLoading from '../../hooks/useLoading';
import { useTranslation } from '../../../i18n';
import ErrorToast from '../common/errorToast';
import Loader from '../common/loader';
import List from '../common/list';
import Login from '../common/login';
import Register from '../common/register';
import { APP_REGEX } from '../../utils/app-rules';

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
  min-height: 100%;
  img {
    object-fit: cover; 
    height:100%; width: 100%;
  }
  @media screen and (max-width: 59.375rem){
    display: none;
  }
`;

const userSection = css`
  display: flex;
  flex: 1 1 40%;
  justify-content: center;
  color: rgb(64,64,64);
  padding: 0 5%;
  height: 100vh;
`;

const loginWrapper = css`
  width: 90%;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
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

const loadingInitial = true;

const initialUser = {
  name: '',
  mobile: '',
  email: '',
  password: '',
  remember: false
};

const initialErr = {
  nameErr: '',
  mobileErr: '',
  emailErr: '',
  passwordErr: ''
};

const Dashboard = () => {
  const { t } = useTranslation(['common']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useLoading(loadingInitial);
  const [user, setUser] = useState(initialUser);
  const [err, setErr] = useState(initialErr);
  const [users, setUsers] = useState([]);
  const [facebookData, setFaceBookData] = useState(null);
  const [loginSection, setLoginSection] = useState(true);
  const [showList, setShowList] = useState(false);
  const [type, setType] = useState('error');

  const getUser = async () => {
    setIsLoading(true);
    const usrs = JSON.parse(localStorage.getItem('users'));
    const rememberedUser = usrs?.filter((usr) => usr.remember);
    rememberedUser && setUser(rememberedUser);
    if (rememberedUser?.length) {
      setLoginSection(false); setShowList(true);
    }
    setUsers(usrs);
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
    return () => { };
  }, []);

  useEffect(() => {
    loginSection && getUser();
    return () => { };
  }, [loginSection]);

  const forgetPassword = () => { };

  const toggleList = () => {
    setShowList((prevState) => !prevState);
  };

  const faceBookLogin = async (response) => {
    const { name, email } = response;
    const { picture: { data: { url } } } = response;
    setFaceBookData([name, email, url]);
    localStorage.setItem('facebookUser', JSON.stringify([{ name, email, url }]));
  };

  const getfaceBookDataFromLocal = () => {
    const getfaceBookData = localStorage.getItem('facebookUser');
    setFaceBookData(JSON.parse(getfaceBookData));
  };

  useEffect(() => {
    getfaceBookDataFromLocal();
    return () => { };
  }, []);

  const toggleAuth = () => {
    setUser(initialUser);
    setErr(initialErr);
    setType('error');
    setLoginSection((prevState) => !prevState);
  };

  const goBacktoLogin = () => {
    setUser(initialUser);
    setLoginSection(true);
    setShowList(false);
  };

  const validateName = () => {
    if (!user?.name) {
      setErr((prevState) => ({ ...prevState, nameErr: t('enterUsername') }));
      return false;
    } if (user?.name?.length < 2) {
      setErr((prevState) => ({ ...prevState, nameErr: t('enterValidUser') }));
      return false;
    }
    setErr((prevState) => ({ ...prevState, nameErr: '' }));
    return true;
  };

  const validateMobile = () => {
    if (!user?.mobile) {
      setErr((prevState) => ({ ...prevState, mobileErr: t('enterMobile') }));
      return false;
    } if (user?.mobile.length < 10) {
      setErr((prevState) => ({ ...prevState, mobileErr: t('enterValidMobile') }));
      return false;
    }
    setErr((prevState) => ({ ...prevState, mobileErr: '' }));
    return true;
  };

  const validateEmail = () => {
    if (!user?.email) {
      setErr((prevState) => ({ ...prevState, emailErr: t('enterEmail') }));
      return false;
    } if (!APP_REGEX.EMAIL.test(user?.email)) {
      setErr((prevState) => ({ ...prevState, emailErr: t('enterValidEmail') }));
      return false;
    }
    setErr((prevState) => ({ ...prevState, emailErr: '' }));
    return true;
  };

  const validatePassword = () => {
    if (!user?.password) {
      setErr((prevState) => ({ ...prevState, passwordErr: t('enterPassword') }));
      return false;
    } if (!APP_REGEX.PASSWORD.test(user?.password)) {
      setErr((prevState) => ({ ...prevState, passwordErr: t('enterValidPassword') }));
      return false;
    }
    setErr((prevState) => ({ ...prevState, passwordErr: '' }));
    return true;
  };

  const validateLogin = () => {
    const isValidName = validateName();
    const isValidPassword = validatePassword();
    if (isValidName && isValidPassword) {
      return true;
    } return false;
  };

  const validateRegister = () => {
    const isValidName = validateName();
    const isValidMobile = validateMobile();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    if (isValidName && isValidMobile && isValidEmail && isValidPassword) {
      return true;
    } return false;
  };

  const onRegister = (e) => {
    e.preventDefault();
    if (validateRegister()) {
      const usrs = JSON.parse(localStorage.getItem('users'));
      const clone = usrs?.length ? [...usrs] : [];
      clone.push(user);
      localStorage.setItem('users', JSON.stringify(clone));
      setUser(initialUser);
      setType('message');
      setError('USER_REGISTERED');
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      const loginCheck = users?.some(
        (u) => (u.name === user.name
        && u.password === user.password)
      );
      if (loginCheck) {
        setLoginSection((prevState) => !prevState);
        const usrs = JSON.parse(localStorage.getItem('users'));
        const rememberedUser = usrs?.map(
          (u) => {
            if (u.name === user.name && u.password === user.password) {
              u.remember = user.remember;
              return u;
            }
            u.remember = false;
            return u;
          }
        );
        localStorage.setItem('users', JSON.stringify(rememberedUser));
        toggleList();
      } else {
        setError('USER_NOT_FOUND');
      }
    }
  };

  const changeInput = (e) => {
    const target = e?.target;
    const value = target.type === 'checkbox' ? !!target?.checked : target.value;
    const name = target?.name;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const logout = () => {
    const usrs = JSON.parse(localStorage.getItem('users'));
    const forgetUser = usrs?.map(
      (u) => {
        if (u.remember) {
          u.remember = !u.remember;
          return u;
        } return u;
      }
    );
    localStorage.setItem('users', JSON.stringify(forgetUser));
    setLoginSection(true); setShowList(false);
  };

  const loginProps = {
    user, err, changeInput, forgetPassword, toggleAuth, faceBookLogin, onLogin
  };

  const registerProps = {
    user, err, changeInput, toggleAuth, onRegister
  };

  return (
    <>
      <Loader
        loading={isLoading.loading}
        backdrop={isLoading.loading}
      />
      <ErrorToast
        errorMsg={error}
        setErrorMsg={() => setError('')}
        width={80}
        type={type}
      />
      <NextSeo
        title={t('login')}
        description={t('loginPageTxt')}
      />
      <div css={container}>
        <div css={wrapper}>
          <div css={heroImage}>
            <img
              src="/static/images/beach.jpg"
              alt="hero"
              height="100%"
              width="100%"
              loading="lazy"
            />
          </div>
          <div css={userSection}>
            <div css={loginWrapper}>
              <div css={headerLabel}>
                {loginSection && !showList
                  && <h1>{t('welcomeBack')}</h1>}
                {loginSection && !showList
                  && <h2>{t('loginToAccount')}</h2>}
                {!loginSection && !showList
                  && <h1>{t('registerAccount')}</h1>}
                {!loginSection && showList
                  && <h1>{t('Logged In')}</h1>}
              </div>
              {loginSection && !showList
                && <Login {...loginProps} />}
              {!loginSection && !showList
                && <Register {...registerProps} />}
              {!loginSection && showList
                && (
                  <List
                    user={user}
                    users={users}
                    facebookData={facebookData}
                    goBacktoLogin={goBacktoLogin}
                    logout={logout}
                  />
                )}
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

export default Dashboard;
