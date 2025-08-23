"use client";

import { useStompClient } from "@/app/hooks/useStompClient";
import { useProfileStore } from "@/app/zustand/userStore";
import { useEffect, useState } from "react";

// Giả định bạn có token và email của người dùng

const MOCK_ROOM_ID = "general";

interface Message {
  content: string;
  senderEmail: string;
}
type props = {
  token: string;
};
export default function StompChat({ token }: props) {
  const { profileUser } = useProfileStore();
  console.log(profileUser);
  const MOCK_USER_EMAIL = profileUser?.email || "";
  // Lấy stompClient từ custom hook
  const { stompClient, isConnected } = useStompClient({
    authToken: token,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Chỉ thực hiện subscribe khi đã kết nối thành công
    if (stompClient && isConnected) {
      // 1. Subscribe vào kênh của phòng chat
      const roomSubscription = stompClient.subscribe(
        `/topic/room/${MOCK_ROOM_ID}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, receivedMessage]);
        }
      );

      // 2. Subscribe vào kênh riêng tư của user này
      const privateSubscription = stompClient.subscribe(
        `/user/queue/private`, // Spring sẽ tự động map tới user hiện tại
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          alert(`Tin nhắn riêng tư mới: ${receivedMessage.content}`);
          setMessages((prev) => [...prev, receivedMessage]);
        }
      );

      // Dọn dẹp: Hủy subscribe khi component unmount
      return () => {
        roomSubscription.unsubscribe();
        privateSubscription.unsubscribe();
      };
    }
  }, [stompClient, isConnected]);

  // Hàm gửi tin nhắn
  const sendMessage = () => {
    if (stompClient && isConnected && input.trim()) {
      const messagePayload = {
        senderEmail: MOCK_USER_EMAIL,
        content: input,
      };

      // Gửi tin nhắn đến destination của phòng chat
      stompClient.publish({
        destination: `/app/message.room.${MOCK_ROOM_ID}`,
        body: JSON.stringify(messagePayload),
      });

      setInput("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Phòng chat STOMP: {MOCK_ROOM_ID}
      </h2>
      <p>
        Trạng thái kết nối:{" "}
        {isConnected ? "✅ Đã kết nối" : "⏳ Đang kết nối..."}
      </p>

      <div className="h-80 overflow-y-auto border p-3 my-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index}>
            <span className="font-semibold">{msg.senderEmail}: </span>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Nhập tin nhắn..."
          disabled={!isConnected}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={!isConnected}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
