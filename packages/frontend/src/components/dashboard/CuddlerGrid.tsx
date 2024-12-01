import React from "react";
import { CuddlerCard } from "./CuddlerCard";

const cuddlers = [
  {
    id: "1",
    name: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    location: "New York, NY",
    rating: 4.9,
    reviews: 128,
    rate: 60,
    verified: true,
    specialties: ["Anxiety Relief", "Therapeutic Touch", "Meditation"],
  },
  {
    id: "2",
    name: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    location: "Brooklyn, NY",
    rating: 4.8,
    reviews: 93,
    rate: 55,
    verified: true,
    specialties: ["Stress Relief", "Comfort Care"],
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
    location: "Queens, NY",
    rating: 5.0,
    reviews: 67,
    rate: 65,
    verified: true,
    specialties: ["Emotional Support", "Mindfulness"],
  },
  // Add more cuddlers...
];

export function CuddlerGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cuddlers.map((cuddler) => (
        <CuddlerCard key={cuddler.id} {...cuddler} />
      ))}
    </div>
  );
}
