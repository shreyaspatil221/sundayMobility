import { useState } from 'react';

const UseLoading = (props) => {
  const [isLoading, setLoading] = useState(props || { loading: false, backdrop: false });

  const updateLoader = (loadingObj) => {
    if (loadingObj === true || (loadingObj && loadingObj.loading)) {
      setLoading({ loading: true, backdrop: (loadingObj.backdrop || false) });
    } else {
      setLoading({ loading: false, backdrop: false });
    }
  };

  return [isLoading, updateLoader];
};

export default UseLoading;
