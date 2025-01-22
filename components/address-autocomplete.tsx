"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressAutocompleteProps {
  onSelect: (address: string) => void;
  defaultValue?: string;
  required?: boolean;
}

export default function AddressAutocomplete({
  onSelect,
  defaultValue = "",
  required = false,
}: AddressAutocompleteProps) {
  const [value, setValue] = useState(defaultValue);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = initAutocomplete;
    };

    const initAutocomplete = () => {
      if (inputRef.current) {
        autoCompleteRef.current = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            componentRestrictions: { country: "us" },
            fields: ["formatted_address"],
            types: ["address"],
          }
        );

        autoCompleteRef.current.addListener("place_changed", () => {
          const place = autoCompleteRef.current?.getPlace();
          if (place?.formatted_address) {
            setValue(place.formatted_address);
            onSelect(place.formatted_address);
          }
        });
      }
    };

    if (window.google?.maps?.places) {
      initAutocomplete();
    } else {
      loadGoogleMapsScript();
    }

    return () => {
      const script = document.querySelector(
        'script[src*="maps.googleapis.com/maps/api"]'
      );
      if (script) {
        script.remove();
      }
    };
  }, [onSelect]);

  return (
    <div className="space-y-2">
      <Label htmlFor="location">Address</Label>
      <Input
        ref={inputRef}
        type="text"
        id="location"
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Start typing your address..."
      />
    </div>
  );
}
