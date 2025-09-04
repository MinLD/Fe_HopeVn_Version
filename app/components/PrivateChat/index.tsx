"use client";

import {
  Message,
  SendMessagePayload,
  useStompChat,
} from "@/app/hooks/useStompChat";
import { useProfileStore } from "@/app/zustand/userStore";
import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

interface ChatBoxProps {
  token: string;
}

export default function ChatBox({ token }: ChatBoxProps) {
  // State để quản lý input và người đang chat
  const [recipientInput, setRecipientInput] = useState("");
  const [activeChatRecipient, setActiveChatRecipient] = useState("");

  // Lấy thông tin người dùng hiện tại từ Zustand store
  const { profileUser } = useProfileStore();
  const currentUserEmail = profileUser?.email;
  const currentUserId = profileUser?.id; // Lấy ID để truyền vào hook

  const [newMessage, setNewMessage] = useState("");

  // Sử dụng custom hook để quản lý logic chat
  const { messages, sendMessage, isConnected, fetchHistory, setMessages } =
    useStompChat(currentUserEmail, currentUserId, token);

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Bắt đầu cuộc trò chuyện mới
  const handleStartChat = () => {
    if (recipientInput.trim() && recipientInput.includes("@")) {
      setActiveChatRecipient(recipientInput);
    }
  };

  // useEffect để lấy lịch sử chat khi người dùng bắt đầu một cuộc trò chuyện mới
  useEffect(() => {
    if (activeChatRecipient) {
      setMessages([]); // Xóa tin nhắn cũ
      fetchHistory(activeChatRecipient);
    }
  }, [activeChatRecipient, fetchHistory, setMessages]);

  // Hàm gửi tin nhắn
  const handleSend = () => {
    if (newMessage.trim() && currentUserEmail && activeChatRecipient) {
      // Dữ liệu gửi lên server
      const payload: SendMessagePayload = {
        senderEmail: currentUserEmail,
        receiverEmail: activeChatRecipient,
        content: newMessage,
      };

      // Áp dụng Optimistic UI: Tạo tin nhắn tạm thời để hiển thị ngay
      const optimisticMessage: Message = {
        id: Date.now().toString(),
        sender: { email: currentUserEmail },
        receiver: { email: activeChatRecipient },
        content: newMessage,
        sentAt: new Date().toISOString(),
      };

      // Cập nhật giao diện ngay lập tức
      setMessages((prevMessages) => [...prevMessages, optimisticMessage]);

      // Gửi tin nhắn thực sự đến server
      sendMessage(payload);

      // Xóa nội dung ô input
      setNewMessage("");
    }
  };

  // Hàm xử lý sự kiện cuộn
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const isScrolledUp = container.scrollTop < -200;
      setShowScrollToBottom(isScrolledUp);
    }
  };

  // Hàm để cuộn xuống dưới cùng
  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Khung nhập email để bắt đầu chat */}
      <div className="flex flex-col sm:flex-row gap-2 p-4 border rounded-lg bg-white shadow-sm">
        <input
          type="email"
          className="border-2 p-2 flex-grow rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Nhập email người bạn muốn trò chuyện..."
          value={recipientInput}
          onChange={(e) => setRecipientInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleStartChat();
          }}
        />
        <button
          onClick={handleStartChat}
          className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors"
        >
          Bắt đầu Trò chuyện
        </button>
      </div>

      {/* Khung chat chính, chỉ hiện khi đã có người để chat */}
      {activeChatRecipient ? (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-lg shadow-lg bg-white">
          <div className="p-4 border-b font-bold text-lg text-center">
            Trò chuyện với {activeChatRecipient}
            <span
              className={`ml-2 text-sm ${
                isConnected ? "text-green-500" : "text-red-500"
              }`}
            >
              ● {isConnected ? "Online" : "Offline"}
            </span>
          </div>

          <div className="flex-1 bg-gray-50 relative">
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="absolute inset-0 p-4 overflow-y-auto flex flex-col-reverse"
            >
              {/* SỬA: Logic render tin nhắn để nhóm avatar */}
              {[...messages].reverse().map((msg, index, array) => {
                const isSender = msg.sender.email === currentUserEmail;

                // Logic để quyết định có hiển thị avatar hay không
                // Tin nhắn tiếp theo theo thứ tự thời gian là tin nhắn ở index - 1 trong mảng đã đảo ngược
                const nextMsg = array[index - 1];
                const showAvatar =
                  !isSender &&
                  (index === 0 || nextMsg?.sender.email !== msg.sender.email);

                // Lấy avatar từ dữ liệu, nếu không có thì dùng ảnh đại diện mặc định
                const senderAvatar = `https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg`;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 my-1 ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    {/* Vùng chứa avatar để giữ khoảng trống cho tin nhắn thẳng hàng */}
                    <div className="w-7 flex-shrink-0">
                      {showAvatar && (
                        <Image
                          src={senderAvatar}
                          alt={msg.sender.email}
                          width={28}
                          height={28}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                      )}
                    </div>

                    {/* Khối tin nhắn */}
                    <div
                      className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                        isSender
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      <p className="break-words">{msg.content}</p>
                      <span className="text-xs opacity-75 mt-1 block text-right">
                        {new Date(msg.sentAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nút cuộn xuống dưới */}
            {showScrollToBottom && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-6 right-6 z-10 bg-white text-gray-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition animate-fade-in"
                aria-label="Cuộn xuống dưới"
              >
                <ArrowDown className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Khung nhập tin nhắn */}
          <div className="flex p-4 border-t bg-white">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập tin nhắn..."
              disabled={!isConnected}
            />
            <button
              onClick={handleSend}
              className="ml-4 bg-green-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors"
              disabled={!isConnected}
            >
              Gửi
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          <p>Nhập email và nhấn Bắt đầu Trò chuyện để xem tin nhắn.</p>
        </div>
      )}
    </div>
  );
}
