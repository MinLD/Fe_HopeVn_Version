"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/app/types/UserList";

interface AuthState {
  token: string | null;
  scope: string | null;
  userId: string | null;
  setAuth: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [scope, setScope] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const setAuth = (newToken: string) => {
    setToken(newToken);
    try {
      const decoded: DecodedToken = jwtDecode(newToken);
      setScope(decoded.scope || null);
      setUserId(decoded.userId || null);
    } catch (error) {
      console.error("Invalid token error:", error);
      setScope(null);
      setUserId(null);
    }
  };

  const logout = () => {
    setToken(null);
    setScope(null);
    setUserId(null);
    // Gọi API logout nếu cần
  };

  // Lấy token từ cookie khi component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        console.log("Fetching token..."); // Debug: Xác nhận fetch được gọi
        const res = await fetch("/apiFe/get-token", {
          // Thêm "/" để resolve đúng
          credentials: "include",
          method: "GET", // Cụ thể hóa method
        });
        console.log("Fetch response status:", res.status); // Debug: Trạng thái HTTP
        if (res.ok) {
          const data = await res.json();
          console.log("API response:", data); // Debug: Nội dung response
          const { token } = data;
          if (token) {
            console.log("Setting auth with token:", token); // Debug: Xác nhận token
            setAuth(token);
          } else {
            console.log("No token in response:", data);
          }
        } else {
          const errorData = await res.json();
          console.log("API error:", errorData); // Log lỗi chi tiết
        }
      } catch (error) {
        console.error("Fetch error:", error); // Log lỗi network chi tiết
      }
    };
    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, scope, userId, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
