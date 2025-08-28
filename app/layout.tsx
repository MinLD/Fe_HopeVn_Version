import { Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

import { StoreProvider } from "@/app/context/StoreProvider";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import { AuthProvider } from "@/app/context/AuthContext";

import { cookies } from "next/headers";
import { NavProvider } from "@/app/context/NavigationContext";
import { AppInitializer } from "@/app/components/AppInitializer";
import CreatePost from "@/app/componentsPostHelp/CreatePost";
import { Metadata } from "next";

const roboto = Roboto({
  subsets: ["latin-ext"],
});
export const metadata: Metadata = {
  title: {
    default: "Hope - Nền tảng Kết nối & Hỗ trợ Cộng đồng", // Title mặc định
    template: "%s | Hope", // Template cho các trang con (ví dụ: "Việc làm IT | Hope")
  },
  description:
    "Hope là nền tảng kết nối người khó khăn với cơ hội việc làm và các nhà hảo tâm. Cùng nhau xây dựng một cộng đồng tương trợ, minh bạch và bền vững.",
  keywords: [
    "tìm việc làm",
    "giúp đỡ người khó khăn",
    "quyên góp từ thiện",
    "hoàn cảnh khó khăn",
    "tuyển dụng",
  ],
  openGraph: {
    // Metadata cho mạng xã hội (Facebook, Zalo)
    title: "Hope - Nền tảng Kết nối & Hỗ trợ Cộng đồng",
    description:
      "Chung tay giúp đỡ những hoàn cảnh khó khăn và tìm kiếm cơ hội việc làm.",
    type: "website",
    locale: "vi_VN",
    url: "https://ourhope.io.vn/",
    siteName: "Hope",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <>
      <html lang="vi" className={roboto.className}>
        <body className={roboto.className}>
          <NavProvider>
            <AuthProvider>
              <StoreProvider>
                <AppInitializer token={token || null}>
                  {children}
                  {/* Điểm neo cho tất cả các modal sẽ được render ở đây */}
                  <div id="modal-root"></div>
                </AppInitializer>
                <Toaster
                  richColors
                  duration={1500}
                  position="top-right"
                  theme="dark"
                  style={{ zIndex: 9999 }}
                />
                <HamburgerMenu />
                {/* he */}

                <>
                  <CreatePost token={token || ""} />
                </>
              </StoreProvider>
            </AuthProvider>
          </NavProvider>
        </body>
      </html>
    </>
  );
}
