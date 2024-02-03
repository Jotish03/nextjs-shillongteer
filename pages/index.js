import CardList from "@/components/cards/cardlist";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section/herosection";
import React from "react";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <CardList />
      <Footer />
    </main>
  );
};

export default Home;
