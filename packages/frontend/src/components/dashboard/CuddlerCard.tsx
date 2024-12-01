import React from "react";
import { MapPin, Star, Shield, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CuddlerCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  rate: number;
  verified: boolean;
  specialties: string[];
}

export function CuddlerCard({
  id,
  name,
  image,
  location,
  rating,
  reviews,
  rate,
  verified,
  specialties,
}: CuddlerCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <button className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700">
          <Heart className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          {verified && <Shield className="h-5 w-5 text-green-500" />}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
            {rating} ({reviews})
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
            ${rate}/hour
          </span>
          <button
            onClick={() => navigate(`/cuddlers/${id}`)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
