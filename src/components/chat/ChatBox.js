import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import io from 'socket.io-client';

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
