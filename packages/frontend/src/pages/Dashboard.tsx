import React, { useState } from "react";
import { Filter } from "lucide-react";
import { CuddlerSearch } from "../components/dashboard/CuddlerSearch";
import { CuddlerGrid } from "../components/dashboard/CuddlerGrid";
import { CuddlerFilters } from "../components/dashboard/CuddlerFilter";

export function Dashboard() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filters
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isFilterOpen ? "Hide" : "Show"}
            </div>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <aside
            className={`${
              isFilterOpen ? "block" : "hidden"
            } md:block w-full md:w-64 transition-all duration-200 ease-in-out`}
          >
            <CuddlerFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <CuddlerSearch />
            <CuddlerGrid />
          </main>
        </div>
      </div>
    </div>
  );
}
