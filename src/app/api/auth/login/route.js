import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Replace with your actual authentication logic
    const res = await fetch(`${process.env.BACKEND_API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(res.message || "Login failed");
    }

    // Backend already sets the cookie, so we don't need to set it again
    // Just return success response
    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internaal Server error" },
      { status: 500 }
    );
  }
}

// if (!isValidUser.token) {
//   return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
// }
// cookies().set({
//   name: "authToken",
//   value: isValidUser.token,
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict",
//   maxAge: 60 * 60 * 24 * 7, // 1 week
//   path: "/",
// });
