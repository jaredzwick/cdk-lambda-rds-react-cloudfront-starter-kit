export interface Booking {
  id: string;
  cuddler: {
    name: string;
    image: string;
  };
  date: string;
  time: string;
  duration: number;
  status: "pending" | "confirmed" | "completed";
  location: string;
}

export const bookings: Booking[] = [
  {
    id: "p1",
    cuddler: {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    },
    date: "2024-03-20",
    time: "14:00",
    duration: 2,
    status: "pending",
    location: "Central Park, NY",
  },
  {
    id: "u1",
    cuddler: {
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    },
    date: "2024-03-25",
    time: "15:30",
    duration: 1.5,
    status: "confirmed",
    location: "Brooklyn, NY",
  },
  {
    id: "pa1",
    cuddler: {
      name: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80",
    },
    date: "2024-03-10",
    time: "11:00",
    duration: 2,
    status: "completed",
    location: "Queens, NY",
  },
];
