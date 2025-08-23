// File: hooks/useStompClient.ts
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useStompClient = (authToken?: string) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!authToken) return;

    const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL!;

    const client = new Client({
      webSocketFactory: () => new SockJS(WEBSOCKET_URL),
      connectHeaders: { Authorization: `Bearer ${authToken}` },
      reconnectDelay: 5000,
    });

    client.onConnect = () => setIsConnected(true);
    client.onDisconnect = () => setIsConnected(false);
    client.onStompError = (frame) => {
      console.error("STOMP Error:", frame.headers["message"], frame.body);
      setIsConnected(false);
    };

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [authToken]);

  return { stompClient, isConnected };
};
