import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { FeaturedCuddlers } from "../components/FeaturedCuddlers";
import { BecomeCuddler } from "../components/BecomeCuddler";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <FeaturedCuddlers />
        <BecomeCuddler />
      </main>
      <Footer />
    </div>
  );
}
