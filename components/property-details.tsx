"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, User, Mail, Phone } from "lucide-react";
import ImageGallery from "@/components/image-gallery";
import Navbar from "@/components/navbar";

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
    <div className="mt-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm sm:text-base">{property.location}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {property.title}
          </h1>
        </div>

        <div className="relative aspect-video">
          <ImageGallery images={property.image_urls} title={property.title} />
        </div>

        <div className="p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mt-4 lg:mt-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                      Description
                    </h2>
                    <p className="text-gray-600 whitespace-pre-wrap text-sm sm:text-base">
                      {property.description}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4 order-1 lg:order-2">
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

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Property Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Price</span>
                      <span className="font-semibold text-lg">
                        ${property.price}/month
                      </span>
                    </div>

                    {typeof property.bedrooms === "number" && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Bedrooms</span>
                        <span className="text-gray-900">
                          {property.bedrooms}
                        </span>
                      </div>
                    )}

                    {typeof property.bathrooms === "number" && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Bathrooms</span>
                        <span className="text-gray-900">
                          {property.bathrooms}
                        </span>
                      </div>
                    )}

                    {/* Availability Info */}
                    <div className="pt-2 border-t">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Availability
                      </h4>
                      {property.available_from && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">From</span>
                          <span className="text-gray-900">
                            {new Date(
                              property.available_from
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      {property.available_until ? (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Until</span>
                          <span className="text-gray-900">
                            {new Date(
                              property.available_until
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Until</span>
                          <span className="text-gray-900">No end date</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
