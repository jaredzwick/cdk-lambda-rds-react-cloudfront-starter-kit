import { useState } from "react";
import { Mail, Phone, ArrowRight } from "lucide-react";

export function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {isSignIn ? "Sign in to your account" : "Create your account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            {/* Auth Method Selector */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setAuthMethod("email")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                  authMethod === "email"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                <Mail className="w-4 h-4 inline-block mr-2" />
                Email
              </button>
              <button
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${
                  authMethod === "phone"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                <Phone className="w-4 h-4 inline-block mr-2" />
                Phone
              </button>
            </div>

            {/* Email/Phone Input */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                {authMethod === "email" ? "Email address" : "Phone number"}
              </label>
              <div className="mt-1">
                <input
                  id="contact"
                  name="contact"
                  type={authMethod === "email" ? "email" : "tel"}
                  autoComplete={authMethod === "email" ? "email" : "tel"}
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {isSignIn && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isSignIn ? "Sign in" : "Create account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Social Sign In */}
            <div>
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center items-center gap-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <img
                    className="h-5 w-5"
                    src="https://www.google.com/favicon.ico"
                    alt="Google logo"
                  />
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
