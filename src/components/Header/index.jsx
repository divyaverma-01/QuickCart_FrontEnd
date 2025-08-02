// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   FaPhoneAlt,
//   FaUser,
//   FaShoppingCart,
//   FaSearch,
//   FaRedo,
//   FaHeart,
// } from "react-icons/fa";
// import { menuData } from "./menuData";
// import Link from "next/link";

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("0");
//   const [stickyMenu, setStickyMenu] = useState(false);
//   const [openDropdownId, setOpenDropdownId] = useState(null);

//   const handleStickyMenu = () => {
//     setStickyMenu(window.scrollY >= 80);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleStickyMenu);
//     return () => {
//       window.removeEventListener("scroll", handleStickyMenu);
//     };
//   }, []);

//   const handleDropdownToggle = (id) => {
//     setOpenDropdownId(openDropdownId === id ? null : id);
//   };

//   const options = [
//     { label: "All Categories", value: "0" },
//     { label: "Desktop", value: "1" },
//     { label: "Laptop", value: "2" },
//     { label: "Monitor", value: "3" },
//     { label: "Phone", value: "4" },
//     { label: "Watch", value: "5" },
//     { label: "Mouse", value: "6" },
//     { label: "Tablet", value: "7" },
//   ];

//   return (
//     <header
//       className={`border-b border-gray-200 w-full transition-all duration-300 ${
//         stickyMenu
//           ? "fixed top-0 left-0 z-50 bg-white shadow-md py-3"
//           : "relative py-6 shadow-md"
//       }`}
//     >
//       {/* Top Bar */}
//       <div className="relative bg-white text-sm px-8 py-3">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center gap-4">
//             <h1 className="text-3xl font-extrabold text-blue-800 flex items-center gap-2">
//               <span className="bg-blue-700 text-white px-2 py-1 rounded-full text-xl">
//                 Q
//               </span>
//               QuickCart
//             </h1>
//           </div>

//           {/* Search */}
//           <div className="absolute left-1/2 transform -translate-x-1/2">
//             <div className="flex border border-gray-300 rounded-md overflow-hidden shadow">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="px-3 py-2 text-gray-600 border-r border-gray-300 bg-white text-base"
//               >
//                 {options.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="text"
//                 placeholder="I am shopping for..."
//                 className="px-4 py-1.5 w-72 outline-none text-base"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 aria-label="Search products"
//               />
//               <button
//                 type="submit"
//                 className="px-4 bg-blue-600 text-white text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 aria-label="Submit search"
//               >
//                 <FaSearch />
//               </button>
//             </div>
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-6 text-gray-700 text-base font-medium">
//             <a
//               href="/login"
//               className="flex items-center gap-2 hover:text-blue-600"
//             >
//               <FaUser className="text-blue-600" />
//               <span>Sign In</span>
//             </a>

//             <Link href="/cart" className="flex items-center gap-2">
//               <div className="relative">
//                 <FaShoppingCart className="text-blue-600 text-xl" />
//                 <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   0
//                 </span>
//               </div>
//               <span>₹0</span>
//             </Link>

//             <a
//               href="/my-account"
//               className="flex items-center gap-2 hover:text-blue-600"
//             >
//               <FaUser className="text-blue-600" />
//               <span>My Account</span>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="w-full bg-white px-8 py-3 text-[17px] font-semibold text-gray-800">
//         <div className="max-w-[1400px] mx-auto flex justify-between items-center">
//           {/* Menu */}
//           <div className="flex gap-8">
//             {menuData.map((item) => (
//               <div key={item.id} className="relative">
//                 {item.submenu ? (
//                   <>
//                     <button
//                       onClick={() => handleDropdownToggle(item.id)}
//                       className="hover:text-blue-600 capitalize"
//                     >
//                       {item.title} ▾
//                     </button>

//                     {openDropdownId === item.id && (
//                       <div className="absolute left-0 top-full bg-white shadow-md mt-2 rounded-md z-50 min-w-[220px] py-2">
//                         {item.submenu.map((subItem) => (
//                           <Link
//                             key={subItem.id}
//                             href={subItem.path}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 whitespace-nowrap"
//                             onClick={() => setOpenDropdownId(null)}
//                           >
//                             {subItem.title}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <Link
//                     href={item.path}
//                     className="hover:text-blue-600 capitalize"
//                   >
//                     {item.title}
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right menu links */}
//           <div className="flex gap-8">
//             <Link
//               href="/recently-viewed"
//               className="flex items-center gap-2 hover:text-blue-600"
//             >
//               <FaRedo /> Recently Viewed
//             </Link>
//             <Link
//               href="/wishlist"
//               className="flex items-center gap-2 hover:text-blue-600"
//             >
//               <FaHeart /> Wishlist
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
"use client";
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaRedo,
  FaHeart,
} from "react-icons/fa";
import { menuData } from "./menuData";
import Link from "next/link";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [stickyMenu, setStickyMenu] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  const handleDropdownToggle = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const options = [
    { label: "All Categories", value: "0" },
    { label: "Desktop", value: "1" },
    { label: "Laptop", value: "2" },
    { label: "Monitor", value: "3" },
    { label: "Phone", value: "4" },
    { label: "Watch", value: "5" },
    { label: "Mouse", value: "6" },
    { label: "Tablet", value: "7" },
  ];

  return (
    <header
      className={`border-b border-gray-200 w-full transition-all duration-300 ${
        stickyMenu
          ? "fixed top-0 left-0 z-50 bg-white shadow-md py-3"
          : "relative py-6 shadow-md"
      }`}
    >
      {/* Top Bar */}
      <div className="relative bg-white text-sm px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-extrabold text-blue-800 flex items-center gap-2">
              <span className="bg-blue-700 text-white px-2 py-1 rounded-full text-xl">
                Q
              </span>
              QuickCart
            </h1>
          </div>

          {/* Search */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="flex border border-gray-300 rounded-md overflow-hidden shadow">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-gray-600 border-r border-gray-300 bg-white text-base"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="I am shopping for..."
                className="px-4 py-1.5 w-72 outline-none text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
              <button
                type="submit"
                className="px-4 bg-blue-600 text-white text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Submit search"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 text-gray-700 text-base font-medium">
            <a
              href="/login"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <FaUser className="text-blue-600" />
              <span>Sign In</span>
            </a>

            <Link href="/cart" className="flex items-center gap-2">
              <div className="relative">
                <FaShoppingCart className="text-blue-600 text-xl" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  0
                </span>
              </div>
              <span>₹0</span>
            </Link>

            <a
              href="/my-account"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <FaUser className="text-blue-600" />
              <span>My Account</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full bg-white px-8 py-3 text-[17px] font-semibold text-gray-800">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Menu */}
          <div className="flex gap-8">
            {/* Home Link */}
            <Link href="/" className="hover:text-blue-600 capitalize">
              Home
            </Link>

            {menuData.map((item) => (
              <div key={item.id} className="relative">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.id)}
                      className="hover:text-blue-600 capitalize"
                    >
                      {item.title} ▾
                    </button>

                    {openDropdownId === item.id && (
                      <div className="absolute left-0 top-full bg-white shadow-md mt-2 rounded-md z-50 min-w-[220px] py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.id}
                            href={subItem.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 whitespace-nowrap"
                            onClick={() => setOpenDropdownId(null)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-blue-600 capitalize"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right menu links */}
          <div className="flex gap-8">
            <Link
              href="/recently-viewed"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <FaRedo /> Recently Viewed
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <FaHeart /> Wishlist
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
