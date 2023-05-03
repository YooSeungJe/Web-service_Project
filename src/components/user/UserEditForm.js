import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import * as Api from '../../api';
import { useNavigate, useHistory } from 'react-router-dom';

const FormText = styled.small`
  display: block;
  color: #dc3545;
  margin-top: 0.25rem;
`;

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`user/${user.id}`, {
      name,
      email,
      description,
      password,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const navigate = useNavigate();
  const handleWithdraw = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        // "users/유저id/withdraw" 엔드포인트로 DELETE 요청함.
        const res = await Api.delete(`user/${user.id}/withdraw`);
        console.log('check', res);
        alert(res.data.message);
        // 로그아웃 처리 등의 후속 처리를 할 수 있음.
        sessionStorage.clear();
        localStorage.removeItem('token');
        window.location.reload();
        navigate('/login', { replace: true });
      } catch (err) {
        console.error(err);
        alert(
          err.response?.data?.message || '탈퇴 과정에서 문제가 발생했습니다.'
        );
      }
    }
  };

  // 비밀번호를 변경하지 않거나 할 경우 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4 || !password;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;
  // 위 3개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isPasswordValid && isPasswordSame && isNameValid;
  return (
    <Card className='mb-2'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='useEditName' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='이름'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isNameValid && (
              <FormText>이름은 2글자 이상으로 설정해 주세요.</FormText>
            )}
          </Form.Group>

          <Form.Group controlId='userEditEmail' className='mb-3'>
            <Form.Control
              type='email'
              placeholder='이메일'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='userEditDescription' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='정보, 인사말'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='userEditPassword'>
            <Form.Control
              type='password'
              placeholder='비밀번호 변경'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <FormText>비밀번호는 4글자 이상으로 설정해 주세요.</FormText>
            )}
          </Form.Group>

          <Form.Group controlId='userEditConfirmPassword'>
            <Form.Control
              type='password'
              placeholder='비밀번호 재확인'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isPasswordSame && (
              <FormText>비밀번호가 일치하지 않습니다.</FormText>
            )}
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button
                variant='primary'
                type='submit'
                className='me-3'
                disabled={!isFormValid}
              >
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsEditing(false)}>
                취소
              </Button>
              <Button variant='danger' onClick={handleWithdraw}>
                탈퇴하기
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
