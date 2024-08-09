import React, { useEffect } from 'react';
import './Auth.css';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.signUp-link');
    const signInLink = document.querySelector('.signIn-link');

    const handleSignUpClick = () => {
      wrapper.classList.add('animate-signIn');
      wrapper.classList.remove('animate-signUp');
    };

    const handleSignInClick = () => {
      wrapper.classList.add('animate-signUp');
      wrapper.classList.remove('animate-signIn');
    };

    signUpLink.addEventListener('click', handleSignUpClick);
    signInLink.addEventListener('click', handleSignInClick);

    return () => {
      signUpLink.removeEventListener('click', handleSignUpClick);
      signInLink.removeEventListener('click', handleSignInClick);
    };
  }, []);

  return (
    <div className="container-login">
      <div className="wrapper">
        <div className="form-wrapper sign-up">
          <Signup />
        </div>

        <div className="form-wrapper sign-in">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Auth;
