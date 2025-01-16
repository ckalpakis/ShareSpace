"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Gradient overlay with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/70 z-10"
      />

      {/* Placeholder pattern background with animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 -z-10"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-pattern"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <rect width="32" height="32" fill="#2C3E50" />
              <circle cx="16" cy="16" r="2" fill="#34495E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </motion.div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Find or List Your Space Effortlessly
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-6 text-lg leading-8 text-gray-300"
          >
            The easiest way to find your next home or sublet your space. Connect
            with trusted renters and spaces in your area.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4"
          >
            <Link href="/subletting">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100"
              >
                List Your Space
              </Button>
            </Link>
            <Link href="/renting">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white/10"
              >
                Find a Space
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
