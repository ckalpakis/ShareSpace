"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Building className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              ShareSpace PSU
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <Link
              href="/privacy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-blue-600 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Penn State Housing. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
