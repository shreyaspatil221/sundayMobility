/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTranslation } from '../../../../i18n';

const listWrapper = css`
  width: 100%;
  display: flex;
  text-align: right;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 1rem 0 #0000001f;
  border-radius: 0.5rem;
`;

const overflow = css`
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem 0 #0000001f;
`;

const userCard = css`
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 1rem 0;
  border-bottom: 0.0375rem solid #d4d4d4;
  :last-child{ border-bottom: none;}
`;

const imageStyle = css`
  height: 2rem;
  width: 2rem;
`;

const faceBookImage = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 3rem;
  width: 3rem;
  box-shadow: 0 0 0.25rem 0 #0000001f;
`;

const registerBtn = css`
  color: rgb(95,171,178);
  background: white;
  margin: 1rem auto;
  font-size: 1rem;
  width: 50%;
`;

const greyBack = css`
  background: #619da0;
  color: #e2cec2;
`;

const List = ({ user, users, facebookData, goBacktoLogin, logout }) => {
  const { t } = useTranslation(['common']);
  return (
    <>
      {facebookData && (
        <div css={faceBookImage}>
          <img src={facebookData[0]?.url} alt="facebook profile" width="100%" height="100%" />
        </div>
      )}
      <h2>{t('accountList')}</h2>
      <div css={[listWrapper, greyBack]}>
        <div css={[userCard, greyBack]}>
          <div>{t('Logged In User')}</div>
          <div>{user?.name}</div>
        </div>
      </div>
      <button type="button" css={registerBtn} onClick={logout}>{t('Logout')}</button>
      <div css={overflow}>
        <div css={listWrapper}>
          {users?.map((user, i) => (
            <div key={i} css={userCard}>
              <div css={imageStyle}>
                <img src="/static/images/user.svg" alt="user" height="100%" width="100%" />
              </div>
              <div>
                <div>{user?.name}</div>
                <a href={`mailto: ${user?.email}`}>{user?.email}</a>
              </div>
            </div>
          ))}
          {facebookData?.length &&
            <div css={userCard}>
              <div css={imageStyle}>
                <img src="/static/images/facebook.svg" alt="facebook" height="100%" width="100%" />
              </div>
              <div>
                <div>{facebookData[0]?.name}</div>
                <a href={`mailto: ${facebookData[0]?.email}`}>{facebookData[0]?.email}</a>
              </div>
            </div>}
        </div>
      </div>
      <button type="button" css={registerBtn} onClick={goBacktoLogin}>{t('Back')}</button>
    </>
  )
}

List.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default List;
