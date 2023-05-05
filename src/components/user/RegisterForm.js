import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api';
import './RegisterForm.css'


function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState('');
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState('');
  //useState로 name 상태를 생성함.
  const [name, setName] = useState('');
  const [중복, 중복변경] = useState(null);
  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email === '' || email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post('user/register', {
        email,
        password,
        name,
      });

      // 로그인 페이지로 이동함.
      navigate('/login');
    } catch (err) {
      console.log('회원가입에 실패하였습니다.', err);
      중복변경('중복된 아이디 혹은 비밀번호입니다');
    }
  };

  return (
    <div className='body'>
      <div className='container'>
        <form className='form-wrapper' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='labeling' htmlFor='registerEmail'>이메일 주소</label>
            <input
              className='input'
              id='registerEmail'
              type='email'
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <p className='설명'>이메일 형식이 올바르지 않습니다.</p>
            )}
          </div>

          <div className='form-group'>
            <label className='labeling' htmlFor='registerPassword'>비밀번호</label>
            <input
              className='input'
              id='registerPassword'
              type='password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <p className='설명'>비밀번호는 4글자 이상으로 설정해 주세요.</p>
            )}
          </div>

          <div className='form-group'>
            <label className='labeling' htmlFor='registerConfirmPassword'>비밀번호 재확인</label>
            <input
              className='input'
              id='registerConfirmPassword'
              type='password'
              autoComplete='off'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isPasswordSame && (
              <p className='설명'>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <div className='form-group'>
            <label className='labeling' htmlFor='registerName'>이름</label>
            <input
              className='input'
              id='registerName'
              type='text'
              autoComplete='off'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isNameValid && (
              <p className='설명'>이름은 2글자 이상으로 설정해 주세요.</p>
            )}
            {중복 && <p className="중복">{중복}</p>}
          </div>

          <div className='form-group'>
            <button className='회원' type='submit' variant='primary' disabled={!isFormValid}>
              회원가입
            </button>
          </div>

          <div className='form-group'>
            <button
              className='로그인'
              type='button'
              variant='light'
              onClick={() => navigate('/login')}
            >
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
