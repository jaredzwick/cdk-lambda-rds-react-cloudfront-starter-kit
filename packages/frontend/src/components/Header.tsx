import React from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CuddleConnect</span>
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <a href="#how-it-works" className="text-base font-medium text-gray-700 hover:text-indigo-600">
              How It Works
            </a>
            <a href="#browse" className="text-base font-medium text-gray-700 hover:text-indigo-600">
              Browse Cuddlers
            </a>
            <a href="#become" className="text-base font-medium text-gray-700 hover:text-indigo-600">
              Become a Cuddler
            </a>
            <button 
              onClick={() => navigate('/auth')}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Sign Up
            </button>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <a href="#how-it-works" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
                How It Works
              </a>
              <a href="#browse" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
                Browse Cuddlers
              </a>
              <a href="#become" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600">
                Become a Cuddler
              </a>
              <div className="space-y-2 px-3 py-2">
                <button 
                  onClick={() => navigate('/auth')}
                  className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/auth')}
                  className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}