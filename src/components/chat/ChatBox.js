import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import io from 'socket.io-client';

const ChatBox = ({ show, handleClose, senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [chatList, setChatList] = useState([]); // only declare chatList once as a state variable

  useEffect(() => {
    // create WebSocket connection
    const newSocket = io(process.env.REACT_APP_SERVER_URL);

    // join chat room
    newSocket.emit('joinRoom', { senderId, receiverId });

    // listen for new messages
    newSocket.on('newMessage', (newMessage) => {
      // update chat list
      setChatList((prevChatList) => [...prevChatList, newMessage]);
    });

    // store socket instance
    setSocket(newSocket);

    // close socket connection when component unmounts
    return () => {
      newSocket.close();
    };
  }, [senderId, receiverId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // send message to server
    socket.emit('chatMessage', { senderId, receiverId, message });
    setMessage('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {chatList.map((chat, index) => (
            <li key={index}>{chat}</li>
          ))}
        </ul>
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
      </Modal.Body>
    </Modal>
  );
};

export default ChatBox;
