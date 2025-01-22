"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        {/* Main Image */}
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover cursor-pointer"
          priority
          onClick={() => setShowFullscreen(true)}
        />

        {/* Image Grid Preview */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative w-16 h-16 rounded overflow-hidden cursor-pointer"
                onClick={() => {
                  setCurrentIndex(index + 1);
                  setShowFullscreen(true);
                }}
              >
                <Image
                  src={image}
                  alt={`${title} ${index + 2}`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>

            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl aspect-video"
            >
              <Image
                src={images[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
