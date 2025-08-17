// app/authenticate/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Cookies from "js-cookie";
import { exchangeCodeForToken } from "@/app/service/auth";
import LoadingOverlay from "@/app/components/LoaddingOverlay";
import SplashScreen from "@/app/components/Splash Screen";

export default function AuthenticatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!searchParams) {
        setError(
          "Search parameters are not available. This might be a server-side render or hydration issue."
        );
        setIsLoading(false);
        setTimeout(() => {
          router.replace("/login");
        }, 2000);
        return;
      }

      const code = searchParams.get("code");

      if (code) {
        console.log("Authentication code received:", code);
        try {
          const { token, refreshToken } = await exchangeCodeForToken(code);

          if (token) {
            Cookies.set("authToken", token, {
              expires: 7,
              secure: process.env.NODE_ENV === "production",
              sameSite: "Lax",
              path: "/",
            });

            if (refreshToken) {
              Cookies.set("refreshToken", refreshToken, {
                expires: 30,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                path: "/",
              });
            }
            //     await fetchProfile();
            // await fetchCart();

            const role = Cookies.get("roles");

            if (role === "ADMIN") {
              router.replace("/admin");
            } else if (role === "SELLER") {
              router.replace("/seller");
            } else {
              router.replace("/");
            }
            console.log("Token set in cookies directly.");
            window.location.reload();
            router.replace("/");
          } else {
            setError("Authentication failed: No token received from backend.");
            setIsLoading(false);
          }
        } catch (err: any) {
          console.error("Authentication error:", err);
          setError(
            `Authentication failed: ${
              err.message || "Unknown error during token exchange."
            }`
          );
          setIsLoading(false);
        }
      } else {
        // Nếu không có code và searchParams không phải null (đã được hydrate)
        setError(
          "No authentication code found in URL. Redirecting to login..."
        );
        setIsLoading(false);
        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      }
    };

    // Chỉ chạy handleAuthentication khi searchParams đã sẵn sàng (không null)
    // và đảm bảo nó không chạy lại không cần thiết
    if (searchParams) {
      // Chỉ chạy khi searchParams không phải null
      // Bạn có thể thêm điều kiện searchParams.toString() !== "" nếu muốn
      // Nhưng việc kiểm tra 'code' bên trong hàm handleAuthentication đã bao gồm.
      handleAuthentication();
    }
  }, [searchParams, router]); // Dependency array: searchParams và router
  // Xử lý hiển thị loading hoặc lỗi
  if (isLoading && !error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-gray-100">
        <SplashScreen />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-red-100 text-red-700">
      <h1 className="text-2xl font-bold">Authentication Error</h1>
      <p className="text-center">{error}</p>
      <button
        onClick={() => router.replace("/login")}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Go to Login
      </button>
    </div>
  );
}
