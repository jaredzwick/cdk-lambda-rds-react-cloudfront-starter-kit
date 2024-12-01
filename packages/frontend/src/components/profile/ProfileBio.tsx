import React, { useState } from "react";
import { FileText } from "lucide-react";

export function ProfileBio() {
  const [bio, setBio] = useState("");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          About Me
        </h2>
      </div>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell others about yourself, your cuddling style, and what makes you a great cuddle companion..."
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
      />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {500 - bio.length} characters remaining
      </p>
    </div>
  );
}
