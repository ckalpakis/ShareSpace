"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function SearchForm() {
  // Example state variables
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Example submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: You can console.log or handle any search logic here
    console.log("Searching for:", { location, priceRange });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
      {/* Location Input */}
      <div>
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <Input
          id="location"
          placeholder="Enter city or neighborhood"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Price Range Select */}
      <div>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-1000">$0 - $1,000</SelectItem>
            <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
            <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
            <SelectItem value="3000+">$3,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      <Button type="submit" className="w-full">
        Search
      </Button>
    </form>
  );
}
