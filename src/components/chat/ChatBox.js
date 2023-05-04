import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import './ChatBox.css';
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
  const [hasChatHistory, setHasChatHistory] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const fetchChatRooms = async (userId) => {
    try {
      const response = await api.get(`chat/user/${userId}`);
      setChatRooms(response.data.chats);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
    }
  };

  const fetchChatHistory = async (userId, roomId) => {
    try {
      const roomId = [senderId, receiverId].sort().join('-');

      const response = await api.get(`chat/${roomId}`);
      console.log('Response data:', response.data);
      setChatList(response.data.messages);
      if (response.data.messages.length > 0) {
        setHasChatHistory(true);
        setIsChatActive(true);
      }

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHasChatHistory(false);
      } else {
        console.error('Failed to fetch chat history:', error);
      }
      throw error;
    }
  };

  useEffect(() => {
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

    fetchChatHistory(senderId, receiverId).then((response) => {
      if (response.messages.length > 0) {
        setIsChatActive(true);
        setHasChatHistory(true);
      }
    });

    setSocket(newSocket);
    if (isMyPortfolio) {
      fetchChatRooms(senderId);
    }
    return () => {
      newSocket.close();
    };
  }, [senderId, receiverId, hasChatHistory, isMyPortfolio]);

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
        {isMyPortfolio && !selectedRoomId ? (
          <div className='chat-room-list'>
            {chatRooms.length > 0 ? (
              chatRooms.map((room) => (
                <div
                  key={room.roomId}
                  className='chat-room'
                  onClick={() => setSelectedRoomId(room.roomId)}
                >
                  {room.roomName}
                </div>
              ))
            ) : (
              <div className='no-chat-rooms'>No chat rooms available.</div>
            )}
          </div>
        ) : isMyPortfolio && selectedRoomId ? (
          <>
            <button onClick={() => setSelectedRoomId(null)}>Back</button>
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
        ) : hasChatHistory ? (
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
            <p className='no-chat-message'>아직 채팅을 시작하지 않았어요.</p>
            {!isMyPortfolio && (
              <button
                className='start-chat-button'
                onClick={async () => {
                  setHasChatHistory(true);
                  setIsChatActive(true);
                  if (!chatRoomCreated) {
                    socket.emit('createChatRoom', { senderId, receiverId });
                    setChatRoomCreated(true);
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
