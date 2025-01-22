"use client";

import { motion } from "framer-motion";
import { Camera, MessageCircle, Home } from "lucide-react";

const steps = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "List Your Space",
    description:
      "Take photos and create your listing in minutes. It's free and easy.",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Connect with Students",
    description:
      "Chat with verified Penn State students interested in your space.",
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: "Finalize the Deal",
    description: "Agree on terms and complete the sublease process securely.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've made subleasing your apartment as simple as possible. Here's
            how to get started.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
