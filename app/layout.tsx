import { Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

import { StoreProvider } from "@/app/context/StoreProvider";
import HamburgerMenu from "@/app/components/HamburgerMenu";
import { AuthProvider } from "@/app/context/AuthContext";

import Layout from "@/app/Layout/index";
import { cookies } from "next/headers";
import { NavProvider } from "@/app/context/NavigationContext";

const roboto = Roboto({
  subsets: ["latin-ext"],
});

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
                <Layout token={token || null}>{children}</Layout>
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
          </NavProvider>
        </body>
      </html>
    </>
  );
}
