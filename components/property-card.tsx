"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Bed, Bath, Calendar } from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string | null;
  bedrooms?: number;
  bathrooms?: number;
  availableFrom?: string;
}

export default function PropertyCard({
  id,
  title,
  description,
  price,
  location,
  imageUrl,
  bedrooms,
  bathrooms,
  availableFrom,
}: PropertyCardProps) {
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const displayImage =
    imageUrl && isValidUrl(imageUrl) ? imageUrl : "/api/placeholder/800/600";

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/property/${id}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <div className="relative aspect-video">
            <Image
              src={displayImage}
              alt={title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={true}
            />
          </div>
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
            <div className="flex items-center text-lg font-semibold text-primary">
              <DollarSign className="h-5 w-5" />
              {price.toLocaleString()}/month
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-3 text-gray-600">
              {typeof bedrooms === "number" && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span className="text-sm">{bedrooms} bed</span>
                </div>
              )}
              {typeof bathrooms === "number" && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span className="text-sm">{bathrooms} bath</span>
                </div>
              )}
              {availableFrom && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    Available {formatDate(availableFrom)}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
