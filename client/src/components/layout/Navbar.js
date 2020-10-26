import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
    </div>
  );
};

export default Navbar;

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Sample Web App',
  icon: 'fab fa-react',
};
