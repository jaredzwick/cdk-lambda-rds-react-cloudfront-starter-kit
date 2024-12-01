import React from "react";
import { Users, Search, Calendar } from "lucide-react";

export function Hero() {
  return (
    <div className="relative pt-16 overflow-hidden bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center rounded-full px-4 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 mb-6">
              <span className="font-medium">Join the Community</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Connect Through Comfort
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Join our community of certified cuddlers or find your perfect
              cuddle companion. Experience the power of platonic touch in a
              safe, trusted environment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500">
                Find a Cuddler
              </button>
              <button className="rounded-md bg-indigo-100 dark:bg-indigo-900 px-6 py-3 text-lg font-semibold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800">
                Become a Cuddler
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80"
                alt="Friends watching movie together"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      1,000+ Cuddlers
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ready to connect
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
