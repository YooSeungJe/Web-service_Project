import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import './ChatBox.css';
import * as api from '../../api';
import ChatList from './ChatList';

const backendPortNumber = '5001';
const serverUrl =
  'http://' + window.location.hostname + ':' + backendPortNumber + '/';
const ChatBox = ({
  show,
  handleClose,
  senderId,
  receiverId,
  isMyPortfolio,
  // isChatOn,
  chatHistory,
  counterpart,
  resetSelectedRoom,
}) => {
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
      const response = await api.get(`chats/${userId}`);
      setChatRooms(response.data.chats);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
    }
  };

  // const fetchChatHistory = async (senderId, receiverId) => {
  //   try {
  //     const roomId = [senderId, receiverId].sort().join('-');

  //     const response = await api.get(`chat/${roomId}`);
  //     console.log('Response data:', response.data);
  //     setChatList(response.data.messages);
  //     if (response.data.messages.length > 0) {
  //       setHasChatHistory(true);
  //       setIsChatActive(true);
  //     }

  //     return response.data;
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       setHasChatHistory(false);
  //     } else {
  //       console.error('Failed to fetch chat history:', error);
  //     }
  //   }
  // };

  const fetchChatHistory = async (senderId, receiverId) => {
    try {
      const roomId = [senderId, receiverId].sort().join('-');
      const response = await api.get(`chat/${roomId}`);

      setChatList(response.data.messages);
      setHasChatHistory(response.data.messages.length > 0);
      setIsChatActive(true);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHasChatHistory(false);
      } else {
        console.error('Failed to fetch chat history:', error);
      }
    }
  };

  // 동작하는 코드임
  // useEffect(() => {
  //   const newSocket = io(`localhost:5001`, {
  //     cors: { origin: '*' },
  //   });

  //   newSocket.emit('joinRoom', { senderId, receiverId });
  //   console.log('joinRoom emitted with', { senderId, receiverId });
  //   newSocket.on('newMessage', (message) => {
  //     console.log('newMessage received with', message);
  //     setChatList((prevChatList) =>
  //       Array.isArray(prevChatList) ? [...prevChatList, message] : [message]
  //     );
  //   });

  //   fetchChatHistory(senderId, receiverId).then((chatHistory) => {
  //     if (chatHistory) {
  //       setIsChatActive(true);
  //       setHasChatHistory(true);
  //       setPrevChatList(chatHistory.messages);
  //     } else {
  //       setIsChatActive(false);
  //       setHasChatHistory(false);
  //     }
  //   });

  //   setSocket(newSocket);
  //   if (isMyPortfolio) {
  //     fetchChatRooms(senderId);
  //   }
  //   return () => {
  //     newSocket.close();
  //   };
  // }, [senderId, receiverId, hasChatHistory, isMyPortfolio]);
  useEffect(() => {
    const newSocket = io(`${serverUrl}`, {
      cors: { origin: '*' },
    });

    newSocket.emit('joinRoom', { senderId, receiverId });

    newSocket.on('newMessage', (message) => {
      setChatList((prevChatList) =>
        Array.isArray(prevChatList) ? [...prevChatList, message] : [message]
      );
    });

    fetchChatHistory(senderId, receiverId).then((chatHistory) => {
      if (chatHistory) {
        setPrevChatList(chatHistory.messages);
        setIsChatActive(chatHistory.messages.length > 0);
      }
    });

    setSocket(newSocket);
    if (isMyPortfolio) {
      fetchChatRooms(senderId);
    }
    return () => {
      newSocket.close();
    };
    // }, [senderId, receiverId, hasChatHistory, isMyPortfolio]);
  }, [senderId, receiverId, isMyPortfolio]);

  const handleSubmit = (event) => {
    event.preventDefault();

    socket.emit('chatMessage', { senderId, receiverId, message });

    setMessage('');
  };

  const startChat = async (event) => {
    event.stopPropagation();
    if (!chatRoomCreated) {
      await socket.emit('createChatRoom', { senderId, receiverId });
      setChatRoomCreated(true);
    }

    fetchChatHistory(senderId, receiverId).then((chatHistory) => {
      if (chatHistory) {
        setHasChatHistory(true);
        setIsChatActive(true);
        setPrevChatList(chatHistory.messages);
        setChatList(chatHistory.messages);
      } else {
        setHasChatHistory(false);
        setIsChatActive(false);
        setChatList([{ message: '새로운 채팅이 시작되었습니다.' }]);
      }
    });
  };
  useEffect(() => {
    setChatList(chatHistory);
  }, [chatHistory]);
  return (
    show && (
      <div className='chat-box'>
        <div className='chat-box-header'>
          <h5>Chat</h5>
          <button onClick={handleClose}>&times;</button>
        </div>
        {isMyPortfolio && !selectedRoomId ? (
          <ChatList
            currentUserId={senderId}
            onChatSelect={setSelectedRoomId}
            userId={senderId}
            senderId={senderId}
            receiverId={receiverId}
            selectedRoomId={selectedRoomId}
          />
        ) : (
          <>
            {/* {isChatActive && ( */}
            {hasChatHistory && (
              <>
                {isMyPortfolio && selectedRoomId && (
                  <button
                    onClick={() => {
                      resetSelectedRoom();
                    }}
                  >
                    Back
                  </button>
                )}
                {/* <div className='chat-box-body'>
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
                </div> */}
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
                {/* <div className='chat-box-body'>
                  <ul>
                    {(chatList || chatHistory) &&
                      (chatList || chatHistory).map((chat, index) => (
                        <li key={index} className='chat-message'>
                          {chat.message}
                        </li>
                      ))}
                    {!(chatList || chatHistory) && <li>No chat messages</li>}
                  </ul>
                </div> */}
                {/* {hasChatHistory && Array.isArray(chatList) && (
                  <div className='chat-box-body'>
                    <ul>
                      {chatList.map((chat, index) => (
                        <li key={index} className='chat-message'>
                          {chat.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(!hasChatHistory || !Array.isArray(chatList)) && (
                  <div className='chat-box-body'>
                    <ul>
                      <li>No chat messages</li>
                    </ul>
                  </div>
                )} */}

                {/* <div className='chat-box-footer'>
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
                </div> */}
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
            )}
            {!hasChatHistory && !isMyPortfolio && (
              <div className='start-chat-container'>
                <p className='no-chat-message'>
                  아직 채팅을 시작하지 않았어요.
                </p>
                <button
                  className='start-chat-button'
                  onClick={async (e) => {
                    e.preventDefault();
                    startChat(e);
                    // onClick={startChat}
                    // setHasChatHistory(true);
                    // // setIsChatActive(true);
                    // if (!chatRoomCreated) {
                    //   socket.emit('createChatRoom', { senderId, receiverId });
                    //   setChatRoomCreated(true);
                    // }
                  }}
                >
                  채팅 시작하기
                </button>
              </div>
            )}
          </>
        )}
      </div>
    )
  );
};

export default ChatBox;
