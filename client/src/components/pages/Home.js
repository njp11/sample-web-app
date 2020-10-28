import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="welcome">
        <h2>Welcome back!</h2>
      </div>
      <div className="card">
        <div className="card-container">
          <h2>
            <b>{user && user.name}</b>
          </h2>
        </div>
        <img src={user && user.avatar} alt="Avatar" />
      </div>
    </>
  );
};

export default Home;
