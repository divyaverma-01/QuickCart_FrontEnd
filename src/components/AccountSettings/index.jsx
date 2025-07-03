"use client";

import React, { useState } from "react";

const AccountSettings = () => {
  // Profile State
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    profileImage: null,
    profileImagePreview: null,
  });

  // Password State
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    language: "english",
    notifications: true,
  });

  // === Handlers ===

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        profileImage: file,
        profileImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    if (profile.profileImage) {
      formData.append("image", profile.profileImage);
    }

    console.log("Submitting profile:", Object.fromEntries(formData.entries()));
    alert("Profile updated!");
    // Connect to API here
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirmation do not match.");
      return;
    }
    console.log("Updating password:", passwords);
    alert("Password updated!");
    // Connect to API here
  };

  const handlePreferencesSave = (e) => {
    e.preventDefault();
    console.log("Saving preferences:", preferences);
    alert("Preferences saved!");
    // Connect to API here
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* === Profile Section === */}
        <form
          onSubmit={handleProfileSave}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

          {/* Profile Image */}
          <div className="mb-4 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-300">
              {profile.profileImagePreview ? (
                <img
                  src={profile.profileImagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500"
            />
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Phone</label>
            <input
              type="tel"
              className="w-full border px-3 py-2 rounded"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-dark"
          >
            Save Profile
          </button>
        </form>

        {/* === Security Section === */}
        <form
          onSubmit={handlePasswordSave}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Security</h2>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Current Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-dark"
          >
            Update Password
          </button>
        </form>

        {/* === Preferences Section === */}
        <form
          onSubmit={handlePreferencesSave}
          className="bg-white p-6 rounded-lg shadow md:col-span-2"
        >
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Language</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={preferences.language}
              onChange={(e) =>
                setPreferences({ ...preferences, language: e.target.value })
              }
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  notifications: e.target.checked,
                })
              }
            />
            <label className="text-gray-700">Enable Notifications</label>
          </div>

          <button
            type="submit"
            className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-dark"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;

// Here are ideas you can implement:

// 📍 Profile
// 👤 Upload/edit profile picture ✅

// 🧾 View and download invoices

// 🗂️ View past order history (link to /orders)

// 📬 Manage saved shipping addresses

// 🔐 Security
// 📲 Enable 2FA (Two-factor authentication via email/OTP)

// 🔐 View and manage recent login sessions

// 🧠 Add password strength meter

// 🚫 Deactivate/delete account

// 🌐 Preferences
// 🎨 Theme (light/dark)

// 📨 Email & SMS notifications toggle

// 🌎 Currency and region settings

// 🛍 Product recommendation preferences

// 💳 Payments
// 💳 Manage saved cards

// 📄 View billing statements

// 🏦 UPI or wallet linking

// 👥 Social Login
// Link/Unlink Google, Facebook, etc.
