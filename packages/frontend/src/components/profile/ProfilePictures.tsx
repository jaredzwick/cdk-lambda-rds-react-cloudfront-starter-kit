import React, { useState } from "react";
import { Upload, X, Plus } from "lucide-react";

export function ProfilePictures() {
  const [pictures, setPictures] = useState<string[]>([
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
  ]);

  const handleRemove = (index: number) => {
    setPictures(pictures.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Profile Pictures
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pictures.map((picture, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={picture}
              alt={`Profile ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        ))}
        {pictures.length < 4 && (
          <label className="relative aspect-square cursor-pointer">
            <input type="file" className="hidden" accept="image/*" />
            <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center hover:border-indigo-500 dark:hover:border-indigo-400">
              <Plus className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Add Photo
              </span>
            </div>
          </label>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
        <Upload className="h-4 w-4 mr-1" />
        Upload up to 4 photos. First photo will be your profile picture.
      </p>
    </div>
  );
}
