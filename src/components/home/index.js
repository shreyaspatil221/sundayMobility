/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import useLoading from '../../hooks/useLoading';
import { useTranslation } from '../../../i18n';
import { zomato } from '../service';
import ErrorToast from '../common/errorToast';
import Loader from '../common/loader';

const container = css`
  padding: 0;
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const wrapper = css`
  padding: 1rem;
  background: #fafafa80;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 2rem);
  font-size: 3rem;
`;

const Dashboard = () => {
  const { t } = useTranslation(['common']);
  const [error, setError] = useState('');
  const [, setResults] = useState({});
  const [isLoading, setIsLoading] = useLoading(false);

  const getCities = async () => {
    setIsLoading(true);
    try {
      const resp = await zomato({ city: 'Mu', count: '5' });
      setResults(resp);
    } catch (err) {
      setError(err.message || 'GENERIC_ERROR');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCities();
    return () => {};
  }, []);

  return (
    <>
      <Loader loading={isLoading.loading} backdrop={isLoading.loading} />
      <ErrorToast errorMsg={error} setErrorMsg={() => setError('')} width={80} />
      <NextSeo
        title={t('home')}
        description={t('homeDesc')}
      />
      <div css={container}>
        <div css={wrapper}>
          {t('home')}
        </div>
      </div>
    </>
  );
};

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default Dashboard;
