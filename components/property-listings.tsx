"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import PropertyCard from "./property-card";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_urls: string[];
  bedrooms?: number;
  bathrooms?: number;
  available_from?: string;
}

export default function PropertyListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setProperties(data);
      } else {
        console.error("No properties found");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="h-[400px] bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">
          No properties available
        </h3>
        <p className="mt-2 text-gray-500">Check back later for new listings.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          title={property.title}
          description={property.description}
          price={property.price}
          location={property.location}
          imageUrl={property.image_urls?.[0] || null}
          imageUrls={property.image_urls?.slice(1) || []}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          availableFrom={property.available_from}
        />
      ))}
    </div>
  );
}
