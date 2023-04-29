import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { UserStateContext, DispatchContext } from '../App';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3498db;
  padding: 1rem;
  font-size: 1rem;
`;

const NavItem = styled.div`
  display: inline-block;
`;

const NavLink = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #2980b9;
  }
`;

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;

  const logout = () => {
    sessionStorage.removeItem('userToken');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <Nav>
      <NavItem>
        <NavLink disabled onClick={() => navigate('/')}>
          안녕하세요, 포트폴리오 공유 서비스입니다.
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => navigate('/')}>나의 페이지</NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={() => navigate('/network')}>네트워크</NavLink>
      </NavItem>
      {isLogin && (
        <NavItem>
          <NavLink onClick={logout}>로그아웃</NavLink>
        </NavItem>
      )}
    </Nav>
  );
}

export default Header;
