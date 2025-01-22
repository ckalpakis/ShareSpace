"use client";

import { useAuth } from "@/app/providers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubletForm from "@/components/sublet-form";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Home, Plus, Camera, MessageCircle, Star } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Show your space",
    description: "Upload high-quality photos to make your listing stand out",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Connect with students",
    description: "Chat directly with potential subletters through our platform",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Trusted by students",
    description: "Join our community of verified Penn State students",
  },
];

export default function SublettingPage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  List Your Space with Confidence
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Join thousands of Penn State students who trust us for safe
                  and easy subleasing.
                </p>
                <div className="space-y-6 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg text-blue-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/auth">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Sign In to Get Started
                  </Button>
                </Link>
              </motion.div>

              {/* Right Column - Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block"
              >
                <Image
                  src="/apartment-interior.jpg"
                  alt="Student Housing"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
            >
              List Your Space
            </motion.h1>
            <p className="text-xl text-gray-600">
              Fill out the details below to create your listing
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Create New Listing
              </h2>
            </div>
            <SubletForm />
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
