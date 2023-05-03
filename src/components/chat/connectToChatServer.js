import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5001';

const connectToChatServer = (currentUser, onNewMessageReceived) => {
  const socket = io.connect(SERVER_URL);

  socket.emit('joinRoom', { senderId: currentUser && currentUser.id });

  socket.on('newMessage', (message) => {
    if (message.senderId !== (currentUser && currentUser.id)) {
      onNewMessageReceived(message);
    }
  });

  const sendMessage = (receiverId, message) => {
    socket.emit('chatMessage', {
      senderId: currentUser && currentUser.id,
      receiverId,
      message,
    });
  };

  return { sendMessage };
};

export default connectToChatServer;
