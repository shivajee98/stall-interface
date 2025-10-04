"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProduct } from "@/hooks/useGetProduct";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ShoppingCart,
  Play,
  Pause,
  Volume2,
  Maximize2,
  CheckCircle,
  Award,
  Users,
  TrendingUp
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const productId = resolvedParams?.productId;
  
  const { product, exhibitor, isPending, error, notFound } = useGetProduct(productId);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePurchase = () => {
    router.push(`/checkout-product?productId=${productId}`);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Show loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <div className="text-gray-600 text-xl">Loading product details...</div>
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
          <div className="text-red-800 font-semibold mb-2">Failed to Load Product</div>
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

  // Calculate derived data from API
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
            Back to Exhibitor
          </Button>
          <div className="flex-1">
            <nav className="text-sm text-gray-500">
              Home / Exhibitors / Product #{productId}
            </nav>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`${isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : 'hover:bg-gray-50'}`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Product Media */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl shadow-xl overflow-hidden group">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white text-sm font-semibold">
                    {discount}% OFF
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-orange-500 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Brand & Category */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
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
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  4.5
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.users?.length || 0} users)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {product.price > 0 ? (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {originalPrice > 0 && (
                      <span className="text-xl text-gray-500 line-through">
                        ₹{originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 font-medium">
                      You save ₹{(originalPrice - product.price).toLocaleString()} ({discount}% OFF)
                    </p>
                  )}
                </>
              ) : (
                <div className="text-2xl font-bold text-gray-900">
                  Price on Request
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                {inStock ? `In Stock (${stockCount} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10"
                >
                  -
                </Button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(stockCount, quantity + 1))}
                  className="w-10 h-10"
                  disabled={!inStock}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={!inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.price > 0 ? `Add to Cart - ₹${(product.price * quantity).toLocaleString()}` : 'Contact for Price'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full py-4 text-lg font-semibold border-orange-200 text-orange-600 hover:bg-orange-50"
                disabled={!inStock}
              >
                {product.price > 0 ? 'Buy Now' : 'Contact Seller'}
              </Button>
            </div>

            {/* Product Description */}
            {product.description && (
              <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-600" />
                    Product Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Product Type & Stage */}
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700">
                <Truck className="h-5 w-5" />
                <span className="font-medium">Product Information</span>
              </div>
              <div className="space-y-2 text-sm text-blue-600">
                <p><strong>Type:</strong> {product.productType}</p>
                <p><strong>Stage:</strong> {product.stage}</p>
                <p><strong>Category:</strong> {product.category}</p>
                {product.users && product.users.length > 0 && (
                  <p><strong>Target Users:</strong> {product.users.join(', ')}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Details */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Product Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Product Information</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Product ID:</strong> {product.id}</p>
                      <p><strong>Startup ID:</strong> {product.startupId}</p>
                      <p><strong>Product Type:</strong> {product.productType}</p>
                      <p><strong>Stage:</strong> {product.stage}</p>
                      <p><strong>Category:</strong> {product.category}</p>
                      <p><strong>Price:</strong> {product.price > 0 ? `₹${product.price.toLocaleString()}` : 'On Request'}</p>
                      <p><strong>Quantity Available:</strong> {product.quantity}</p>
                    </div>
                  </div>
                  
                  {product.description && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                      <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Target Users & Tags */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {product.users && product.users.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Target Users</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.users.map((user: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-blue-600 border-blue-200">
                            {user}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Warranty & Support */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800 mb-2">2-Year Warranty</h3>
              <p className="text-sm text-green-700">Comprehensive coverage for peace of mind</p>
            </Card>
            
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <RotateCcw className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800 mb-2">Easy Returns</h3>
              <p className="text-sm text-blue-700">30-day return policy, no questions asked</p>
            </Card>
            
            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-800 mb-2">24/7 Support</h3>
              <p className="text-sm text-purple-700">Expert customer service always available</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
