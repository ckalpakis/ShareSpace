"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

export default function RegisterForm() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.fullName);
      // Show success message
      alert(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          placeholder="John Doe"
          required
          value={formData.fullName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
        />
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
