import React from 'react';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturedCuddlers } from '../components/FeaturedCuddlers';
import { BecomeCuddler } from '../components/BecomeCuddler';

export function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturedCuddlers />
      <BecomeCuddler />
    </>
  );
}