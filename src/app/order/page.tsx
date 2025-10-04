"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrder } from "@/hooks/useGetOrder";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Gift,
  Star,
  Heart,
  Share2
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
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
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || '1';
  
  const { 
    product, 
    exhibitor, 
    customerData, 
    quantity, 
    setQuantity, 
    subtotal, 
    shipping, 
    tax, 
    total, 
    isPending, 
    error, 
    notFound 
  } = useGetOrder(productId);
  
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");

  // Show loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <div className="text-gray-600 text-xl">Loading order details...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🚫</div>
          <div className="text-red-800 font-semibold mb-2">Failed to Load Order</div>
          <div className="text-red-600 mb-4 text-sm">{error?.toString()}</div>
          <Button onClick={() => router.back()} className="bg-red-600 hover:bg-red-700 text-white">
            ← Back
          </Button>
        </div>
      </div>
    );
  }

  // Show not found state
  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-yellow-800 font-semibold mb-2">Product Not Found</div>
          <div className="text-yellow-600 mb-4">No product found with ID: {productId}</div>
          <Button onClick={() => router.back()} className="bg-yellow-600 hover:bg-yellow-700 text-white">
            ← Back
          </Button>
        </div>
      </div>
    );
  }

  // Calculate derived data
  const originalPrice = product.price > 0 ? product.price * 1.3 : 0;
  const discount = product.price > 0 ? Math.floor(((originalPrice - product.price) / originalPrice) * 100) : 0;
  const inStock = product.quantity > 0;
  const stockCount = product.quantity;
  const tags = product.tags ? product.tags.split(',').map((tag: string) => tag.trim()) : [];
  const images = product.images && product.images.length > 0 ? product.images.map((img: { url: string }) => img.url) : ['/placeholder.svg'];

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
      <div className="max-w-7xl mx-auto px-4 py-6">
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hover:bg-gray-50">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-gray-50">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Summary */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0">
                      <Image
                        src={images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                      {discount > 0 && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-green-500 text-white text-xs">
                            {discount}% OFF
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            {exhibitor?.name || 'Exhibitor'}
                          </Badge>
                          <Badge variant="outline" className="text-gray-600">
                            {product.category}
                          </Badge>
                          <Badge variant="outline" className="text-blue-600 border-blue-200">
                            {product.stage}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {product.title}
                        </h3>
                        {product.description && (
                          <p className="text-gray-600 text-sm mb-3">
                            {product.description}
                          </p>
                        )}
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            4.5 ({product.users?.length || 0} users)
                          </span>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-gray-700">Quantity:</label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="w-8 h-8 p-0"
                              disabled={!inStock}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setQuantity(Math.min(stockCount, quantity + 1))}
                              className="w-8 h-8 p-0"
                              disabled={!inStock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {product.price > 0 ? (
                            <>
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-gray-900">
                                  ₹{product.price.toLocaleString()}
                                </span>
                                {originalPrice > 0 && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                              {discount > 0 && (
                                <p className="text-xs text-green-600 font-medium">
                                  Save ₹{(originalPrice - product.price).toLocaleString()}
                                </p>
                              )}
                            </>
                          ) : (
                            <div className="text-lg font-bold text-gray-900">
                              Price on Request
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Delivery Information */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">Delivery Address</h4>
                        <div className="text-gray-600 space-y-1">
                          <p className="font-medium">{customerData.name}</p>
                          <p>{customerData.address.street}</p>
                          <p>{customerData.address.city}, {customerData.address.state} - {customerData.address.pincode}</p>
                          <p className="text-sm text-gray-500">Landmark: {customerData.address.landmark}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Contact Details</h4>
                        <div className="text-gray-600 space-y-1">
                          <p>{customerData.phone}</p>
                          <p>{customerData.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Delivery Timeline</h4>
                        <div className="text-gray-600 space-y-1">
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Estimated delivery: 2-3 business days
                          </p>
                          <p className="text-sm text-green-600 font-medium">
                            Free shipping on orders above ₹999
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setSelectedPayment("card")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedPayment === "card"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-6 w-6 text-green-600" />
                          <div className="text-left">
                            <p className="font-medium text-gray-800">Credit/Debit Card</p>
                            <p className="text-sm text-gray-600">Visa, Mastercard, RuPay</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setSelectedPayment("upi")}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedPayment === "upi"
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">UPI</span>
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-800">UPI Payment</p>
                            <p className="text-sm text-gray-600">GPay, PhonePe, Paytm</p>
                          </div>
                        </div>
                      </button>
                    </div>

                    {selectedPayment === "card" && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Card ending in •••• 1234</p>
                        <p className="text-xs text-gray-500">Payment will be processed securely</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Total */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0 sticky top-6">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Order Total
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                        <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">
                          {shipping === 0 ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${shipping}`
                          )}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax (GST 18%)</span>
                        <span className="font-medium">₹{tax.toFixed(0)}</span>
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-800">Total</span>
                          <span className="text-xl font-bold text-gray-900">₹{total.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Savings */}
                    {discount > 0 && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 text-green-700">
                          <Gift className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            You save ₹{((originalPrice - product.price) * quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Secure payment with SSL encryption</span>
                    </div>

                    {/* Place Order Button */}
                    <div className="pt-4">
                      {isOrderConfirmed ? (
                        <AlertDialog open={isOrderConfirmed}>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                Order Confirmed!
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Your order has been successfully placed. You will receive a confirmation email shortly.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel
                                onClick={() => router.push("/")}
                                className="flex-1"
                              >
                                Continue Shopping
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => router.push("/user-dashboard")}
                                className="flex-1"
                              >
                                View Orders
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                              <CreditCard className="h-5 w-5 mr-2" />
                              Place Order - ₹{total.toFixed(0)}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
                              <AlertDialogDescription>
                                Please confirm that you want to place this order for ₹{total.toFixed(0)}. 
                                This includes {quantity} item{quantity > 1 ? 's' : ''} with free shipping and applicable taxes.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => setIsOrderConfirmed(true)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Confirm Order
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={itemVariants}>
              <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 text-center mb-4">Why Choose Us?</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-700">Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-gray-700">Fast Delivery</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                        <span className="text-sm text-gray-700">Quality Guaranteed</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-red-600" />
                        <span className="text-sm text-gray-700">Customer Support</span>
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

export default OrderPage;
