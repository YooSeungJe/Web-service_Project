import React, { useState, useEffect } from 'react';
import * as api from '../../api';

const useCounterpartData = (senderId, receiverId) => {
  const [counterpartData, setCounterpartData] = useState({ id: '', name: '' });

  useEffect(() => {
    const fetchCounterpart = async () => {
      try {
        const counterpartId =
          senderId === localStorage.getItem('userId') ? receiverId : senderId;
        const counterpart = await api.get(`users/${counterpartId}`);

        setCounterpartData({ id: counterpartId, name: counterpart.data.name });
      } catch (error) {
        console.error('Failed to fetch counterpart:', error);
      }
    };
    fetchCounterpart();
  }, [senderId, receiverId]);

  return counterpartData;
};

const ChatCard = ({
  roomId,
  senderId,
  senderName,
  receiverId,
  receiverName,
  onClick,
  counterpart,
}) => {
  return (
    <li onClick={onClick}>
      <div>
        <h6>{counterpart}님과의 대화</h6>
      </div>
    </li>
  );
};

export default ChatCard;
