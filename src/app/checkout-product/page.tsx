"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, User, Phone, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// ✅ Define schema here instead of external file for clarity
const AddressFormSchema = z.object({
  address: z.string().min(5, "Address is required"),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, "Postal code must be exactly 6 digits"), // ✅ string, not number
  state: z.string().min(2, "State is required"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"), // simple validation
});

const CheckoutProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "1";

  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      address: "",
      postalCode: "",
      state: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof AddressFormSchema>) => {
    console.log("form value: ", values);
    router.push(`/order?productId=${productId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:bg-orange-50 border-orange-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Button>
          <div className="flex-1">
            <nav className="text-sm text-gray-500">
              Home / Exhibitors / Product / Checkout
            </nav>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Address */}
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Delivery Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Enter your complete address"
                                {...field}
                                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Postal Code */}
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                Postal Code
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text" // ✅ keep it text, not number
                                  maxLength={6}
                                  placeholder="e.g. 560001"
                                  {...field}
                                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* State */}
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">
                                State
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="e.g. Karnataka"
                                  {...field}
                                  className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Phone Number */}
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                maxLength={10}
                                placeholder="e.g. 9876543210"
                                {...field}
                                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        {form.formState.isSubmitting
                          ? "Processing..."
                          : "Continue to Order"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Phone Support
                        </p>
                        <p className="text-sm text-gray-600">+91 98765 43210</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Email Support
                        </p>
                        <p className="text-sm text-gray-600">
                          support@example.com
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 text-center mb-4">
                      Why Choose Us?
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          Secure Payment Processing
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          Fast & Reliable Delivery
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          24/7 Customer Support
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">
                          Easy Returns & Exchanges
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
