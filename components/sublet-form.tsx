"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const generateFileName = (originalName: string) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split(".").pop();
  return `${timestamp}-${randomString}.${extension}`;
};

export default function SubletForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    images: [] as File[],
    bedrooms: "",
    bathrooms: "",
    availableFrom: "",
    availableUntil: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        alert("Maximum 5 images allowed");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("Must be logged in to create a listing");

      const imageUrls = [];
      for (const image of formData.images) {
        const fileName = generateFileName(image.name);

        const { data, error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(`properties/${fileName}`, image, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const fullUrl = `${SUPABASE_URL}/storage/v1/object/public/property-images/properties/${fileName}`;
        imageUrls.push(fullUrl);
      }

      const { error: insertError } = await supabase.from("properties").insert({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        image_urls: imageUrls,
        owner_id: user.id,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        available_from: formData.availableFrom,
        available_until: formData.availableUntil || null,
      });

      if (insertError) throw insertError;

      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        images: [],
        bedrooms: "",
        bathrooms: "",
        availableFrom: "",
        availableUntil: "",
      });

      alert("Property listed successfully!");
      router.refresh();
    } catch (error) {
      console.error("Full error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to create listing"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          required
          placeholder="e.g., Cozy Studio in Downtown"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          required
          placeholder="Describe your space..."
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          className="h-32"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price">Monthly Rent ($)</Label>
          <Input
            id="price"
            type="number"
            required
            placeholder="2000"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            required
            placeholder="e.g., Manhattan, NY"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            required
            placeholder="2"
            value={formData.bedrooms}
            min="0"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            required
            placeholder="1"
            min="0"
            step="0.5"
            value={formData.bathrooms}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="availableFrom">Available From</Label>
          <Input
            id="availableFrom"
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            value={formData.availableFrom}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                availableFrom: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="availableUntil">Available Until (Optional)</Label>
          <Input
            id="availableUntil"
            type="date"
            min={
              formData.availableFrom || new Date().toISOString().split("T")[0]
            }
            value={formData.availableUntil}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                availableUntil: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Photos</Label>
        <Input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        <p className="text-sm text-gray-500">
          Upload up to 5 photos of your space (Required)
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || formData.images.length === 0}
      >
        {isSubmitting ? "Creating Listing..." : "List Your Space"}
      </Button>
    </form>
  );
}
