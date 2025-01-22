"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/app/providers";
import PropertyCard from "@/components/property-card";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

export default function ActiveListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const fetchProperties = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);

      if (error) throw error;

      setProperties((prev) => prev.filter((property) => property.id !== id));
      toast.success("Listing deleted successfully");
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing");
    }
  };

  if (loading) {
    return <div>Loading your listings...</div>;
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">
          No active listings
        </h3>
        <p className="mt-2 text-gray-500">
          Your listed properties will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="relative group">
          <PropertyCard
            {...property}
            imageUrl={property.image_urls[0] || null}
            imageUrls={property.image_urls.slice(1)}
            onDelete={() => handleDelete(property.id)}
            showActions={true}
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={() => router.push(`/subletting/edit/${property.id}`)}
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
