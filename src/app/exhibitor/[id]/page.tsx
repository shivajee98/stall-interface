"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetExhibitor } from "@/hooks/useGetExhibitor";
import { motion } from "framer-motion";
import {
    DollarSign,
    ExternalLink,
    Globe,
    Mail,
    MapPin,
    MessageCircle,
    Package,
    Phone,
    Star,
    Target,
    TrendingUp,
    User,
    Users,
    Video
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ChatWidget } from "./_component/chat-widget";
import { VideoCallModal } from "./_component/video-call-modal";

interface CompanyProfileProps {
  params: Promise<{ id: string }>;
}

const CompanyProfile = ({ params }: CompanyProfileProps) => {
  const router = useRouter();
  const { data, isPending, error } = useGetExhibitor();

  const resolvedParams = React.use(params);
  const exhibitorId = parseInt(resolvedParams?.id || "1");

  // --- all hooks must go here ---
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  // Updated Exhibitor type to match provided data
  interface Exhibitor {
    id: number;
    name: string;
    bannerUrl: string | null;
    logoUrl?: string | null;
    products: Array<{
      id: number;
      title: string;
      description?: string;
      category?: string;
      images?: Array<{ url: string }>;
      price?: number;
      productType?: string;
      quantity?: number;
      stage?: string;
      startupId?: number;
      tags?: string;
      users?: string[];
    }>;
    revenueInfo: { revenueBracket: string; userImpact: number };
    fundingInfo: { fundingType: string };
    director: { name: string; email: string };
    spoc: { name: string; position: string; email: string; phone: string };
    websiteUrl: string;
    address: { street: string; city: string; state: string; pincode: string };
    dpiitCertNumber: string;
    eventIntent?: { whyParticipate?: string; expectation?: string; consentToPay?: boolean };
    pitchDeckUrl?: string;
  }

  // Find the specific company data based on ID
  const companyData = data?.find(
    (exhibitor: Exhibitor) => exhibitor.id === exhibitorId
  );

  // Show loading state if data is being fetched
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <div className="text-gray-600 text-xl">
            Loading exhibitor details...
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Fetching real data from API...
          </div>
        </div>
      </div>
    );
  }

  // Show error state if API failed
  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🚫</div>
          <div className="text-red-800 font-semibold mb-2">
            Failed to Load Exhibitor Data
          </div>
          <div className="text-red-600 mb-4 text-sm">{error?.toString()}</div>
          <div className="text-gray-600 text-sm mb-6">
            Unable to fetch exhibitor data from the API server.
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg mr-4"
          >
            🔄 Retry API Request
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="px-6 py-3 rounded-lg"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Show not found state if exhibitor doesn't exist
  if (!companyData) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-yellow-800 font-semibold mb-2">
            Exhibitor Not Found
          </div>
          <div className="text-yellow-600 mb-4">
            No exhibitor found with ID: {exhibitorId}
          </div>
          <div className="text-gray-600 text-sm mb-6">
            The exhibitor you're looking for might have been removed or the ID
            is incorrect.
          </div>
          <Button
            onClick={() => router.push("/")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

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

  // Chat Widget Component

  // Video Call Modal Component

  return (
    <div className="min-h-screen my-auto">
      {/* Hero Section with Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-80 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-yellow-600/80 z-10" />
        <Image
          src={companyData.bannerUrl || "/placeholder.svg"}
          alt="Company Banner"
          fill
          className="object-cover"
        />
        <div className="relative z-20 flex items-center justify-center h-full">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-white p-2 shadow-2xl">
                <Image
                  src={companyData.logoUrl || "/placeholder.svg"}
                  alt={companyData.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              {companyData.name}
            </h1>
            <p className="text-xl opacity-90">Premium Technology Solutions</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8"
        >
          {/* Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Revenue Bracket</p>
                    <p className="text-2xl font-bold">
                      {companyData.revenueInfo.revenueBracket}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">User Impact</p>
                    <p className="text-2xl font-bold">
                      {companyData.revenueInfo.userImpact.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600 to-yellow-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Products</p>
                    <p className="text-2xl font-bold">
                      {companyData.products.length}
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-600 to-orange-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Funding</p>
                    <p className="text-2xl font-bold">
                      {companyData.fundingInfo.fundingType}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Products Section */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-6 w-6" />
                      Products & Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {companyData.products.map((product: Exhibitor['products'][number], index: number) => (
                        <motion.div
                          key={product.id ? `product-${product.id}` : `product-${index}`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                          <Link href={`product/${product.id}`}>
                            {/* Product Image */}
                            <div className="relative aspect-square overflow-hidden">
                              {product.images && product.images.length > 0 ? (
                                <Image
                                  src={product.images[0].url}
                                  alt={product.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                                  <Package className="h-16 w-16 text-orange-400" />
                                </div>
                              )}
                              
                              {/* Discount Badge */}
                              {product.price && (
                                <div className="absolute top-3 left-3">
                                  <Badge className="bg-green-500 text-white text-xs font-semibold">
                                    {Math.floor(Math.random() * 30) + 10}% OFF
                                  </Badge>
                                </div>
                              )}
                              
                              {/* Quick View Overlay */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Button className="bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg font-medium">
                                  Quick View
                                </Button>
                              </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4 space-y-3">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                  {product.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs">
                                    {product.productType || "Product"}
                                  </Badge>
                                  <Badge variant="outline" className="text-gray-600 text-xs">
                                    {product.category}
                                  </Badge>
                                </div>
                              </div>

                              {/* Tags */}
                              {product.tags && (
                                <div className="flex gap-1 flex-wrap">
                                  {product.tags.split(",").slice(0, 3).map((tag: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                                      {tag.trim()}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              {/* Description */}
                              {product.description && (
                                <p className="text-sm text-gray-600 line-clamp-2">
                                  {product.description}
                                </p>
                              )}

                              {/* Price and Rating */}
                              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                <div>
                                  {product.price ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg font-bold text-gray-900">
                                        ₹{product.price.toLocaleString()}
                                      </span>
                                      <span className="text-sm text-gray-500 line-through">
                                        ₹{(product.price * 1.3).toFixed(0)}
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-sm text-gray-500">Price on request</span>
                                  )}
                                </div>
                                
                                {/* Mock Rating */}
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium text-gray-700">
                                    {4.5 + Math.random() * 0.5}
                                  </span>
                                </div>
                              </div>

                              {/* Stock Status */}
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-green-600 font-medium">
                                  In Stock
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Company Overview Section */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-6 w-6" />
                      Company Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Company Description */}
                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200">
                        <h4 className="font-bold text-gray-800 mb-3 text-lg">About {companyData.name}</h4>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {companyData.name} is a leading technology company focused on delivering innovative 
                          solutions that drive digital transformation. With a strong commitment to excellence 
                          and customer satisfaction, we provide cutting-edge products and services that help 
                          businesses thrive in today's competitive landscape.
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-500 text-white">
                            DPIIT Certified: {companyData.dpiitCertNumber}
                          </Badge>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            Verified Business
                          </Badge>
                        </div>
                      </div>

                      {/* Key Highlights */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                          <h5 className="font-semibold text-blue-800 mb-2">Innovation Focus</h5>
                          <p className="text-sm text-blue-700">
                            Cutting-edge technology solutions and continuous innovation in product development.
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                          <h5 className="font-semibold text-green-800 mb-2">Customer Success</h5>
                          <p className="text-sm text-green-700">
                            Dedicated support team ensuring customer satisfaction and business growth.
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                          <h5 className="font-semibold text-purple-800 mb-2">Quality Assurance</h5>
                          <p className="text-sm text-purple-700">
                            Rigorous testing and quality control processes for all products and services.
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                          <h5 className="font-semibold text-orange-800 mb-2">Market Leadership</h5>
                          <p className="text-sm text-orange-700">
                            Proven track record and market leadership in technology solutions.
                          </p>
                        </div>
                      </div>

                      {/* Business Focus */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                        <h4 className="font-bold text-gray-800 mb-3 text-lg">Our Business Focus</h4>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          We specialize in providing comprehensive digital solutions and technology services 
                          that empower businesses to grow and succeed in the modern marketplace. Our expertise 
                          spans across multiple domains including software development, digital transformation, 
                          and innovative product solutions.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-blue-600 border-blue-200">Digital Solutions</Badge>
                          <Badge variant="outline" className="text-green-600 border-green-200">Technology Services</Badge>
                          <Badge variant="outline" className="text-purple-600 border-purple-200">Innovation</Badge>
                          <Badge variant="outline" className="text-orange-600 border-orange-200">Business Growth</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Director Info */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-6 w-6" />
                      Leadership
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {companyData.director.name}
                      </h3>
                      <p className="text-gray-600">Director</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-orange-500" />
                        <span className="break-all">{companyData.director.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-6 w-6" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">SPOC Details</h4>
                        <div className="space-y-2">
                          <p className="font-medium text-gray-800">{companyData.spoc.name}</p>
                          <p className="text-sm text-gray-600">{companyData.spoc.position}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4 text-orange-500" />
                            <span className="break-all">{companyData.spoc.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4 text-orange-500" />
                            <span>{companyData.spoc.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <Button
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                          onClick={() => window.open(companyData.websiteUrl, "_blank")}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Visit Website
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Communication Hub */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-6 w-6" />
                      Connect With Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <p className="text-gray-600 text-sm mb-4">
                          Get instant support through chat or schedule a video
                          call with our team
                        </p>
                      </div>

                      <div className="grid gap-3">
                        <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-center">
                          <MessageCircle className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <p className="text-sm text-blue-800 font-medium">
                            Use the chat widget in the bottom right corner to start a live chat
                          </p>
                        </div>

                        <Button
                          onClick={() => setIsVideoCallOpen(true)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Video Call Now
                        </Button>
                      </div>

                      <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Team is online and ready to help</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Address */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-6 w-6" />
                      Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2 text-gray-600">
                      <p className="font-medium">{companyData.address.street}</p>
                      <p>{companyData.address.city}, {companyData.address.state}</p>
                      <p>PIN: {companyData.address.pincode}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* Chat Widget */}
        <ChatWidget companyData={companyData}  />

        {/* Video Call Modal */}
        {isVideoCallOpen && (
          <VideoCallModal
            companyData={companyData}
            onClose={() => setIsVideoCallOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
