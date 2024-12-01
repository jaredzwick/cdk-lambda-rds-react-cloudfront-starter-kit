import React, { useState } from "react";
import {
  LogOut,
  Bell,
  Shield,
  UserX,
  Trash2,
  Mail,
  AlertCircle,
} from "lucide-react";

export function AccountSettings() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Account Settings
        </h1>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    Email Notifications
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    SMS Notifications
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Account Status
            </h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  <UserX className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    Temporarily Disable Account
                  </span>
                </div>
                <AlertCircle className="h-5 w-5 text-gray-400" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-between px-4 py-2 bg-red-50 rounded-md hover:bg-red-100"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-red-600">Delete Account</span>
                </div>
                <AlertCircle className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Security
            </h2>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">Change Password</span>
              </div>
              <AlertCircle className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Logout */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100">
              <LogOut className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Log Out</span>
            </button>
          </div>
        </div>

        {/* Delete Account Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete Account
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
