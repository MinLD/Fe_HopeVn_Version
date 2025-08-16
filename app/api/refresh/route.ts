import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios"; // Hoặc dùng fetch

export async function POST(request: Request) {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    // Gọi backend refresh token
    const response = await axios.post(
      "http://localhost:3000/api/auth/refresh",
      {
        refreshToken,
      }
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const { token, newRefreshToken } = response.data;

    // Lưu token mới vào cookie
    (await cookies()).set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    // Lưu refreshToken mới nếu có
    if (newRefreshToken) {
      (await cookies()).set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2592000,
        path: "/",
      });
    }

    return NextResponse.json({ message: "Token refreshed", token });
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
