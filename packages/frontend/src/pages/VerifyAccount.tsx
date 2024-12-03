import React, { useState } from "react";
import { Shield, Phone, Mail, Check, AlertCircle } from "lucide-react";

export function VerifyAccount() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = () => {
    if (!phoneNumber) {
      setError("Please enter a valid phone number");
      return;
    }
    setCodeSent(true);
    setError("");
  };

  const handleVerify = () => {
    if (!verificationCode) {
      setError("Please enter the verification code");
      return;
    }
    // Handle verification logic here
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-md mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
            <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Verify Your Account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Add an extra layer of security to your account
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Phone Verification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Phone Number Verification
              </label>
              <div className="flex gap-3">
                <div className="flex-grow">
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 pl-10 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Enter phone number"
                      disabled={codeSent}
                    />
                  </div>
                </div>
                <button
                  onClick={handleSendCode}
                  disabled={codeSent}
                  className="whitespace-nowrap px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  Send Code
                </button>
              </div>
            </div>

            {/* Verification Code */}
            {codeSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Enter Verification Code
                </label>
                <div className="flex gap-3">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Enter 6-digit code"
                    />
                  </div>
                  <button
                    onClick={handleVerify}
                    className="whitespace-nowrap px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Email Status */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Email Verification
                  </span>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
