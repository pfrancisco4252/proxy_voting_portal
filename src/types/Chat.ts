export interface ChatMessage {
  id: string;
  userId: string;
  companyId: string;
  message: string;
  timestamp: Date;
  userName: string;
}

export interface ChatRoom {
  id: string;
  companyId: string;
  messages: ChatMessage[];
  isActive: boolean;
}
