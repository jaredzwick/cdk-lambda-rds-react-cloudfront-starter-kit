import React from "react";

interface MessageProps {
  content: string;
  timestamp: string;
  sender: "user" | "other";
}

export function Message({ content, timestamp, sender }: MessageProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] ${
          isUser ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
        } rounded-lg px-4 py-2`}
      >
        <p className="text-sm">{content}</p>
        <span
          className={`text-xs ${
            isUser ? "text-indigo-200" : "text-gray-500"
          } mt-1 block`}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
}
