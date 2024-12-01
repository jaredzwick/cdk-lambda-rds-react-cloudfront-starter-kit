import React from "react";

interface ChatListItemProps {
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

export function ChatListItem({
  name,
  image,
  lastMessage,
  time,
  unread,
}: ChatListItemProps) {
  return (
    <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
              {time}
            </span>
          </div>
          <p
            className={`text-sm truncate ${
              unread
                ? "text-gray-900 dark:text-white font-medium"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {lastMessage}
          </p>
        </div>
        {unread && (
          <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full"></div>
        )}
      </div>
    </div>
  );
}
