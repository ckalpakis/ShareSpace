"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image_urls: string[];
  created_at: string;
}

export default function ActiveListings() {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setListings(data || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      const { error } = await supabase.from("properties").delete().eq("id", id);

      if (error) throw error;

      setListings((prev) => prev.filter((listing) => listing.id !== id));
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Failed to delete listing");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((n) => (
          <div key={n} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">
            You haven't listed any properties yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {listings.map((listing) => (
        <Card key={listing.id}>
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-48 h-48">
              <Image
                src={listing.image_urls[0] || "/api/placeholder/400/400"}
                alt={listing.title}
                className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                fill
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>

            <div className="flex-1 p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">
                      {listing.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {listing.location}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">
                    ${listing.price.toLocaleString()}/month
                  </p>
                </div>
              </CardHeader>

              <CardContent className="p-0 mb-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {listing.description}
                </p>
              </CardContent>

              <CardFooter className="p-0 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(listing.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
