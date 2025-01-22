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

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const validateImage = (file: File) => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "File must be an image (JPEG, PNG, WEBP, HEIC)";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size must be less than 5MB";
  }

  return null;
};

const validateAddress = (address: string) => {
  return address.includes("State College, PA") && address.includes("16801");
};

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
  available_until?: string;
  owner_id: string;
}

interface SubletFormProps {
  initialData?: Property | null;
  mode?: "create" | "edit";
}

export default function SubletForm({
  initialData,
  mode = "create",
}: SubletFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "",
    location: initialData?.location || "",
    images: [] as File[],
    existingImages: initialData?.image_urls || [],
    bedrooms: initialData?.bedrooms?.toString() || "",
    bathrooms: initialData?.bathrooms?.toString() || "",
    availableFrom: initialData?.available_from || "",
    availableUntil: initialData?.available_until || "",
    street: initialData?.location?.split(",")[0] || "",
    address2: "", // Optional unit/apt number
    zipCode: "16801", // Default State College zip
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 10) {
        alert("Maximum 10 images allowed");
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

    // Add address validation
    if (!validateAddress(formData.location)) {
      alert("Please enter a valid address starting with a street number");
      return;
    }

    setIsSubmitting(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("Must be logged in to update listing");

      // Handle new image uploads
      const imageUrls = [...formData.existingImages];
      for (const image of formData.images) {
        const fileName = generateFileName(image.name);
        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(`properties/${fileName}`, image);

        if (uploadError) throw uploadError;
        const fullUrl = `${SUPABASE_URL}/storage/v1/object/public/property-images/properties/${fileName}`;
        imageUrls.push(fullUrl);
      }

      const updateData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        image_urls: imageUrls,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        available_from: formData.availableFrom,
        available_until: formData.availableUntil || null,
      };

      const { error: updateError } =
        mode === "edit"
          ? await supabase
              .from("properties")
              .update(updateData)
              .eq("id", initialData?.id)
          : await supabase
              .from("properties")
              .insert({ ...updateData, owner_id: user.id });

      if (updateError) throw updateError;

      router.refresh();

      alert(`Property ${mode === "edit" ? "updated" : "listed"} successfully!`);
      if (mode === "edit") {
        router.push("/subletting");
      } else {
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          images: [],
          existingImages: [],
          bedrooms: "",
          bathrooms: "",
          availableFrom: "",
          availableUntil: "",
          street: "",
          address2: "",
          zipCode: "16801",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update listing"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add image preview and removal functionality
  const removeExistingImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== indexToRemove),
    }));
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

        <div className="space-y-4">
          <Label>State College Address</Label>

          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              required
              placeholder="123 Beaver Ave"
              value={formData.street}
              onChange={(e) => {
                const street = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  street,
                  location: `${street}${
                    prev.address2 ? `, ${prev.address2}` : ""
                  }, State College, PA ${prev.zipCode}`,
                }));
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address2">Apartment/Unit (Optional)</Label>
            <Input
              id="address2"
              placeholder="Apt 4B"
              value={formData.address2}
              onChange={(e) => {
                const address2 = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  address2,
                  location: `${prev.street}${
                    address2 ? `, ${address2}` : ""
                  }, State College, PA ${prev.zipCode}`,
                }));
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input value="State College" disabled className="bg-gray-50" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => {
                  const zipCode = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    zipCode,
                    location: `${prev.street}${
                      prev.address2 ? `, ${prev.address2}` : ""
                    }, State College, PA ${zipCode}`,
                  }));
                }}
                placeholder="16801"
                maxLength={5}
                pattern="[0-9]{5}"
              />
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Enter your complete State College address
          </p>
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
          Upload up to 10 photos of your space (Required)
        </p>
      </div>

      {/* Show existing images with remove option */}
      {formData.existingImages.length > 0 && (
        <div className="space-y-2">
          <Label>Current Images</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.existingImages.map((url, index) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt={`Property ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? mode === "edit"
            ? "Updating..."
            : "Creating Listing..."
          : mode === "edit"
          ? "Update Property"
          : "List Your Space"}
      </Button>
    </form>
  );
}
