import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // Remove the cookie
  cookies().set({
    name: "authToken",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1, // Expire immediately
    path: "/",
  });

  return NextResponse.json({ message: "Logout successful" });
}
