import React from 'react';

const ChatCard = ({
  roomId,
  senderId,
  senderName,
  receiverId,
  receiverName,
  onClick,
}) => {
  const chatPartnerName = senderId === roomId ? receiverName : senderName;

  return (
    <li onClick={onClick} className='chat-card'>
      {chatPartnerName}님과의 대화
    </li>
  );
};

export default ChatCard;
