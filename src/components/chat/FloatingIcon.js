import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import './FloatingIcon.css';
import ChatBox from './ChatBox';

import { UserStateContext } from '../../App';

const FloatingIcon = ({ receiverId }) => {
  const [showChatBox, setShowChatBox] = useState(false);
  const userState = useContext(UserStateContext);
  const senderId = userState.user.id;

  return (
    <div className="floating-icon-container">
      <FontAwesomeIcon
        icon={faComments}
        className="floating-icon"
        onClick={() => {
          setShowChatBox((prevShowChatBox) => !prevShowChatBox);
        }}
      />
      {showChatBox && (
        <ChatBox
          show={showChatBox}
          handleClose={() => setShowChatBox(false)}
          senderId={senderId}
          receiverId={receiverId}
        />
      )}
    </div>
  );
};

export default FloatingIcon;
