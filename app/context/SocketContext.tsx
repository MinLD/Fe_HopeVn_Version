// File: context/SocketContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// Định nghĩa kiểu cho Context
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

// Tạo Context với giá trị mặc định
const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

// Tạo một custom hook để sử dụng Socket Context dễ dàng hơn
export const useSocket = () => {
  return useContext(SocketContext);
};

// Tạo Provider component
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // URL của WebSocket server của bạn
    // Rất quan trọng: Phải dùng process.env.NEXT_PUBLIC_... để client có thể truy cập
    const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

    socketInstance.on("connect", () => {
      console.log("✅ Connected to WebSocket server");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket server");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    // Dọn dẹp khi component unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
