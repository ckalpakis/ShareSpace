"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome to ShareSpace
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account or create a new one
            </p>
          </div>

          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm />
              </TabsContent>

              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
