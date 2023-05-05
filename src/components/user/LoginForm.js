import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';

import './LoginForm.css';

import { DispatchContext, UserStateContext } from '../../App';

function LoginForm() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // validation
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    if (userState.user) {
      navigate('/', { replace: true });
      return;
    }
  }, [userState]);

  const validateEmail = (email) => {
    return (
      email === '' ||
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4 && password !== '';

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post('user/login', {
        email,
        password,
      });

      const user = res.data;
      const jwtToken = user.token;

      sessionStorage.setItem('userToken', jwtToken);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });

      navigate('/', { replace: true });
    } catch (err) {
      console.log('로그인에 실패하였습니다.\n', err);
      setError('존재하지 않는 아이디 혹은 비밀번호입니다');
    }
  };

  return (
    <div className='body'>
    <div className="container">
      <div className="left-box">
        <h2 className="left-head">Portfolio Sharing Service</h2>
        <h2 className="team">Team 10</h2>
      </div>
      <div className="right-box">
        <h2 className="right-head">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">✉️E-mail</label>
            <input
              type="email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
            />
            {!isEmailValid && emailTouched && (
              <p className="error-message">이메일 형식이 올바르지 않습니다.</p>
            )}
          </div>

          <div className="form-group">
            <label className="label">🗝️Password</label>
            <input
              type="password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />
            {!isPasswordValid && passwordTouched && (
              <p className="error-message">비밀번호는 4글자 이상입니다.</p>
            )}
            {error && <p className="error">{error}</p>}
          </div>

          <button className="in" type="submit" disabled={!isFormValid}>
            Sign In
          </button>

          <button
            className="up"
            type="button"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
