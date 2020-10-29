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
        <h2>Welcome! {user && user.name}</h2>
      </div>
      {user && (
        <div className="card">
          <img className="profile-img" src={user && user.avatar} alt="Avatar" />
        </div>
      )}
    </>
  );
};

export default Home;
