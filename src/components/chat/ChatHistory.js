import React from 'react';

const ChatHistory = ({ chatList }) => {
  return (
    <div className='chat-history'>
      <ul>
        {chatList.map((chat, index) => (
          <li key={index} className='chat-message'>
            {chat.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;
