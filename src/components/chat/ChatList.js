import React, { useState, useEffect } from 'react';
import * as api from '../../api';

const ChatList = ({ onChatSelect, userId }) => {
  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRooms = async (userId) => {
    try {
      const response = await api.get(`chat/user/${userId}`);

      setChatRooms(response.data.chatRooms);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
    }
  };

  useEffect(() => {
    fetchChatRooms(userId);
  }, [userId]);

  return (
    <div className='chat-list'>
      <ul>
        {chatRooms.map((chatRoom) => (
          <li
            key={chatRoom.roomId}
            onClick={() => onChatSelect(chatRoom.roomId)}
          >
            {userId === chatRoom.senderId
              ? `${chatRoom.receiverName}님과의 대화`
              : `${chatRoom.senderName}님과의 대화`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
