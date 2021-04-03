import { useState, createContext } from 'react';

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

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [err, setErr] = useState(initialErr);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [facebookData, setFaceBookData] = useState(null);
  return (
    <UserContext.Provider value={
      [
        {
          user,
          setUser,
          err,
          setErr,
          error,
          setError,
          users,
          setUsers,
          facebookData,
          setFaceBookData
        }
      ]
    }
    >
      {children}
    </UserContext.Provider>
  );
};
