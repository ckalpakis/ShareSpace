"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SubletForm from "@/components/sublet-form";
import { useAuth } from "@/app/providers";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_urls: string[];
  available_from?: string;
  available_until?: string;
  owner_id: string;
  bedrooms?: number;
  bathrooms?: number;
}

export default function EditPropertyClient({ id }: { id: string }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!user) {
          router.push("/auth");
          return;
        }

        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        // Verify ownership
        if (data.owner_id !== user.id) {
          router.push("/subletting");
          return;
        }

        setProperty(data);
      } catch (error) {
        console.error("Error:", error);
        router.push("/subletting");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, router, user]);

  if (loading) {
    return null; // Parent component handles loading state
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Edit Your Listing</h1>
      <div className="max-w-2xl mx-auto">
        <SubletForm initialData={property} mode="edit" />
      </div>
    </>
  );
}
