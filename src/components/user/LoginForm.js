import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Api from '../../api';


import './LoginForm.css'


import { DispatchContext, UserStateContext } from '../../App';


const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color : #FEFAE0;
  margin-top:-70px;
  
`;

const LeftBox = styled.div`
  background-color: #02343F;
  padding: 2rem;
  border-radius: 7px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  width: 500px;
  
  margin-top:100px;
  box-sizing:content-box;
  height:550px;
  
  
  
`;


const RightBox = styled.div`
  background-color: #E9EDC9 ;
  padding: 2rem;
  border-radius: 7px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 370px;
  margin-top:100px;
  box-sizing:content-box;
  height:550px;
  
`;


const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  
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
  color: #FE6244;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  
  margin-top:30px;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 5px;
  border: none;
  width: 100%;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #A4D0A4;
  }
`;

const SecondaryButton = styled(Button)`
  
  color: #02343F;
  margin-top:9px;
  
  &:hover {
    background-color: #F0EDCC;
    
  }
`;
function LoginForm() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

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
      <LeftBox>
        <Heading className='left-head'>Portfolio Sharing Service</Heading>
        <Heading className='team'>Team 10</Heading>
      </LeftBox>
      <RightBox>
        <Heading className='right-head'>Sign in</Heading>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>✉️E-mail</Label>
            <Input
              
              type='email'
              autoComplete='on'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
            />
            {!isEmailValid && emailTouched && (
              <ErrorMessage>이메일 형식이 올바르지 않습니다.</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>🗝️Password</Label>
            <Input
              type='password'
              autoComplete='on'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />
            {!isPasswordValid && passwordTouched && (
              <ErrorMessage>비밀번호는 4글자 이상입니다.</ErrorMessage>
            )}
          </FormGroup>

          <Button className='in' type='submit' disabled={!isFormValid}>
            Sign In
          </Button>

          <SecondaryButton className='up' type='button' onClick={() => navigate('/register')}>
            Sign Up
          </SecondaryButton>
        </form>
      </RightBox>
      
      
    </Container>


    
  );
}

export default LoginForm;
