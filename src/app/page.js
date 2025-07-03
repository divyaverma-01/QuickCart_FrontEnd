import Home from "@/components/Home";

export const metadata = {
  title: "NextCommerce | Nextjs E-commerce template",
  description: "This is Home for NextCommerce Template",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}

// import Head from "next/head";
// import { Toaster } from "react-hot-toast";

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>QuickCart - Your Smart Shopping Companion</title>
//         <meta
//           name="description"
//           content="Shop smart, fast, and easy with QuickCart!"
//         />
//       </Head>

//       {/* Toast Notification */}
//       <Toaster position="top-right" />

//       <main className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-100">
//         {/* Header */}
//         <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-10">
//           <h1 className="text-2xl font-extrabold text-indigo-500">QuickCart</h1>
//           <nav className="space-x-6 text-sm font-medium text-gray-700">
//             <a href="#" className="hover:text-indigo-500 transition">
//               Home
//             </a>
//             <a href="#" className="hover:text-indigo-500 transition">
//               Features
//             </a>
//             <a href="#" className="hover:text-indigo-500 transition">
//               Contact
//             </a>
//           </nav>
//         </header>

//         {/* Hero Section */}
//         <section className="flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-r from-indigo-300 to-pink-300 text-white rounded-b-[3rem] shadow-md">
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-sm">
//             Shop Smarter with QuickCart
//           </h2>
//           <p className="text-lg md:text-xl max-w-2xl mb-6 font-light">
//             Your one-stop solution for seamless online shopping. Fast, secure,
//             and easy to use.
//           </p>
//           <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-indigo-50 transition">
//             Start Shopping
//           </button>
//         </section>

//         {/* Features Section */}
//         <section className="px-6 py-20 bg-white">
//           <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Why Choose QuickCart?
//           </h3>
//           <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
//             <div className="text-center p-6 bg-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition">
//               <div className="text-indigo-500 text-5xl mb-4">⚡</div>
//               <h4 className="text-xl text-black font-semibold mb-2">
//                 Lightning Fast
//               </h4>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 QuickCart loads instantly and gets your order done in no time.
//               </p>
//             </div>
//             <div className="text-center p-6 bg-pink-50 rounded-2xl shadow-sm hover:shadow-md transition">
//               <div className="text-pink-500 text-5xl mb-4">🛡️</div>
//               <h4 className="text-xl text-black font-semibold mb-2">
//                 Secure Checkout
//               </h4>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Enjoy encrypted payments and safe transactions every time.
//               </p>
//             </div>
//             <div className="text-center p-6 bg-purple-50 rounded-2xl shadow-sm hover:shadow-md transition">
//               <div className="text-purple-500 text-5xl mb-4">🛍️</div>
//               <h4 className="text-xl text-black font-semibold mb-2">
//                 Wide Range
//               </h4>
//               <p className="text-gray-600 text-sm leading-relaxed">
//                 Thousands of products across all categories. One cart, endless
//                 possibilities.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="text-center py-6 bg-gradient-to-t from-white via-gray-100 to-white text-gray-500 text-sm rounded-t-2xl shadow-inner mt-10">
//           © {new Date().getFullYear()} QuickCart. All rights reserved.
//         </footer>
//       </main>
//     </>
//   );
// }
