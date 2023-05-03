import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import './ChatBox.css';

const ChatBox = ({ show, handleClose, senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);

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
        {isChatActive ? (
          <>
            <div className='chat-box-body'>
              <ul>
                {chatList.map((chat, index) => (
                  <li key={index} className='chat-message'>
                    {chat}
                  </li>
                ))}
              </ul>
            </div>
            <div className='chat-box-footer'>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type='text'
                    placeholder='Enter message'
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </Form.Group>
                <Button variant='primary' type='submit'>
                  Send
                </Button>
              </Form>
            </div>
          </>
        ) : (
          <div className='start-chat-container'>
            <button
              className='start-chat-button'
              onClick={() => setIsChatActive(true)}
            >
              채팅 시작하기
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default ChatBox;
