import React, { useState, useEffect } from 'react';
import ChatCard from './ChatCard';
import * as api from '../../api';

const ChatList = ({
  onChatSelect,
  userId,
  senderId,
  receiverId,
  currentUserId,
  fetchChatHistory,
  selectedRoomId,
}) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [counterparts, setCounterparts] = useState({});
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const fetchChatRooms = async (userId) => {
    try {
      const response = await api.get(`chats/${userId}`);
      console.log('fetchroom', response);
      setChatRooms(response.data.chatRooms);
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error);
    }
  };

  // prev code
  // const fetchCounterpart = async (roomId, userId) => {
  //   console.log(roomId);
  //   console.log(userId);
  //   try {
  //     const chatRoom = chatRooms.find((chatRoom) => chatRoom.roomId === roomId);
  //     const counterpartId =
  //       chatRoom.senderId === userId ? chatRoom.receiverId : chatRoom.senderId;
  //     const counterpart = await api.get(`users/${counterpartId}`);
  //     console.log(counterpart);
  //     return counterpart.data.name;
  //   } catch (error) {
  //     console.error('Failed to fetch counterpart:', error);
  //   }
  // };
  // const fetchCounterpart = async (roomId, userId) => {
  //   console.log(roomId);
  //   console.log(userId);

  //   console.log('chatRooms:', chatRooms); // Debug: log chatRooms

  //   const chatRoom = chatRooms.find((chatRoom) => chatRoom.roomId === roomId);

  //   console.log('chatRoom:', chatRoom); // Debug: log chatRoom

  //   if (!chatRoom) {
  //     console.error('Could not find chatRoom with the given roomId');
  //     return;
  //   }

  //   const counterpartId =
  //     chatRoom.senderId === userId ? chatRoom.receiverId : chatRoom.senderId;

  //   console.log('counterpartId:', counterpartId); // Debug: log counterpartId

  //   if (!counterpartId) {
  //     console.error('Could not determine counterpartId');
  //     return;
  //   }

  //   try {
  //     const counterpart = await api.get(`users/${counterpartId}`);
  //     console.log(counterpart);
  //     return counterpart.data.name;
  //   } catch (error) {
  //     console.error('Failed to fetch counterpart:', error);
  //   }
  // };
  const fetchCounterpart = async (roomId, userId) => {
    try {
      const chatRoom = chatRooms.find((chatRoom) => chatRoom.roomId === roomId);
      const lastMessage = chatRoom.messages[chatRoom.messages.length - 1];
      const counterpartId =
        lastMessage.senderId === userId
          ? lastMessage.receiverId
          : lastMessage.senderId;
      const counterpart = await api.get(`users/${counterpartId}`);
      console.log(counterpart);
      return counterpart.data.name;
    } catch (error) {
      console.error('Failed to fetch counterpart:', error);
    }
  };

  const fetchChatHistoryForList = async (roomId) => {
    try {
      const response = await api.get(`chat/${roomId}`);
      console.log('Response data:', response.data);
      return response.data.messages;
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  useEffect(() => {
    fetchChatRooms(userId);
  }, [userId]);

  useEffect(() => {
    const updateCounterparts = async () => {
      const updatedCounterparts = {};

      for (const chatRoom of chatRooms) {
        const counterpartName = await fetchCounterpart(chatRoom.roomId, userId);
        updatedCounterparts[chatRoom.roomId] = counterpartName;
      }

      setCounterparts(updatedCounterparts);
    };

    updateCounterparts();
  }, [chatRooms]);

  useEffect(() => {
    if (selectedRoomId) {
      const room = chatRooms.find((room) => room.roomId === selectedRoomId);
      setSelectedRoom(room);
    } else {
      setSelectedRoom(null);
    }
  }, [selectedRoomId, chatRooms]);
  return (
    <div className='chat-list'>
      <ul>
        {chatRooms.map((chatRoom) => {
          return (
            <ChatCard
              key={chatRoom.roomId}
              roomId={chatRoom.roomId}
              senderId={chatRoom.senderId}
              senderName={chatRoom.senderName}
              receiverId={chatRoom.receiverId}
              receiverName={chatRoom.receiverName}
              counterpart={counterparts[chatRoom.roomId]}
              onClick={async () => {
                onChatSelect(chatRoom.roomId);
                setSelectedChat(chatRoom.roomId);
                const fetchedHistory = await fetchChatHistoryForList(
                  chatRoom.roomId
                );
                // onChatSelect(chatRoom.roomId, counterpartId);
                setChatHistory(chatRoom);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
