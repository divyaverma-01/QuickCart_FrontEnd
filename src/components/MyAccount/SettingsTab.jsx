import React, { useState } from "react";
import Image from "next/image";

const SettingsTab = ({ handleLogout, user }) => {
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    sms: false,
    promotions: true,
  });

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPrefs((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Account Settings
          </h3>
        </div>
        <div className="p-6 space-y-6">
          {/* Change Password */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-500">
                Update your account password for enhanced security
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto">
              Change Password
            </button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <div>
              <p className="font-medium text-gray-900">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user?.twoFactorEnabled
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user?.twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                {user?.twoFactorEnabled ? "Manage" : "Enable"}
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">
              Notification Preferences
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="email-notifications"
                    className="font-medium text-gray-700"
                  >
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Order updates, account changes, and promotions
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="email"
                    checked={notificationPrefs.email}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="sms-notifications"
                    className="font-medium text-gray-700"
                  >
                    SMS Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Order updates and important alerts
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="sms"
                    checked={notificationPrefs.sms}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label
                    htmlFor="promo-notifications"
                    className="font-medium text-gray-700"
                  >
                    Promotional Offers
                  </label>
                  <p className="text-sm text-gray-500">
                    Discounts, special offers, and newsletters
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="promotions"
                    checked={notificationPrefs.promotions}
                    onChange={handleNotificationChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-sm border border-red-100">
        <div className="p-6 border-b border-gray-200 bg-red-50 rounded-t-lg">
          <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
        </div>
        <div className="p-6 space-y-6">
          {/* Delete Account */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">Delete Account</p>
              <p className="text-sm text-gray-500">
                Permanently remove your account and all associated data
              </p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full md:w-auto">
              Delete Account
            </button>
          </div>

          {/* Sign Out */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Sign Out</p>
              <p className="text-sm text-gray-500">
                Sign out of your account on this device
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full md:w-auto"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
