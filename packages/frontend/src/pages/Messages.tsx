import React from "react";
import { ChatWindow } from "../components/messages/ChatWindow";

export function Messages() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-[calc(100vh-4rem)]">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
