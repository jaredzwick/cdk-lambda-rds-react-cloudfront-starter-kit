import React from 'react';
import { Heart, Shield, Clock, Award } from 'lucide-react';

const benefits = [
  {
    title: 'Safe Environment',
    description: 'All our cuddlers are verified professionals who follow strict safety protocols.',
    icon: Shield,
  },
  {
    title: 'Stress Relief',
    description: 'Experience reduced anxiety and improved emotional well-being through therapeutic touch.',
    icon: Heart,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Book sessions at your convenience with our easy-to-use scheduling system.',
    icon: Clock,
  },
  {
    title: 'Certified Practitioners',
    description: 'Our cuddlers are trained and certified in professional therapeutic touch.',
    icon: Award,
  },
];

export function Benefits() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Cuddle Service?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience the many benefits of platonic touch therapy in a professional and caring environment.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <dt className="text-xl font-semibold leading-7 text-gray-900">
                  {benefit.title}
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  {benefit.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}