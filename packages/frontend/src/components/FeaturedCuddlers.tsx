import React from "react";
import { Star, MapPin, Clock } from "lucide-react";

const cuddlers = [
  {
    name: "Alex Thompson",
    location: "New York, NY",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 128,
    rate: "$60/hour",
    specialties: ["Therapeutic Touch", "Anxiety Relief", "Meditation"],
  },
  {
    name: "Jordan Lee",
    location: "Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 93,
    rate: "$55/hour",
    specialties: ["Stress Relief", "Comfort Care", "Active Listening"],
  },
  {
    name: "Sam Rivera",
    location: "Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    rating: 5.0,
    reviews: 67,
    rate: "$65/hour",
    specialties: ["Emotional Support", "Grief Support", "Mindfulness"],
  },
];

export function FeaturedCuddlers() {
  return (
    <div id="browse" className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Featured Cuddlers
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Meet some of our highest-rated and most experienced cuddlers.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {cuddlers.map((cuddler) => (
            <div
              key={cuddler.name}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={cuddler.image}
                  alt={cuddler.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {cuddler.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                        {cuddler.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                        {cuddler.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({cuddler.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {cuddler.rate}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cuddler.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <button className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-indigo-400">
                    Book Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-6 py-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-inset ring-indigo-200 dark:ring-indigo-800 hover:bg-indigo-50 dark:hover:bg-gray-700">
            View All Cuddlers
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
