import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserStateContext, DispatchContext } from '../App';
import './Header.css';

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
    <nav>
      {isLogin && (
        <div className='bar'>
          <a className='my'>
            <button className='mybtn' onClick={() => navigate('/')}>
              My page
            </button>
          </a>
          <a className='network'>
            <button className='netbtn' onClick={() => navigate('/network')}>
              Network
            </button>
          </a>
          <a className='out'>
            <button className='outbtn' onClick={logout}>
              Log out
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Header;
