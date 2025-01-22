"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
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

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function EditPropertyPage({ params, searchParams }: Props) {
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
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
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
