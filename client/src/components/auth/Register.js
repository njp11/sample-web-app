import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [picture, setPicture] = useState([]);

  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    if (error === 'Please include a valid email') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    if (e.target.name === 'email') {
      setUser({ ...user, email: e.target.value.toLowerCase() });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (!picture.length) {
      setAlert('Please choose profile image', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      let data = new FormData();
      data.append('image', picture[0], picture[0].name);
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      register(data);
    }
  };

  const onDrop = (pic) => {
    setPicture(pic);
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Signup</span>
      </h1>
      <form onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="8"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="8"
          />
        </div>
        <div className="form-group">
          <ImageUploader
            withIcon={true}
            withPreview={true}
            buttonText="Choose image"
            onChange={onDrop}
            imgExtension={['.jpg', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
          />
        </div>
        <input
          type="submit"
          value="Create"
          className="btn btn-success btn-block"
        />
      </form>
      <hr
        style={{
          margin: '10px',
          border: 'none',
          borderBottom: '1px solid grey',
        }}
      />
      <div className="or-container">
        <p className="or">Already have an account?</p>
      </div>
      <Link to="/login">
        <button className="btn btn-primary btn-block">Login</button>
      </Link>
    </div>
  );
};

export default Register;
