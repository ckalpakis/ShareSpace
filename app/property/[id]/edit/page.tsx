"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import SubletForm from "@/components/sublet-form";
import { useAuth } from "@/app/providers";

interface PageParams {
  params: { id: string };
}

export default function EditPropertyPage({ params }: PageParams) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error("Error:", error);
      router.push("/subletting");
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
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
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
        <h1 className="text-3xl font-bold mb-8">Edit Property</h1>
        <SubletForm initialData={property} mode="edit" />
      </main>
      <Footer />
    </div>
  );
}
