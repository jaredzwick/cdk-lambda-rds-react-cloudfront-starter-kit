import React from "react";
import { Clock, Calendar, History } from "lucide-react";

interface BookingTabsProps {
  selectedTab: "pending" | "upcoming" | "past";
  onTabChange: (tab: "pending" | "upcoming" | "past") => void;
}

export function BookingTabs({ selectedTab, onTabChange }: BookingTabsProps) {
  const tabs = [
    { id: "pending", label: "Pending", icon: Clock },
    { id: "upcoming", label: "Upcoming", icon: Calendar },
    { id: "past", label: "Past", icon: History },
  ] as const;

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex space-x-8">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              flex items-center px-1 py-4 text-sm font-medium border-b-2 
              ${
                selectedTab === id
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }
            `}
          >
            <Icon className="h-5 w-5 mr-2" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
