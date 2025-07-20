import { NextRequest, NextResponse } from "next/server";

const privateAdminPaths = ["/admin"];
const authPaths = [
  "/Authentication/Login",
  "/Authentication/Sign",
  "/Authentication/Verify/",
];
const sellerPaths = ["/seller/signup"];

const privateSellerPaths = ["/seller/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("token")?.value;
  const roles = request.cookies.get("roles")?.value;

  // nếu người dùng đã có roles là seller rồi thì ko được vào seller
  if (
    sellerPaths.some((path) => pathname.startsWith(path)) &&
    roles === "SELLER"
  ) {
    return NextResponse.redirect(new URL("/seller/dashboard", request.url));
  }
  //Nếu người dùng chưa có roles la seller rồi thì ko được vào trang seller
  if (
    privateSellerPaths.some((path) => pathname.startsWith(path)) &&
    roles === "USER"
  ) {
    return NextResponse.redirect(new URL("/seller/signup", request.url));
  }

  // Nếu người dùng chua dang nhap thi chuyen huong ve trang login
  if (privateSellerPaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/Authentication/Login", request.url));
  }

  //nếu người dùng ko có role seller ko được vào trang dashboard
  if (
    privateSellerPaths.some((path) => pathname.startsWith(path)) &&
    roles !== "SELLER"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Nếu người dùng truy cập trang privateAdminPaths mà không có role admin thì chuyển hướng về trang chủ
  if (
    privateAdminPaths.some((path) => pathname.startsWith(path)) &&
    roles !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // nếu admin vào trang người dùng sẽ đá về trang admin
  if (
    privateAdminPaths.some((path) => !pathname.startsWith(path)) &&
    roles === "ADMIN" &&
    pathname !== "/admin"
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Nếu người dùng truy cập trang authPaths mà có token thì chuyển hướng về trang home
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/accounts/orthers", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"], // Loại trừ các route tĩnh
};
