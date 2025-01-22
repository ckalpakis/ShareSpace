"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/property-card";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Building, Calendar, Search, Filter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import RentingClient from "./renting-client";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_urls: string[];
  available_from: string;
  available_until: string | null;
  owner_id: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function RentingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <Suspense fallback={<LoadingSkeleton />}>
          <RentingClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="text-center space-y-4">
        <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}
