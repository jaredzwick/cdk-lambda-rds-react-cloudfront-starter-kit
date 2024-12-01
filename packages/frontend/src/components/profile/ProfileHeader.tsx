import React from "react";
import { Settings, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProfileHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your profile information and preferences
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button
            className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 bg-gray-50 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={() => navigate("/verify-account")}
          >
            <Shield className="h-4 w-4 mr-2" />
            Verify Account
          </button>
          <button
            className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900 bg-gray-50 px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={() => navigate("/account-settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
}
