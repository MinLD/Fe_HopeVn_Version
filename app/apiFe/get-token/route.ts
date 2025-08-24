import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("authToken")?.value;
  return NextResponse.json({ token: token || null });
}
