"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { getUserOrders } from "@/app/lib/API/orderApi";
import AccountSidebar from "./AccountSidebar";
import DashboardTab from "./DashboardTab";
import ProfileTab from "./ProfileTab";
import OrdersTab from "./OrdersTab";
import AddressesTab from "./AddressesTab";
import SettingsTab from "./SettingsTab";
import AddressModal from "./AddressModal";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [addressModal, setAddressModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { user, authLoading, logout } = useAuth();
  const router = useRouter();

  // Fetch user orders
  useEffect(() => {
    if (user && activeTab === "orders") {
      fetchOrders();
    }
  }, [user, activeTab]);

  // Initialize profile form with user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const ordersData = await getUserOrders();
      setOrders(ordersData.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddressModal = () => {
    setAddressModal(true);
  };

  const closeAddressModal = () => {
    setAddressModal(false);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    // TODO: Implement profile update API call
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    logout();
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px]">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sign in required
          </h2>
          <p className="text-gray-600 mb-6">
            You must be signed in to view your account.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardTab
            user={user}
            orders={orders}
            router={router}
            setActiveTab={setActiveTab}
          />
        );
      case "profile":
        return (
          <ProfileTab
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            isEditingProfile={isEditingProfile}
            setIsEditingProfile={setIsEditingProfile}
            handleProfileUpdate={handleProfileUpdate}
          />
        );
      case "orders":
        return <OrdersTab orders={orders} loading={loading} />;
      case "addresses":
        return <AddressesTab openAddressModal={openAddressModal} />;
      case "settings":
        return <SettingsTab handleLogout={handleLogout} />;
      default:
        return (
          <DashboardTab
            user={user}
            orders={orders}
            router={router}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <>
      <Breadcrumb title={"My Account"} pages={["my account"]} />

      <section className="overflow-hidden py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <AccountSidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Main Content */}
            <div className="flex-1">{renderContent()}</div>
          </div>
        </div>
      </section>

      {/* Address Modal */}
      {addressModal && (
        <AddressModal isOpen={addressModal} onClose={closeAddressModal} />
      )}
    </>
  );
};

export default MyAccount;

// "use client";
// import React, { useState, useEffect } from "react";
// import Breadcrumb from "../Common/Breadcrumb";
// import Image from "next/image";
// import AddressModal from "./AddressModal";
// import Orders from "../Orders";
// import { useAuth } from "@/app/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { getUserOrders } from "@/app/lib/API/orderApi";
// import { getCookie } from "cookies-next";

// const MyAccount = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [addressModal, setAddressModal] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [profileForm, setProfileForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });
//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const { user, authLoading, logout } = useAuth();
//   const router = useRouter();

//   // Fetch user orders
//   useEffect(() => {
//     if (user && activeTab === "orders") {
//       fetchOrders();
//     }
//   }, [user, activeTab]);

//   // Initialize profile form with user data
//   useEffect(() => {
//     if (user) {
//       setProfileForm({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       });
//     }
//   }, [user]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const ordersData = await getUserOrders();
//       setOrders(ordersData.orders || []);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openAddressModal = () => {
//     setAddressModal(true);
//   };

