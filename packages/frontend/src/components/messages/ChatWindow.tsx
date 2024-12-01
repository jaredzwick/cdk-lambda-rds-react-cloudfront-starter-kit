import React, { useState } from "react";
import { Info, MapPin, Star, Calendar, Shield } from "lucide-react";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";
import { BookingCalendar } from "./BookingCalendar";

const messages = [
  {
    id: "2",
    content:
      "Hello! Yes, I have availability on Saturday afternoon. What time works best for you?",
    timestamp: "10:32 AM",
    sender: "other",
  },
  {
    id: "3",
    content: "Saturday at 2 PM would be perfect!",
    timestamp: "10:33 AM",
    sender: "user",
  },
];

export function ChatWindow() {
  const [newMessage, setNewMessage] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const handleSend = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
      {/* Enhanced Chat Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
              alt="Sarah Johnson"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Sarah Johnson
                </h3>
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  New York, NY
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  4.9 (128)
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Toggle profile information"
            >
              <Info className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Expandable Profile Section */}
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
          <div className="pt-4 flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional Cuddler • $60/hour
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Available: Mon-Sun, 9 AM - 9 PM
              </p>
            </div>
            <button
              onClick={() => setShowBooking(true)}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>

      {/* Booking Calendar */}
      {showBooking && <BookingCalendar onClose={() => setShowBooking(false)} />}

      {/* Message Input */}
      <MessageInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSend}
      />
    </div>
  );
}
