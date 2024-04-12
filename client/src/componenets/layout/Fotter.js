// Footer component

import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' style={{ background: '#f5b82e' }}>
      <h4 className='text-center'> All Right Reserved &copy; Abhishek Sharma </h4>
      <p className='text-center mt-3'>
        <Link to='/about' className="footer-link"> About</Link>|
        <Link to='/contact' className="footer-link"> Contact</Link>|
        <Link to='/policy' className="footer-link"> Privacy and Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
