"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SubletForm from "@/components/sublet-form";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

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

export default function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          router.push("/auth");
          return;
        }

        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", params.id)
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
  }, [params.id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Your Listing</h1>
        <div className="max-w-2xl mx-auto">
          <SubletForm initialData={property} mode="edit" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
