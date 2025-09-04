"use client";
import { WEBSOCKET_URL } from "@/app/service/ApiClient";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
// Dựa trên backend: Sử dụng URL bạn đã cung cấp.
const URL = WEBSOCKET_URL;

/**
 * Khởi tạo một Stomp Client để kết nối đến WebSocket server.
 * @param token - JWT token để xác thực người dùng.
 * @returns Một instance của Stomp Client.
 */
export const createStompClient = (token: string) => {
  const client = new Client({
    // Sử dụng SockJS làm phương tiện kết nối để đảm bảo tính ổn định
    webSocketFactory: () => new SockJS(URL),

    // Header để gửi token xác thực khi kết nối
    // Spring Security sẽ đọc header 'Authorization' này
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },

    // Bật log để dễ dàng debug trong quá trình phát triển
    debug: (str) => {
      console.log("STOMP: " + str);
    },

    // Cấu hình tự động kết nối lại sau mỗi 5 giây nếu bị ngắt
    reconnectDelay: 5000,
  });

  return client;
};
