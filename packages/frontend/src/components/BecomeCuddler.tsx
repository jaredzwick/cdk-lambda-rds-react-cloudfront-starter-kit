import React from "react";
import { DollarSign, Shield, Users, Award } from "lucide-react";

const benefits = [
  {
    title: "Earn Money",
    description:
      "Set your own rates and schedule. Many cuddlers earn $500-2000 per week.",
    icon: DollarSign,
  },
  {
    title: "Safe Platform",
    description:
      "Our verification system and safety features protect both cuddlers and clients.",
    icon: Shield,
  },
  {
    title: "Growing Community",
    description:
      "Join a supportive community of professional cuddlers and share experiences.",
    icon: Users,
  },
  {
    title: "Get Certified",
    description:
      "Access our training program and become a certified professional cuddler.",
    icon: Award,
  },
];

export function BecomeCuddler() {
  return (
    <div id="become" className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Become a Professional Cuddler
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Turn your natural empathy and caring nature into a rewarding career.
            Join our platform as a verified cuddler.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 dark:bg-indigo-500">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                  {benefit.title}
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-16 flex justify-center">
          <button className="rounded-md bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-400">
            Apply to Become a Cuddler
          </button>
        </div>
      </div>
    </div>
  );
}
