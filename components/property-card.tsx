"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string | null;
  imageUrls?: string[];
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
  imageUrls = [],
  bedrooms,
  bathrooms,
  availableFrom,
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const allImages = [...(imageUrl ? [imageUrl] : []), ...imageUrls].filter(
    (img) => img !== null
  );

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getDisplayImage = (url: string) => {
    return isValidUrl(url) ? url : "/api/placeholder/800/600";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

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
        <Card
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <div className="relative aspect-video">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={getDisplayImage(allImages[currentImageIndex])}
                  alt={title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {allImages.length > 1 && showControls && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
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
