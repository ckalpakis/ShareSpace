"use client";

import { motion } from "framer-motion";
import { Search, Building, Users, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });

  const handleSearch = () => {
    if (dates.from || dates.to) {
      const params = new URLSearchParams();
      if (dates.from) params.append("from", dates.from);
      if (dates.to) params.append("to", dates.to);
      router.push(`/renting?${params.toString()}`);
    }
  };

  return (
    <div className="relative h-[700px] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('/campus.jpg')] bg-cover bg-center"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Find Your Perfect
                <span className="block mt-2">Penn State Home</span>
              </h1>
              <p className="text-xl text-white/90">
                The easiest way to find and list student housing in State
                College. Join thousands of Penn State students who trust us.
              </p>

              {/* Date Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="bg-white/95 backdrop-blur-sm p-2 rounded-2xl shadow-lg flex flex-col md:flex-row gap-2"
              >
                <div className="flex-1 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500 ml-2" />
                  <input
                    type="date"
                    placeholder="Available From"
                    value={dates.from}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setDates((prev) => ({ ...prev, from: e.target.value }))
                    }
                    className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500 ml-2" />
                  <input
                    type="date"
                    placeholder="Available Until"
                    value={dates.to}
                    min={dates.from || new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setDates((prev) => ({ ...prev, to: e.target.value }))
                    }
                    className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="rounded-xl px-6 bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Places
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-8 text-white/90"
              >
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>
                    <strong>Growing</strong> Student Community
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>
                    <strong>4.9/5</strong> Student Rating
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden md:block relative h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-900/20 rounded-3xl overflow-hidden">
              <Image
                src="/apartment-interior.jpg"
                alt="Penn State Student Housing"
                fill
                className="object-cover rounded-3xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-blue-900/50 to-transparent"
      />
    </div>
  );
}
