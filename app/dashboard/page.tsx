"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/providers";
import {
  Settings,
  Home,
  LogOut,
  User,
  Mail,
  Key,
  Building,
  Phone,
  Trash2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import ActiveListings from "@/components/active-listings";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const tabs = [
  { id: "listings", label: "My Listings", icon: Building },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("listings");
  const router = useRouter();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: user?.email || "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: userInfo.email,
      });

      if (error) throw error;

      setIsEditing(false);
      toast.success("Email updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update email");
    }
  };

  const handleDeleteAccount = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }

    try {
      // First delete all listings associated with the user
      const { error: listingsError } = await supabase
        .from("properties")
        .delete()
        .eq("owner_id", user?.id);

      if (listingsError) throw listingsError;

      // Then delete the user account
      const { error: userError } = await supabase.auth.admin.deleteUser(
        user?.id!
      );

      if (userError) throw userError;

      await supabase.auth.signOut();
      router.push("/");
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
      setIsDeleting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "listings":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Your Active Listings
              </h2>
              <ActiveListings />
            </div>
          </motion.div>
        );
      case "settings":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-6"
          >
            {/* Profile Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                Profile Information
              </h2>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) =>
                          setUserInfo((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="max-w-md"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={handleUpdateProfile}>
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {user?.email}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="mt-2"
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
                <Key className="w-6 h-6 text-blue-600" />
                Account Actions
              </h2>
              <div className="space-y-4">
                <Button
                  variant="destructive"
                  onClick={handleSignOut}
                  className="w-full sm:w-auto"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Once you delete your account, there is no going back. This
                    action will also delete all your listings.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="w-full sm:w-auto"
                  >
                    {isDeleting ? "Click again to confirm" : "Delete Account"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64">
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
