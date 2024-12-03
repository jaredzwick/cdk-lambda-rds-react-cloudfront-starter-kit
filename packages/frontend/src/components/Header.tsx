import React from "react";
import {
  Heart,
  Menu,
  X,
  User,
  MessageSquare,
  Calendar,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthenticator } from "@aws-amplify/ui-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.user]);
  const isAuthenticated = authStatus == "authenticated";

  const authenticatedLinks = [
    { href: "/profile", label: "My Profile", icon: User },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/bookings", label: "Booking Calendar", icon: Calendar },
    { href: "/dashboard", label: "Browse Cuddlers", icon: Users },
  ];

  const publicLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#browse", label: "Browse Cuddlers" },
    { href: "#become", label: "Become a Cuddler" },
  ];

  return (
    <header className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-sm dark:shadow-gray-800">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                CuddleConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {isAuthenticated ? (
              <>
                {authenticatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <link.icon className="h-5 w-5 mr-2" />
                    {link.label}
                  </Link>
                ))}
                <ThemeToggle />
              </>
            ) : (
              <>
                {publicLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {link.label}
                  </a>
                ))}
                <ThemeToggle />
                <button
                  onClick={() => navigate("/auth")}
                  className="rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {isAuthenticated ? (
                <>
                  {authenticatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <link.icon className="h-5 w-5 mr-2" />
                      {link.label}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {publicLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="space-y-2 px-3 py-2">
                    <button
                      onClick={() => {
                        navigate("/auth");
                        setIsMenuOpen(false);
                      }}
                      className="w-full rounded-md bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        navigate("/auth");
                        setIsMenuOpen(false);
                      }}
                      className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
