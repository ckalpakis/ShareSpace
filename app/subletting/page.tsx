"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubletForm from "@/components/sublet-form";
import ActiveListings from "@/components/active-listings";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function SublettingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">List Your Space</h1>
            <p className="text-gray-600 mb-8">
              Please log in or create an account to list your property.
            </p>
            <Link href="/auth">
              <Button size="lg">Sign In or Register</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Main subletting page for authenticated users
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">List Your Space</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Form Section */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Create New Listing
              </h2>
              <SubletForm />
            </div>
          </div>

          {/* Active Listings Section */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Your Active Listings
              </h2>
              <ActiveListings />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
