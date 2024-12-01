import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80",
];

export function PublicProfileGallery() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
        <img
          src={images[currentImage]}
          alt={`Gallery ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900 dark:text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
            >
              <ChevronRight className="h-6 w-6 text-gray-900 dark:text-white" />
            </button>
          </>
        )}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentImage === index
                ? "bg-indigo-600 dark:bg-indigo-500"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
