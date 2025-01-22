"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Building, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";

export default function NavbarClient() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/renting", label: "Find Housing" },
    { href: "/subletting", label: "List Your Space" },
  ];

  return (
    <div className="container mx-auto px-4 h-16">
      <nav className="flex items-center justify-between h-full">
        <Link href="/" className="flex items-center space-x-2">
          <Building className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">
            ShareSpace PSU
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group ${
                pathname === item.href
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Button */}
        <div className="hidden md:block">
          {isAuthenticated ? (
            <Button
              variant="outline"
              className="border-blue-200 hover:border-blue-300"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden py-4 space-y-2"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}