//   const closeAddressModal = () => {
//     setAddressModal(false);
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     // TODO: Implement profile update API call
//     setIsEditingProfile(false);
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   if (authLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-[400px]">
//         <div className="text-center">
//           <svg
//             className="w-16 h-16 text-gray-400 mx-auto mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//             />
//           </svg>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">
//             Sign in required
//           </h2>
//           <p className="text-gray-600 mb-6">
//             You must be signed in to view your account.
//           </p>
//           <button
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//             onClick={() => router.push("/login")}
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const tabs = [
//     {
//       id: "dashboard",
//       name: "Dashboard",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
//           />
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: "profile",
//       name: "Profile",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: "orders",
//       name: "Orders",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: "addresses",
//       name: "Addresses",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//           />
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//           />
//         </svg>
//       ),
//     },
//     {
//       id: "settings",
//       name: "Settings",
//       icon: (
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//           />
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//           />
//         </svg>
//       ),
//     },
//   ];

//   const renderDashboard = () => (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
//         <div className="flex items-center space-x-4">
//           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
//             {user.profileImage ? (
//               <Image
//                 src={user.profileImage}
//                 alt="Profile"
//                 width={64}
//                 height={64}
//                 className="rounded-full"
//               />
//             ) : (
//               <svg
//                 className="w-8 h-8"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//             )}
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold">
//               Welcome back, {user.firstName || user.name || "User"}!
//             </h2>
//             <p className="text-blue-100">
//               Member since{" "}
//               {user.createdAt
//                 ? new Date(user.createdAt).toLocaleDateString()
//                 : "Recently"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg p-6 shadow-sm border">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                 />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Total Orders</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {orders.length}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Completed</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {orders.filter((order) => order.status === "completed").length}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg p-6 shadow-sm border">
//           <div className="flex items-center">
//             <div className="p-2 bg-yellow-100 rounded-lg">
//               <svg
//                 className="w-6 h-6 text-yellow-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm font-medium text-gray-600">Pending</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {orders.filter((order) => order.status === "pending").length}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white rounded-lg shadow-sm border">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
//         </div>
//         <div className="p-6">
//           {orders.length === 0 ? (
//             <div className="text-center py-8">
//               <svg
//                 className="w-12 h-12 text-gray-400 mx-auto mb-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                 />
//               </svg>
//               <p className="text-gray-500">No orders yet</p>
//               <button
//                 onClick={() => router.push("/shop")}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Start Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {orders.slice(0, 3).map((order) => (
//                 <div
//                   key={order._id}
//                   className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
//                 >
//                   <div>
//                     <p className="font-medium text-gray-900">
//                       Order #{order._id.slice(-8)}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         order.status === "completed"
//                           ? "bg-green-100 text-green-800"
//                           : order.status === "pending"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                     <span className="font-medium">₹{order.total}</span>
//                   </div>
//                 </div>
//               ))}
//               {orders.length > 3 && (
//                 <button
//                   onClick={() => setActiveTab("orders")}
//                   className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   View all orders
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   const renderProfile = () => (
//     <div className="bg-white rounded-lg shadow-sm border">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900">
//             Profile Information
//           </h3>
//           <button
//             onClick={() => setIsEditingProfile(!isEditingProfile)}
//             className="text-blue-600 hover:text-blue-700 font-medium"
//           >
//             {isEditingProfile ? "Cancel" : "Edit"}
//           </button>
//         </div>
//       </div>
//       <div className="p-6">
//         <form onSubmit={handleProfileUpdate}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 value={profileForm.firstName}
//                 onChange={(e) =>
//                   setProfileForm({ ...profileForm, firstName: e.target.value })
//                 }
//                 disabled={!isEditingProfile}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 value={profileForm.lastName}
//                 onChange={(e) =>
//                   setProfileForm({ ...profileForm, lastName: e.target.value })
//                 }
//                 disabled={!isEditingProfile}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={profileForm.email}
//                 onChange={(e) =>
//                   setProfileForm({ ...profileForm, email: e.target.value })
//                 }
//                 disabled={!isEditingProfile}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 value={profileForm.phone}
//                 onChange={(e) =>
//                   setProfileForm({ ...profileForm, phone: e.target.value })
//                 }
//                 disabled={!isEditingProfile}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
//               />
//             </div>
//           </div>
//           {isEditingProfile && (
//             <div className="mt-6 flex justify-end">
//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );

//   const renderOrders = () => (
//     <div className="bg-white rounded-lg shadow-sm border">
//       <div className="p-6 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
//       </div>
//       <div className="p-6">
//         {loading ? (
//           <div className="flex justify-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           </div>
//         ) : orders.length === 0 ? (
//           <div className="text-center py-8">
//             <svg
//               className="w-12 h-12 text-gray-400 mx-auto mb-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//               />
//             </svg>
//             <p className="text-gray-500">No orders found</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="border border-gray-200 rounded-lg p-4"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <p className="font-medium text-gray-900">
//                       Order #{order._id.slice(-8)}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       order.status === "completed"
//                         ? "bg-green-100 text-green-800"
//                         : order.status === "pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm text-gray-600">
//                     {order.products?.length || 0} items
//                   </div>
//                   <div className="font-medium text-gray-900">
//                     ₹{order.total}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderAddresses = () => (
//     <div className="bg-white rounded-lg shadow-sm border">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-900">
//             Saved Addresses
//           </h3>
//           <button
//             onClick={openAddressModal}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Add New Address
//           </button>
//         </div>
//       </div>
//       <div className="p-6">
//         <div className="text-center py-8">
//           <svg
//             className="w-12 h-12 text-gray-400 mx-auto mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//             />
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//           </svg>
//           <p className="text-gray-500 mb-4">No saved addresses</p>
//           <button
//             onClick={openAddressModal}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Add Your First Address
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderSettings = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg shadow-sm border">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">
//             Account Settings
//           </h3>
//         </div>
//         <div className="p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium text-gray-900">Change Password</p>
//               <p className="text-sm text-gray-500">
//                 Update your account password
//               </p>
//             </div>
//             <button className="text-blue-600 hover:text-blue-700 font-medium">
//               Change
//             </button>
//           </div>
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium text-gray-900">
//                 Notification Preferences
//               </p>
//               <p className="text-sm text-gray-500">
//                 Manage email and SMS notifications
//               </p>
//             </div>
//             <button className="text-blue-600 hover:text-blue-700 font-medium">
//               Manage
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-900">Danger Zone</h3>
//         </div>
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium text-gray-900">Sign Out</p>
//               <p className="text-sm text-gray-500">Sign out of your account</p>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return renderDashboard();
//       case "profile":
//         return renderProfile();
//       case "orders":
//         return renderOrders();
//       case "addresses":
//         return renderAddresses();
//       case "settings":
//         return renderSettings();
//       default:
//         return renderDashboard();
//     }
//   };

//   return (
//     <>
//       <Breadcrumb title={"My Account"} pages={["my account"]} />

//       <section className="overflow-hidden py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar */}
//             <div className="lg:w-80">
//               <div className="bg-white rounded-lg shadow-sm border p-6">
//                 {/* User Info */}
//                 <div className="text-center mb-6">
//                   <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
//                     {user.profileImage ? (
//                       <Image
//                         src={user.profileImage}
//                         alt="Profile"
//                         width={80}
//                         height={80}
//                         className="rounded-full"
//                       />
//                     ) : (
//                       <svg
//                         className="w-10 h-10 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                   <h3 className="font-semibold text-gray-900">
//                     {user.firstName && user.lastName
//                       ? `${user.firstName} ${user.lastName}`
//                       : user.name || user.email}
//                   </h3>
//                   <p className="text-sm text-gray-500">{user.email}</p>
//                 </div>

//                 {/* Navigation */}
//                 <nav className="space-y-2">
//                   {tabs.map((tab) => (
//                     <button
//                       key={tab.id}
//                       onClick={() => setActiveTab(tab.id)}
//                       className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                         activeTab === tab.id
//                           ? "bg-blue-50 text-blue-700 border border-blue-200"
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       {tab.icon}
//                       <span className="font-medium">{tab.name}</span>
//                     </button>
//                   ))}
//                 </nav>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1">{renderContent()}</div>
//           </div>
//         </div>
//       </section>

//       {/* Address Modal */}
//       {addressModal && (
//         <AddressModal isOpen={addressModal} onClose={closeAddressModal} />
//       )}
//     </>
//   );
// };

// export default MyAccount;
