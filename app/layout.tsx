"use client";
import { Roboto } from "next/font/google";
import "./globals.css";

import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

import { Suspense } from "react";

import LoadingOverlay from "@/app/components/LoaddingOverlay";

import MyFooter from "@/app/Layout/Footer";
import MyHeader from "@/app/Layout/Header";

import { AuthProvider } from "@/app/context/AuthProvider";
import { StoreProvider } from "@/app/context/StoreProvider";
import HamburgerMenu from "@/app/components/HamburgerMenu";

const roboto = Roboto({
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Danh sách các trang không dùng layout root
  const excludedPages = ["/"]; // Thêm các trang khác nếu cần

  // Kiểm tra xem trang hiện tại có nằm trong danh sách excludedPages không
  const isExcludedPage = excludedPages.some((page) =>
    pathname?.split("/").includes(page)
  );

  return (
    <html lang="vi" className={roboto.className}>
      <body className={roboto.className}>
        <AuthProvider>
          <StoreProvider>
            {!isExcludedPage && <MyHeader />}
            <Suspense
              fallback={
                <div className="loading ">
                  <LoadingOverlay message="Vui lòng chờ tải trang" />
                </div>
              }
            >
              {children}
            </Suspense>
            {!isExcludedPage && <MyFooter />}

            <Toaster
              richColors
              duration={1500}
              position="top-right"
              theme="dark"
              style={{ zIndex: 9999 }}
            />
            <HamburgerMenu />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
