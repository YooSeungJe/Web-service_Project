import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

import './FloatingIcon.css';
import ChatBox from './ChatBox';
import ChatList from './ChatList';

import { UserStateContext } from '../../App';
const FloatingIcon = ({ receiverId, isMyPortfolio }) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const userState = useContext(UserStateContext);
  const senderId = userState.user.id;

  const handleClick = () => {
    setShowChatBox((prevShowChatBox) => !prevShowChatBox);
    setHasStartedChat(true);
  };

  const handleChatSelect = (roomId) => {
    console.log('handleChatSelect called with roomId:', roomId);
    setShowChatBox(true);
    setSelectedRoomId(roomId);
    setHasStartedChat(true);
  };

  const location = useLocation();

  useEffect(() => {
    setShowChatBox(false);
  }, [location]);

  return (
    <div className='floating-icon-container'>
      <FontAwesomeIcon
        icon={faComments}
        className='floating-icon'
        onClick={handleClick}
      />

      {showChatBox && (
        <>
          {isMyPortfolio && !selectedRoomId ? (
            <ChatList onChatSelect={handleChatSelect} userId={senderId} />
          ) : (
            <ChatBox
              show={showChatBox}
              handleClose={() => {
                setShowChatBox(false);
                setSelectedRoomId(null);
              }}
              senderId={senderId}
              receiverId={receiverId}
              selectedRoomId={selectedRoomId}
              resetSelectedRoom={() => setSelectedRoomId(null)}
              isMyPortfolio={isMyPortfolio}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FloatingIcon;
