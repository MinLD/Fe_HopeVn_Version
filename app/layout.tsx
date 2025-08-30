import { Inter, Poppins } from "next/font/google";
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
import FloatingActionButton from "@/app/components/FloatingActionButton";

// 2. Cấu hình font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Tạo biến CSS cho font Inter
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-poppins", // Tạo biến CSS cho font Poppins
});
export const metadata: Metadata = {
  title: {
    default: "Hope - Nền tảng Kết nối & Hỗ trợ Cộng đồng", // Title mặc định
    template: "%s | Hope", // Template cho các trang con (ví dụ: "Việc làm IT | Hope")
  },

  description:
    "Hope là nền tảng kết nối người khó khăn với cơ hội việc làm và các nhà hảo tâm. Cùng nhau xây dựng một cộng đồng tương trợ, minh bạch và bền vững.",
  verification: {
    google: "r1zzYyWTHGRbLp0I2G5mJbAsmuzi5PJTcABSnv7_zs0",
  },
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
      <html lang="vi" className={`${inter.variable} ${poppins.variable}`}>
        <body>
          <NavProvider>
            <AuthProvider>
              <StoreProvider>
                <AppInitializer token={token || null}>
                  {children}
                  {/* Điểm neo cho tất cả các modal sẽ được render ở đây */}
                  <div id="modal-root"></div>
                  <FloatingActionButton token={token || ""} />
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
