"use client";

import { useStompClient } from "@/app/hooks/useStompClient";
import { getMessageHistory } from "@/app/service/message";
import { MessageResponse, SendMessageRequest } from "@/app/types/message";
import { useProfileStore } from "@/app/zustand/userStore";
import { useEffect, useState, useRef } from "react";

interface ChatProps {
  token: string;
}

export default function Chat({ token }: ChatProps) {
  const { profileUser } = useProfileStore();
  const [receiverEmail, setReceiverEmail] = useState("");
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { stompClient, isConnected } = useStompClient(token);

  const subscriptionRef = useRef<any>(null);

  // Tải lịch sử chat khi receiverEmail thay đổi
  useEffect(() => {
    if (!receiverEmail) return;

    const loadHistory = async () => {
      setIsLoading(true);
      const history = await getMessageHistory(token, {
        user1Email: profileUser?.email,
        user2Email: receiverEmail,
      });
      setMessages(history);
      setIsLoading(false);
    };

    loadHistory();
  }, [receiverEmail, profileUser?.email, token]);

  // Lắng nghe tin nhắn real-time
  useEffect(() => {
    // Chỉ thực hiện khi đã có kết nối STOMP
    if (!isConnected || !stompClient) return;

    // Dò đúng "tần số" radio mà backend quy định cho tin nhắn riêng tư
    // Backend của bạn sẽ tự động đẩy tin nhắn cho user này vào kênh này
    subscriptionRef.current = stompClient.subscribe(
      "/user/queue/private", // Đây là kênh cá nhân của bạn

      // Đây là HÀM sẽ tự động chạy mỗi khi có tin nhắn mới trên kênh
      (message) => {
        // 1. Dữ liệu tin nhắn nằm trong message.body dưới dạng chuỗi JSON
        const receivedMessage: MessageResponse = JSON.parse(message.body);

        console.log("✅ Tin nhắn mới nhận được!", receivedMessage);

        // 2. Cập nhật state 'messages' để hiển thị tin nhắn mới lên giao diện
        // Chỉ thêm vào cuộc trò chuyện nếu tin nhắn đó liên quan
        // (Trong ví dụ này, ta thêm mọi tin nhắn nhận được vào state chung)
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    );

    // Hàm dọn dẹp: sẽ chạy khi component bị hủy
    return () => {
      // Ngừng dò kênh để không nhận tin nhắn nữa
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        console.log("Đã hủy subscribe kênh private.");
      }
    };
    // useEffect này sẽ chạy lại nếu trạng thái kết nối thay đổi
  }, [isConnected, stompClient]);

  // Gửi tin nhắn
  const handleSendMessage = () => {
    console.log("1. Nút gửi đã được bấm."); // Kiểm tra xem hàm có được gọi không

    if (stompClient?.connected && input.trim() && receiverEmail) {
      const payload: SendMessageRequest = {
        senderEmail: profileUser?.email,
        receiverEmail: receiverEmail,
        content: input,
      };

      console.log("2. Chuẩn bị gửi payload:", payload); // Kiểm tra dữ liệu có đúng không
      console.log("3. Trạng thái kết nối:", stompClient.connected); // Kiểm tra kết nối

      try {
        stompClient.publish({
          destination: "/app/message.private",
          body: JSON.stringify(payload),
        });

        console.log("4. Lệnh publish đã được thực thi THÀNH CÔNG."); // Báo hiệu đã gửi

        // ... (code cập nhật UI)
      } catch (error) {
        console.error("5. Lệnh publish đã THẤT BẠI:", error); // Báo hiệu lỗi
      }
    } else {
      console.warn("Không thể gửi tin nhắn. Điều kiện không thỏa mãn:", {
        connected: stompClient?.connected,
        input: input.trim(),
        receiver: receiverEmail,
      });
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg bg-white">
      {/* Input để chọn người chat */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chat với (nhập email):
        </label>
        <input
          type="email"
          className="w-full p-2 border rounded-md"
          onBlur={(e) => setReceiverEmail(e.target.value)}
          placeholder="friend@example.com"
        />
      </div>

      {/* Khung chat */}
      {receiverEmail && (
        <div className="border-t pt-4">
          <h2 className="text-xl font-bold mb-2">
            Trò chuyện với: {receiverEmail}
          </h2>
          <p>Trạng thái: {isConnected ? "✅ Online" : "❌ Offline"}</p>

          <div className="h-96 overflow-y-auto border p-4 my-4 bg-gray-50 space-y-4">
            {isLoading ? (
              <p>Đang tải lịch sử...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderEmail === profileUser?.email
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      msg.senderEmail === profileUser?.email
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 border rounded-md"
              placeholder="Nhập tin nhắn..."
              disabled={!isConnected}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-400"
              disabled={!isConnected}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
