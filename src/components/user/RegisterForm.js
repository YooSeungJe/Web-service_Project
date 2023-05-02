import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Api from '../../api';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ecf0f1;
`;

const FormWrapper = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width: 450px;
  max-width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const FormText = styled.small`
  display: block;
  color: #dc3545;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  user-select: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background-color: #3498db;
    color: white;

    &:hover {
      background-color: #2980b9;
      text-decoration: none;
    }
  `
      : `
    background-color: white;
    color: #333;

    &:hover {
      background-color: #e8e8e8;
      text-decoration: none;
    }
  `}
`;

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

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
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
    }
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor='registerEmail'>이메일 주소</Label>
          <Input
            id='registerEmail'
            type='email'
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isEmailValid && (
            <FormText>이메일 형식이 올바르지 않습니다.</FormText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor='registerPassword'>비밀번호</Label>
          <Input
            id='registerPassword'
            type='password'
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isPasswordValid && (
            <FormText>비밀번호는 4글자 이상으로 설정해 주세요.</FormText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor='registerConfirmPassword'>비밀번호 재확인</Label>
          <Input
            id='registerConfirmPassword'
            type='password'
            autoComplete='off'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!isPasswordSame && (
            <FormText>비밀번호가 일치하지 않습니다.</FormText>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor='registerName'>이름</Label>
          <Input
            id='registerName'
            type='text'
            autoComplete='off'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!isNameValid && (
            <FormText>이름은 2글자 이상으로 설정해 주세요.</FormText>
          )}
        </FormGroup>

        <FormGroup>
          <Button type='submit' variant='primary' disabled={!isFormValid}>
            회원가입
          </Button>
        </FormGroup>

        <FormGroup>
          <Button
            type='button'
            variant='light'
            onClick={() => navigate('/login')}
          >
            로그인하기
          </Button>
        </FormGroup>
      </FormWrapper>
    </Container>
  );
}

export default RegisterForm;
