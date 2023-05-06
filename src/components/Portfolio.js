import React, { useContext, useState, useEffect, useRef } from 'react';
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
import Sidebar from './side/Sidebar';

import './Portfolio.scss';

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPortfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);
  const [chatList, setChatList] = useState([]);
  const [ showButton, setShowButton ] = useState(true);
  const scrollElement = useRef([]);

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
      // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
      const res = await Api.get('users', ownerId);
      // 사용자 정보는 response의 data임.
      const ownerData = res.data;
      // portfolioOwner을 해당 사용자 정보로 세팅함.
      setPortfolioOwner(ownerData);
      // fetchPortfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
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
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate('/login', { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPortfolioOwner 함수를 실행함.
      fetchPortfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPortfolioOwner 함수를 실행함.
      fetchPortfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return <div className='loading'>loading...</div>;
  }
  return (
    <div id='portfolio'>
      <Sidebar scrollElement={scrollElement} showButton={showButton} />
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
            <div className='list' style={{ textAlign: 'center' }}>
              <div className='modelList' ref={el => (scrollElement.current[1] = el)}>
                <EducationList
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </div>
              <div className='modelList' ref={el => (scrollElement.current[2] = el)}>
                <ProjectList
                  className='modelList'
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </div>
              <div className='modelList' ref={el => (scrollElement.current[3] = el)}>
                <CertificateList
                  className='modelList'
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </div>
              <div className='modelList' ref={el => (scrollElement.current[4] = el)}>
                <AwardList
                  className='modelList'
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </div>

              <FloatingIcon
                receiverId={portfolioOwner.id}
                isMyPortfolio={portfolioOwner.id === userState.user?.id}
                chatList={chatList}
                userId={userState.user?.id}
                currentUser={userState.user}
                receiver={portfolioOwner}
                setShowButton={setShowButton}
              />

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Portfolio;
