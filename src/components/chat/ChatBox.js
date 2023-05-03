import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import './ChatBox.css';
import axios from 'axios';
import * as api from '../../api';

const ChatBox = ({
  show,
  handleClose,
  senderId,
  receiverId,
  isMyPortfolio,
}) => {
  console.log('senderId:', senderId, 'receiverId:', receiverId);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [prevChatList, setPrevChatList] = useState([]);

  const [isChatActive, setIsChatActive] = useState(false);
  const [chatRoomCreated, setChatRoomCreated] = useState(false);
  const [hasFetchedChatHistory, setHasFetchedChatHistory] = useState(false);

  const fetchChatHistory = async (userId, roomId) => {
    try {
      console.log('fetchChatHistory: userId:', userId, 'roomId:', roomId);
      const response = await api.get(`chat/${roomId}`);
      console.log('Response data:', response.data);
      setChatList(response.data.messages);

      return response.data;
    } catch (error) {
      console.log('chatList type:', typeof chatList);

      console.error('Failed to fetch chat history:', error);
      throw error;
    }
  };

  useEffect(() => {
    // const newSocket = io(process.env.REACT_APP_SERVER_URL);
    const newSocket = io(`localhost:5001`, {
      cors: { origin: '*' },
    });

    newSocket.emit('joinRoom', { senderId, receiverId });
    console.log('joinRoom emitted with', { senderId, receiverId });
    newSocket.on('newMessage', (message) => {
      console.log('newMessage received with', message);
      setChatList((prevChatList) =>
        Array.isArray(prevChatList) ? [...prevChatList, message] : [message]
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [senderId, receiverId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('handleSubmit called with message:', message);
    socket.emit('chatMessage', { senderId, receiverId, message });
    console.log('chatMessage emitted:', { senderId, receiverId, message });
    setMessage('');
  };

  console.log('chatList:', chatList);

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
                {Array.isArray(chatList) ? (
                  chatList.map((chat, index) => (
                    <li key={index} className='chat-message'>
                      {chat.message}
                    </li>
                  ))
                ) : (
                  <li>No chat messages</li>
                )}
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
                    name='message'
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
            {chatList.length === 0 && (
              <p className='no-chat-message'>아직 채팅을 시작하지 않았어요.</p>
            )}
            {!isMyPortfolio && (
              <button
                className='start-chat-button'
                onClick={async () => {
                  setIsChatActive(true);
                  if (!chatRoomCreated) {
                    socket.emit('createChatRoom', { senderId, receiverId });
                    setChatRoomCreated(true);
                  }
                  try {
                    const chatHistory = await fetchChatHistory(
                      senderId,
                      receiverId
                    );
                    setChatList(chatHistory);
                  } catch (error) {
                    console.error('Failed to fetch chat history:', error);
                  }
                }}
              >
                채팅 시작하기
              </button>
            )}
          </div>
        )}
      </div>
    )
  );
};

export default ChatBox;
