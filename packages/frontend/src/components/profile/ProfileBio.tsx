import { useState } from "react";
import { FileText } from "lucide-react";

export function ProfileBio() {
  const [bio, setBio] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">About Me</h2>
      </div>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell others about yourself, your cuddling style, and what makes you a great cuddle companion..."
        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p className="mt-2 text-sm text-gray-500">
        {500 - bio.length} characters remaining
      </p>
    </div>
  );
}
