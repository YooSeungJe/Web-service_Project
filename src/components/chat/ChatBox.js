import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import io from 'socket.io-client';
import './ChatBox.css';

const ChatBox = ({ show, handleClose, senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);

    newSocket.emit('joinRoom', { senderId, receiverId });

    newSocket.on('newMessage', (newMessage) => {
      setChatList((prevChatList) => [...prevChatList, newMessage]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [senderId, receiverId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    socket.emit('chatMessage', { senderId, receiverId, message });
    setMessage('');
  };

  return (
    show && (
      <div className='chat-box'>
        <div className='chat-box-header'>
          <h5>Chat</h5>
          <button onClick={handleClose}>&times;</button>
        </div>
        <div className='chat-box-body'>
          <ul>{/* ... */}</ul>
        </div>
        <div className='chat-box-footer'>
          <Form onSubmit={handleSubmit}>{/* ... */}</Form>
        </div>
      </div>
    )
  );
};

export default ChatBox;
