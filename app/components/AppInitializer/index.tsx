// File: app/providers/AppInitializer.tsx (Tạo file mới này)
"use client";

import { useState, useEffect } from "react";

import Layout from "@/app/Layout/index"; // Đường dẫn tới Layout của bạn
import SplashScreen from "@/app/components/Splash Screen";

type Props = {
  children: React.ReactNode;
  token: string | null;
};

export function AppInitializer({ children, token }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Logic này chỉ chạy 1 lần duy nhất khi ứng dụng khởi động
    const initializeApp = async () => {
      try {
        // Đảm bảo splash screen hiển thị ít nhất 1.5 giây để có trải nghiệm mượt mà
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []); // Mảng rỗng đảm bảo chỉ chạy 1 lần

  if (isLoading) {
    return <SplashScreen />;
  }

  // Khi đã load xong, hiển thị Layout chính
  return <Layout token={token}>{children}</Layout>;
}
