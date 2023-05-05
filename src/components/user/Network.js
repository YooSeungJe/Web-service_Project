import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';
import styles from './UserCard.module.css';

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!userState.user) {
      navigate('/login');
      return;
    }

    Api.get('userlist').then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <div className='back'>
      <Container fluid>
        <Row xs='auto' className='jusify-content-center'>
          {users.map((user) => (
            <div className={styles.cardWrapper}>
              <UserCard key={user.id} user={user} isNetwork currentUser={userState.user} />
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Network;
