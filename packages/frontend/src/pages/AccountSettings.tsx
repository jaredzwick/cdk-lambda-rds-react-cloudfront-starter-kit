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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Account Settings
        </h1>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Email Notifications
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
                />
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    SMS Notifications
                  </span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
                />
              </label>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Account Status
            </h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center gap-2">
                  <UserX className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Temporarily Disable Account
                  </span>
                </div>
                <AlertCircle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-between px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-red-600 dark:text-red-500" />
                  <span className="text-sm text-red-600 dark:text-red-500">
                    Delete Account
                  </span>
                </div>
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Security
            </h2>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Change Password
                </span>
              </div>
              <AlertCircle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </button>
          </div>

          {/* Logout */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Log Out
              </span>
            </button>
          </div>
        </div>

        {/* Delete Account Confirmation */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Delete Account
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 dark:hover:bg-red-500 transition-colors">
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
