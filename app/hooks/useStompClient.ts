// File: hooks/useStompClient.ts
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Props cho hook (nếu cần, ví dụ như token)
interface UseStompClientProps {
  authToken?: string;
}

export const useStompClient = ({ authToken }: UseStompClientProps) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // URL websocket endpoint bạn cung cấp
    const WEBSOCKET_URL =
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:8080/ws";

    // Tạo một Stomp Client mới
    const client = new Client({
      // Dùng SockJS để tạo kết nối
      webSocketFactory: () => new SockJS(WEBSOCKET_URL),

      // Thêm thông tin xác thực (authentication) ở đây
      // Backend của bạn dùng Principal, nên rất có thể cần JWT token
      connectHeaders: {
        Authorization: `Bearer ${authToken}`,
      },

      // Bật debug để xem log trên console của trình duyệt
      debug: (str) => {
        console.log(new Date(), str);
      },

      // Tăng thời gian kết nối lại nếu bị mất kết nối
      reconnectDelay: 5000,
    });

    // Xử lý sự kiện khi kết nối thành công
    client.onConnect = (frame) => {
      console.log("✅ Connected to STOMP over WebSocket:", frame);
      setIsConnected(true);
    };

    // Xử lý lỗi
    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    // Bắt đầu kết nối
    client.activate();
    setStompClient(client);

    // Dọn dẹp: ngắt kết nối khi component unmount
    return () => {
      client.deactivate();
      console.log("❌ Disconnected from STOMP");
      setIsConnected(false);
    };
  }, [authToken]); // Kết nối lại nếu authToken thay đổi

  return { stompClient, isConnected };
};
