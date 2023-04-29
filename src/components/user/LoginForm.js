import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Api from '../../api';
import { DispatchContext } from '../../App';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
`;

const Box = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  border: none;
  width: 100%;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #2980b9;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #3498db;
  border: 1px solid #3498db;

  &:hover {
    background-color: #3498db;
    color: white;
  }
`;
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
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
    }
  };

  return (
    <Container>
      <Box>
        <Heading>로그인</Heading>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>이메일 주소</Label>
            <Input
              type='email'
              autoComplete='on'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <ErrorMessage>이메일 형식이 올바르지 않습니다.</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type='password'
              autoComplete='on'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <ErrorMessage>비밀번호는 4글자 이상입니다.</ErrorMessage>
            )}
          </FormGroup>

          <Button type='submit' disabled={!isFormValid}>
            로그인
          </Button>

          <SecondaryButton type='button' onClick={() => navigate('/register')}>
            회원가입하기
          </SecondaryButton>
        </form>
      </Box>
    </Container>
  );
}

export default LoginForm;
