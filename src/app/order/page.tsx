"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const OrderPage = () => {
  const router = useRouter();

  const [productCount, setProductCount] = useState(1);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-50 h-dvh">
      <div className="max-w-7xl mx-auto p-6 flex flex-1 flex-col">
        {/* Product Details */}
        <div className="p-6">
          {/* Product Image */}
          <div className="w-full flex items-center justify-between">
            {/* Product image */}
            <div className="h-20 w-20 bg-gray-200 rounded-lg overflow-hidden flex justify-center items-center p-2 shadow-lg">
              <Image
                src={"/opexn_logo.png"}
                alt="product-image"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>

            {/* product count button */}
            <div className="flex items-center justify-evenly">
              <div
                className="p-2 rounded-full border shadow-lg hover:bg-gray-200"
                onClick={() => {
                  setProductCount(productCount + 1);
                }}
              >
                <Plus className="h-5 w-5" />
              </div>
              <div className="px-4 select-none">{productCount}</div>
              <div
                className={cn(
                  "p-2 rounded-full border shadow-lg hover:bg-gray-200",
                  productCount === 1 && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => {
                  if (productCount > 1) {
                    setProductCount(productCount - 1);
                  }
                }}
              >
                <Minus className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Premium Coffee Blend
              </h2>
              <p className="text-gray-600 mt-2">
                Rich and aromatic coffee blend made from the finest beans.
                Perfect for your morning boost or afternoon pick-me-up.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span>Category: Beverages</span>
              </div>
              <div className="text-sm text-gray-500">
                <span>Product Count: {productCount}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  Total Price:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{(299 * productCount).toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ₹299.00 × {productCount} item{productCount > 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Delivery Details
            </h3>

            <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="text-sm text-gray-600">
                  123 Main Street, Apartment 4B
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <div className="text-sm text-gray-600">12345</div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <div className="text-sm text-gray-600">California</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="text-sm text-gray-600">+1 (555) 123-4567</div>
              </div>
            </div>
          </div>

          {/* Order complete button */}
          <div className="mt-8">
            {isOrderConfirmed ? (
              <AlertDialog open={isOrderConfirmed}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Wanna go to dashboard or exhibition
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => router.push("/")}
                    >
                      Exhibition
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => router.push("/user-dashboard")}
                    >
                      Dashboard
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                    Place Order - ₹{(299 * productCount).toFixed(2)}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please confirm that you want to place this order for ₹
                      {(299 * productCount).toFixed(2)}. Once confirmed, your
                      order will be processed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => setIsOrderConfirmed(true)}
                    >
                      Confirm Order
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
