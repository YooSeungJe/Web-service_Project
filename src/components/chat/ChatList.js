import React, { useState, useEffect } from 'react';
import ChatCard from './ChatCard';
import * as api from '../../api';

const ChatList = ({ onChatSelect, userId }) => {
  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRooms = async (userId) => {
    try {
      const response = await api.get(`chats/${userId}`);

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
          <ChatCard
            key={chatRoom.roomId}
            roomId={chatRoom.roomId}
            senderId={chatRoom.senderId}
            senderName={chatRoom.senderName}
            receiverId={chatRoom.receiverId}
            receiverName={chatRoom.receiverName}
            onClick={() => {
              console.log(
                'Chat room item clicked with roomId:',
                chatRoom.roomId
              );
              onChatSelect(chatRoom.roomId);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
