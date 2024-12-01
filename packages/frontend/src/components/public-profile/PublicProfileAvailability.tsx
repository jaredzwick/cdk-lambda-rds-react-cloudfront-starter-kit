import React from "react";
import { Calendar, Clock, DollarSign } from "lucide-react";

export function PublicProfileAvailability() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Book a Session
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Response time: within 2 hours</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Available: Mon-Sun, 9 AM - 9 PM</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="h-4 w-4" />
          <span>$60/hour (2-hour minimum)</span>
        </div>

        <div className="pt-4">
          <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500">
            Check Availability
          </button>
          <button className="w-full mt-2 px-4 py-2 bg-white text-indigo-600 text-sm font-semibold rounded-md border border-indigo-600 hover:bg-indigo-50">
            Message Sarah
          </button>
        </div>
      </div>
    </div>
  );
}
