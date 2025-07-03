import Signin from "@/components/Auth/Signin";
import React from "react";
export const metadata = {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;

// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Login() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("http://localhost:3001/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       console.log("Login successful:", data);
//       localStorage.setItem("token", data.token);

//       router.push("/");
//       // TODO: Store token and redirect
//     } catch (error) {
//       console.error("Login Error:", error);
//       setError(error.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">
//           QuickCart Login
//         </h1>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md text-sm border border-red-200">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition-all duration-200 ${
//               loading ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Logging in..." : "Log In"}
//           </button>
//         </form>

//         <p className="text-sm text-center text-gray-600 mt-5">
//           Don't have an account?{" "}
//           <Link href="/sign-up" className="text-indigo-500 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
