"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/property-card";
import { motion } from "framer-motion";
import { Building, Calendar, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function RentingClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      const fromDate = searchParams.get("from");
      const toDate = searchParams.get("to");

      let query = supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (fromDate) {
        query = query.gte("available_from", fromDate);
      }
      if (toDate) {
        query = query.lte("available_until", toDate);
      }

      try {
        const { data, error } = await query;
        if (error) throw error;

        const filteredProperties = data.filter((property) => {
          const isAvailableFrom =
            !fromDate ||
            new Date(property.available_from) <= new Date(fromDate);
          const isAvailableUntil =
            !toDate ||
            (property.available_until &&
              new Date(property.available_until) >= new Date(toDate));

          return isAvailableFrom && isAvailableUntil;
        });

        setProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Building className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">
            Finding perfect spaces for you...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
        >
          Find Your Perfect Space
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          Discover student housing that feels like home
        </motion.p>
      </div>

      {/* Search Filters */}
      {(searchParams.get("from") || searchParams.get("to")) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white rounded-2xl shadow-sm border border-blue-100 p-6 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="w-5 h-5 text-blue-600" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Available:</p>
                <p className="text-sm">
                  {searchParams.get("from") && (
                    <span>
                      From{" "}
                      {new Date(searchParams.get("from")!).toLocaleDateString()}
                    </span>
                  )}
                  {searchParams.get("to") && (
                    <span>
                      {" "}
                      until{" "}
                      {new Date(searchParams.get("to")!).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="ml-auto border-blue-200 hover:border-blue-300"
              onClick={() => router.push("/")}
            >
              <Filter className="w-4 h-4 mr-2" />
              Modify Search
            </Button>
          </div>
        </motion.div>
      )}

      {/* Results Count */}
      {properties.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-gray-600 max-w-4xl mx-auto flex justify-center items-center"
        >
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            <p className="text-lg font-medium">
              Found <span className="text-blue-600">{properties.length}</span>{" "}
              available {properties.length === 1 ? "space" : "spaces"}
            </p>
          </div>
        </motion.div>
      )}

      {/* Properties Grid */}
      {properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white rounded-2xl shadow-sm max-w-2xl mx-auto"
        >
          <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            No properties found for these dates
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Try adjusting your search dates or check back later. New properties
            are added daily!
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="transform transition-all duration-300"
            >
              <PropertyCard
                {...property}
                imageUrl={property.image_urls[0] || null}
                imageUrls={property.image_urls.slice(1)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
