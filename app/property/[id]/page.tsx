"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, Calendar, DollarSign, User } from "lucide-react";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_urls: string[];
  created_at: string;
  owner_id: string;
  owner_email?: string;
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const { data: propertyData, error: propertyError } = await supabase
        .from("properties")
        .select("*")
        .eq("id", params.id)
        .single();

      if (propertyError) throw propertyError;

      if (propertyData) {
        // Fetch owner's email if property exists
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("email")
          .eq("id", propertyData.owner_id)
          .single();

        if (!userError && userData) {
          propertyData.owner_email = userData.email;
        }

        setProperty(propertyData);
      }
    } catch (err) {
      setError("Failed to load property details");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Error</h1>
            <p className="mt-2 text-gray-600">
              {error || "Property not found"}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {property.title}
          </h1>

          {/* Location */}
          <p className="flex items-center text-gray-600 mb-6">
            <MapPin className="h-4 w-4 mr-2" />
            {property.location}
          </p>

          {/* Main Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
            <Image
              src={property.image_urls?.[0] || "/api/placeholder/1200/800"}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Property Info Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <h2 className="text-2xl font-semibold mb-4">About this space</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {property.description}
              </p>

              {/* Additional Details */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
                  <span className="text-gray-600">${property.price}/month</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                  <span className="text-gray-600">Available Now</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 p-6 rounded-lg h-fit">
              <h3 className="text-lg font-semibold mb-4">Contact Owner</h3>
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-600">{property.owner_email}</span>
              </div>
              <Button className="w-full">Send Message</Button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
