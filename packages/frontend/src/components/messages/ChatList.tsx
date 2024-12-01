import React from "react";
import { Search } from "lucide-react";
import { ChatListItem } from "./ChatListItem";

const conversations = [
  {
    id: "1",
    name: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    lastMessage: "Looking forward to our session!",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    lastMessage: "Thank you for the wonderful session",
    time: "1h ago",
    unread: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
    lastMessage: "Is tomorrow at 2 PM still good?",
    time: "3h ago",
    unread: true,
  },
];

export function ChatList() {
  return (
    <div className="w-full max-w-sm border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Messages
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-12rem)]">
        {conversations.map((conversation) => (
          <ChatListItem key={conversation.id} {...conversation} />
        ))}
      </div>
    </div>
  );
}
