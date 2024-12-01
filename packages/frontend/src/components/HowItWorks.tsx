import React from "react";
import { Search, UserCheck, Calendar, Heart } from "lucide-react";

const steps = [
  {
    title: "Browse Profiles",
    description:
      "Search through verified cuddler profiles and read reviews from other users.",
    icon: Search,
  },
  {
    title: "Choose Your Match",
    description:
      "Select a cuddler based on their experience, reviews, and personality.",
    icon: UserCheck,
  },
  {
    title: "Book a Session",
    description:
      "Schedule a session at a time and place that works for both of you.",
    icon: Calendar,
  },
  {
    title: "Connect & Cuddle",
    description:
      "Meet in a safe environment and experience the comfort of platonic touch.",
    icon: Heart,
  },
];

export function HowItWorks() {
  return (
    <div id="how-it-works" className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            How CuddleConnect Works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Finding your perfect cuddle companion is easy and safe with our
            simple process.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute h-0.5 bg-gray-200 dark:bg-gray-700 w-full top-8 left-1/2" />
                )}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 relative z-10">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                  {step.title}
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {step.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
