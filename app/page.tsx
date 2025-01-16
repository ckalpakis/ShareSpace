"use client";

import React from "react";
import Hero from "@/components/hero";
import FeaturedListings from "@/components/featured-listings";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedListings />
      </main>
      <Footer />
    </div>
  );
}
