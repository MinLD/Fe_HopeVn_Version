"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import axios from "axios";
import { createStompClient } from "@/app/lib/stompClient";
import { baseUrl } from "@/app/service/ApiClient";

const URL = baseUrl;

// Kiểu dữ liệu Message chuẩn, sử dụng cấu trúc lồng nhau
export interface Message {
  id: string;
  sender: {
    email: string;
  };
  receiver: {
    email: string;
  };
  content: string;
  sentAt: string;
  read?: boolean;
}

// Kiểu dữ liệu cho tin nhắn gửi đi
export interface SendMessagePayload {
  senderEmail: string;
  receiverEmail: string;
  content: string;
}

const SEND_DESTINATION = "/app/message.send";
const SUBSCRIPTION_DESTINATION = "/user/queue/messages";

// Hook bây giờ nhận cả email và ID của người dùng hiện tại
export const useStompChat = (
  currentUserEmail: string,
  currentUserId: string,
  token: string
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Client | null>(null);

  const fetchHistory = useCallback(
    async (recipientEmail: string) => {
      if (!currentUserEmail || !currentUserId || !token) return;

      try {
        const response = await axios.get(`${URL}/messages`, {
          params: { email1: currentUserEmail, email2: recipientEmail },
          headers: { Authorization: `Bearer ${token}` },
        });

        const historyMessages = response.data.result || [];

        // SỬA LỖI: Chuẩn hóa dữ liệu không nhất quán từ API
        const formattedMessages: Message[] = historyMessages.map((msg: any) => {
          // Kiểm tra xem sender/receiver là object hay chỉ là chuỗi ID
          const senderIsObject =
            typeof msg.sender === "object" && msg.sender !== null;

          // Dựa vào kết quả kiểm tra để lấy email đúng cách
          const senderEmail = senderIsObject
            ? msg.sender.email
            : msg.sender === currentUserId
            ? currentUserEmail
            : recipientEmail;
          const receiverEmail = senderIsObject
            ? msg.receiver.email
            : msg.receiver === currentUserId
            ? currentUserEmail
            : recipientEmail;

          return {
            id: msg.id,
            content: msg.content,
            sentAt: msg.sentAt,
            read: msg.read,
            sender: { email: senderEmail },
            receiver: { email: receiverEmail },
          };
        });

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Failed to fetch message history:", error);
      }
    },
    [currentUserEmail, currentUserId, token]
  );

  const sendMessage = useCallback((payload: SendMessagePayload) => {
    if (stompClientRef.current?.active) {
      stompClientRef.current.publish({
        destination: SEND_DESTINATION,
        body: JSON.stringify(payload),
      });
    } else {
      console.error("STOMP client is not connected.");
    }
  }, []);

  useEffect(() => {
    if (!token || !currentUserEmail || !currentUserId) return;

    const client = createStompClient(token);
    stompClientRef.current = client;

    client.onConnect = (frame) => {
      console.log("Đã kết nối tới STOMP server:", frame);
      setIsConnected(true);

      client.subscribe(SUBSCRIPTION_DESTINATION, (message: IMessage) => {
        const newMessage: Message = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    };

    // ... các hàm onStompError, onDisconnect giữ nguyên

    client.activate();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [currentUserEmail, currentUserId, token]);

  return { messages, setMessages, sendMessage, isConnected, fetchHistory };
};
