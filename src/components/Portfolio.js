import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { UserStateContext } from '../App';
import * as Api from '../api';
import User from './user/User';
import Comments from './comment/Comments';
import EducationList from './education/EducationList';
import ProjectList from './project/ProjectList';
import AwardList from './award/AwardList';
import CertificateList from './certificate/CertificateList';
import FloatingIcon from './chat/FloatingIcon';

import './Portfolio.scss';

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await Api.get('chats');
        setChatList(response.data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    fetchChats();
  }, []);

  const fetchPortfolioOwner = async (ownerId) => {
    try {
      const res = await Api.get('users', ownerId);
      const ownerData = res.data;
      setPortfolioOwner(ownerData);
      setIsFetchCompleted(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('로그인한 유저만 사용할 수 있는 서비스입니다.');
        navigate('/');
      } else {
        alert('오류가 발생했습니다.');
      }
      throw error;
    }
  };

  useEffect(() => {
    if (!userState.user) {
      navigate('/login', { replace: true });
      return;
    }

    if (params.userId) {
      const ownerId = params.userId;
      fetchPortfolioOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchPortfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <div id='portfolio'>
      <Container fluid>
        <Row>
          <Col md='3' lg='3'>
            <User
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
            <Comments portfolioOwnerId={portfolioOwner.id} />
          </Col>
          <Col>
            <div style={{ textAlign: 'center' }}>
              <EducationList
                className='list'
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <ProjectList
                className='list'
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <CertificateList
                className='list'
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <AwardList
                className='list'
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <FloatingIcon
                receiverId={portfolioOwner.id}
                isMyPortfolio={portfolioOwner.id === userState.user?.id}
                chatList={chatList}
                userId={userState.user?.id}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Portfolio;
