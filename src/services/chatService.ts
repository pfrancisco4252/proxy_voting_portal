import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, ChatRoom } from '../types/Chat';

const chatRooms: ChatRoom[] = [];

export const createChatRoom = (companyId: string): ChatRoom => {
  const chatRoom: ChatRoom = {
    id: uuidv4(),
    companyId,
    messages: [],
    isActive: true
  };
  chatRooms.push(chatRoom);
  return chatRoom;
};

export const sendMessage = (
  companyId: string,
  userId: string,
  userName: string,
  message: string
): ChatMessage => {
  const chatMessage: ChatMessage = {
    id: uuidv4(),
    userId,
    companyId,
    message,
    timestamp: new Date(),
    userName
  };

  const chatRoom = chatRooms.find(room => room.companyId === companyId);
  if (chatRoom) {
    chatRoom.messages.push(chatMessage);
  }

  return chatMessage;
};

export const getChatHistory = (companyId: string): ChatMessage[] => {
  const chatRoom = chatRooms.find(room => room.companyId === companyId);
  return chatRoom ? chatRoom.messages : [];
};
