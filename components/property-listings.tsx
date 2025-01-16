"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

interface Property {
  id: string;
  title: string;
  description: string;
  rentAmount: number;
  location: string;
  photos: string[];
}

export function PropertyListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  async function fetchProperties() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/properties?${searchParams.toString()}`
      );
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error("Failed to fetch properties");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  if (properties.length === 0) {
    return <div>No properties found matching your criteria.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Card>
      <CardContent className="p-4">
        <Image
          src={property.photos[0] || "/placeholder.svg"}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <p className="text-lg font-medium">${property.rentAmount}/month</p>
      </CardContent>
      <CardFooter className="p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{property.title}</DialogTitle>
              <DialogDescription>{property.location}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Image
                src={property.photos[0] || "/placeholder.svg"}
                alt={property.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <p className="text-gray-700 mb-4">{property.description}</p>
              <p className="text-xl font-semibold">
                ${property.rentAmount}/month
              </p>
              <Button className="w-full mt-4">Contact Owner</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
