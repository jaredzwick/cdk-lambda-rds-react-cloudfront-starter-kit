import React from "react";
import { CuddlerSearch } from "../components/dashboard/CuddlerSearch";
import { CuddlerGrid } from "../components/dashboard/CuddlerGrid";
import { CuddlerFilters } from "../components/dashboard/CuddlerFilter";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <CuddlerFilters />
          </aside>
          <main className="flex-1">
            <CuddlerSearch />
            <CuddlerGrid />
          </main>
        </div>
      </div>
    </div>
  );
}
