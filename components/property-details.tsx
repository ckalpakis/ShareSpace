"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, User, Mail, Phone } from "lucide-react";
import ImageGallery from "@/components/image-gallery";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_urls: string[];
  created_at: string;
  owner_id: string;
  owner_details?: {
    full_name: string;
    email: string;
    phone?: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  available_from?: string;
  available_until?: string;
}

interface PropertyDetailsProps {
  initialData: Property;
}

export default function PropertyDetails({ initialData }: PropertyDetailsProps) {
  const [property] = useState<Property>(initialData);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Your existing JSX here */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{property.location}</span>
                </div>

                <ImageGallery
                  images={property.image_urls}
                  title={property.title}
                />

                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {property.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-gray-400" />
                    <span className="text-gray-600">
                      {property.owner_details?.full_name || "Owner"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-gray-400" />
                    <a
                      href={`mailto:${property.owner_details?.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {property.owner_details?.email}
                    </a>
                  </div>
                  {property.owner_details?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-gray-400" />
                      <a
                        href={`tel:${property.owner_details.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {property.owner_details.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price</span>
                    <span className="font-semibold text-lg">
                      ${property.price}/month
                    </span>
                  </div>
                  {/* Add other property details here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
