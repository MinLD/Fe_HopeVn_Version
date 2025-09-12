// File: types/message.ts

import { Ty_profile_User } from "@/app/types/UserList";

// Yêu cầu tải lịch sử tin nhắn
export interface GetMessageRequest {
  user1Email: string;
  user2Email: string;
}

// Yêu cầu gửi tin nhắn mới
export interface SendMessageRequest {
  senderEmail: string;
  receiverEmail: string;
  content: string;
}

// Dữ liệu tin nhắn trả về từ server
export interface MessageResponse {
  id?: string; // ID có thể không có khi gửi đi
  senderEmail: string;
  receiverEmail: string;
  content: string;
  sentAt: string;
  isRead: boolean;
}
export interface Ty_MessageBox {
  id: string;
  receiver: {
    id: string;
    email: string;
    profile: Ty_profile_User;
  };
  lastMessageTime: Date;
  unreadCount: number;
}
