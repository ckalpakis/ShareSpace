"use client";

import { motion } from "framer-motion";
import { GraduationCap, PlaneTakeoff, Sun, Wallet } from "lucide-react";

const reasons = [
  {
    icon: <PlaneTakeoff className="w-8 h-8 text-blue-500" />,
    title: "Studying Abroad?",
    description:
      "Don't let your apartment sit empty while you're exploring the world. Cover your rent and give another student a home.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
    title: "Transferring Schools?",
    description:
      "Moving to a different university? Subleasing helps you avoid paying rent for a place you won't be using.",
  },
  {
    icon: <Sun className="w-8 h-8 text-blue-500" />,
    title: "Summer Plans?",
    description:
      "Heading home for the summer or taking an internship? Sublease your apartment and keep more money in your pocket.",
  },
  {
    icon: <Wallet className="w-8 h-8 text-blue-500" />,
    title: "Game Day Rentals?",
    description:
      "Make extra money by renting your space during football weekends, THON, and other big Penn State events.",
  },
];

export default function WhySubleaseSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Why Sublease Your Apartment?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Life as a student can be unpredictable. Whether you're studying
            abroad, transferring, or just heading home for the summer, we make
            subleasing simple and secure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="mb-4"
              >
                {reason.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
