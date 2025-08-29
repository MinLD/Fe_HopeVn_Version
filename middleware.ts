import { GetRoles_Api } from "@/app/service/auth";
import { NextRequest, NextResponse } from "next/server";

const authPaths = ["/authenticate/loggin", "/authenticate"];

const privatePaths = [
  "/account/profile",
  "/register/partner",
  // "/recruitment/:id",
  "/wallet",
];

const publicPaths = ["/"];

const privatePathsAdmin = ["/admin"];
const privatePathsEmployee = ["/employer"];

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("authToken")?.value;

  const { pathname } = request.nextUrl;

  // Kiểm tra quyền admin cho admin paths
  if (privatePathsAdmin.some((path) => pathname.startsWith(path))) {
    try {
      const sessionToken = request.cookies.get("authToken")?.value;
      // Gọi API nội bộ để lấy roles
      const response = await GetRoles_Api(sessionToken || "");
      if (response.status !== 200) {
        console.error("Failed to fetch roles:", response.status);
        return NextResponse.redirect(new URL("/", request.url));
      }

      const { roles } = await response.json();
      console.log("Roles fetched:", roles); // Debug

      // Kiểm tra quyền admin
      if (roles !== "ROLE_ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error in middleware:", error);
      return NextResponse.redirect(
        new URL("/authenticate/loggin", request.url)
      );
    }
  }
  // Kiểm tra quyền admin cho EMPLOYER paths
  if (privatePathsEmployee.some((path) => pathname.startsWith(path))) {
    try {
      const sessionToken = request.cookies.get("authToken")?.value;
      // Gọi API nội bộ để lấy roles
      const response = await GetRoles_Api(sessionToken || "");
      if (response.status !== 200) {
        console.error("Failed to fetch roles:", response.status);
        return NextResponse.redirect(new URL("/", request.url));
      }

      const { roles } = await response.json();
      console.log("Roles fetched:", roles); // Debug

      // Kiểm tra quyền admin
      if (roles !== "ROLE_EMPLOYER") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Error in middleware:", error);
      return NextResponse.redirect(
        new URL("/authenticate/loggin", request.url)
      );
    }
  }

  if (
    privatePathsEmployee.some((path) => !pathname.startsWith(path)) &&
    privatePathsAdmin.some((path) => !pathname.startsWith(path)) &&
    sessionToken
  ) {
    try {
      // Gọi API nội bộ để lấy roles
      const response = await GetRoles_Api(sessionToken || "");
      // if (response.status !== 200) {
      //   console.error("Failed to fetch roles:", response.status);
      //   return NextResponse.redirect(
      //     new URL("/cal ko thành công", request.url)
      //   );
      // }
      const { roles } = await response.json();
      console.log("Roles fetched:", roles); // Debug

      // Kiểm tra quyền admin
      if (roles === "ROLE_ADMIN") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      if (roles === "ROLE_EMPLOYER") {
        return NextResponse.redirect(new URL("/employer", request.url));
      }
    } catch (error) {
      console.error("Error in middleware:", error);
      return NextResponse.redirect(
        new URL("/authenticate/loggin", request.url)
      );
    }
  }

  // Nếu người dùng chua dang nhap thi chuyen huong ve trang login
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/authenticate/loggin", request.url));
  }
  // nếu người dùng chưa đăng nhập và chuyển hướng vào trang có recruitment/:id =>> loggin
  if (
    privatePaths.some((path) => {
      if (path === "/recruitment") return pathname === "/recruitment";
      // if (path === "/recruitment/:id") {
      //   const regex = new RegExp(`^/recruitment/[^/]+$`);
      //   return regex.test(pathname);
      // }
      return false;
    }) &&
    !sessionToken
  ) {
    return NextResponse.redirect(new URL("/authenticate/loggin", request.url));
  }
  // Nếu người dùng truy cập trang authPaths mà có token thì chuyển hướng về trang home
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"], // Loại trừ các route tĩnh
};
