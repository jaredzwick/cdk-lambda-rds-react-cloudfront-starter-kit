import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Busy Professional",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    quote:
      "The cuddle sessions have helped me tremendously with my anxiety. It's amazing how therapeutic platonic touch can be.",
  },
  {
    name: "Michael Chen",
    role: "Graduate Student",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    quote:
      "As someone far from family, these sessions provide the comfort and connection I've been missing.",
  },
  {
    name: "Emily Rodriguez",
    role: "Healthcare Worker",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
    quote:
      "After long shifts at the hospital, these sessions help me decompress and feel human again.",
  },
];

export function Testimonials() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Real experiences from people who've discovered the power of
            therapeutic touch.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col justify-between bg-white dark:bg-gray-800 p-6 shadow-lg rounded-2xl"
            >
              <div className="flex items-center gap-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
