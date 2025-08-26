"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  User,
  DollarSign,
  Package,
  Target,
  Users,
  TrendingUp,
  Award,
  ExternalLink,
  MessageCircle,
  Video,
  Send,
  Calendar,
  Clock,
  Minimize2,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchExhibitors } from "@/store/exhibitorSlice"
import { useParams, useRouter } from "next/navigation"
import React from "react"

interface CompanyProfileProps {
  params: Promise<{ id: string }>
}

const CompanyProfile = ({ params }: CompanyProfileProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data, loading, error } = useAppSelector((state) => state.exhibitors)

  // Get the ID from params using React.use() for Next.js 15 compatibility
  const resolvedParams = React.use(params)
  const exhibitorId = parseInt(resolvedParams?.id || "1")

  // Find the specific exhibitor from Redux store
  const companyData = data.find(exhibitor => exhibitor.ID === exhibitorId)

  // All React hooks must be called before any early returns
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: companyData?.name || "Company",
      message: `Hello! Welcome to ${companyData?.name || "our company"}. How can we help you today?`,
      timestamp: new Date(),
      isBot: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Update messages when companyData changes
  useEffect(() => {
    if (companyData) {
      setMessages([
        {
          id: 1,
          sender: companyData.name,
          message: `Hello! Welcome to ${companyData.name}. How can we help you today?`,
          timestamp: new Date(),
          isBot: true,
        },
      ])
    }
  }, [companyData])

  // Fetch data if not available
  useEffect(() => {
    if (data.length === 0 && !loading) {
      console.log('🔄 Exhibitor Detail: Fetching data for ID:', exhibitorId)
      dispatch(fetchExhibitors())
    }
  }, [dispatch, data.length, loading, exhibitorId])

  // Show loading state if data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <div className="text-gray-600 text-xl">Loading exhibitor details...</div>
          <div className="text-sm text-gray-500 mt-2">Fetching real data from API...</div>
        </div>
      </div>
    )
  }

  // Show error state if API failed
  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🚫</div>
          <div className="text-red-800 font-semibold mb-2">Failed to Load Exhibitor Data</div>
          <div className="text-red-600 mb-4 text-sm">{error}</div>
          <div className="text-gray-600 text-sm mb-6">
            Unable to fetch exhibitor data from the API server.
          </div>
          <Button
            onClick={() => dispatch(fetchExhibitors())}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg mr-4"
          >
            🔄 Retry API Request
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="px-6 py-3 rounded-lg"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    )
  }

  // Show not found state if exhibitor doesn't exist
  if (!companyData) {
    return (
      <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-yellow-800 font-semibold mb-2">Exhibitor Not Found</div>
          <div className="text-yellow-600 mb-4">No exhibitor found with ID: {exhibitorId}</div>
          <div className="text-gray-600 text-sm mb-6">
            The exhibitor you're looking for might have been removed or the ID is incorrect.
          </div>
          <Button
            onClick={() => router.push('/')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    )
  }

  // Helper functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date(),
        isBot: false,
      }
      setMessages([...messages, userMessage])
      setNewMessage("")

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: companyData.name,
          message:
            "Thank you for your message! Our team will get back to you shortly. You can also schedule a video call for immediate assistance.",
          timestamp: new Date(),
          isBot: true,
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Chat Widget Component

  // Chat Widget Component
  const ChatWidget = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed bottom-4 right-4 z-50 ${
        isChatOpen ? "w-96 h-[500px]" : "w-16 h-16"
      } transition-all duration-300`}
    >
      {!isChatOpen ? (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-2xl"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
      ) : (
        <Card className="w-full h-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5" />
                Chat with GaloByte
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? "bg-gradient-to-r from-orange-100 to-yellow-100 text-gray-800"
                        : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${message.isBot ? "text-gray-500" : "text-orange-100"}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )

  // Video Call Modal Component
  const VideoCallModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setIsVideoCallOpen(false)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Video className="h-6 w-6" />
              Schedule Video Call
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Connect with {companyData.spoc.Name}</h3>
                <p className="text-gray-600">{companyData.spoc.Position}</p>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                  <Video className="h-4 w-4 mr-2" />
                  Start Instant Call
                </Button>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule for Later
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    15 min
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    30 min
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Available Monday - Friday, 9 AM - 6 PM IST</p>
                <Button
                  variant="ghost"
                  onClick={() => setIsVideoCallOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Hero Section with Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-80 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-yellow-600/80 z-10" />
        <Image src={companyData.banner || "/placeholder.svg"} alt="Company Banner" fill className="object-cover" />
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
                  src={companyData.logo || "/placeholder.svg"}
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
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-8">
          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Revenue Bracket</p>
                    <p className="text-2xl font-bold">{companyData.revenueInfo.revenueBracket}</p>
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
                    <p className="text-2xl font-bold">{companyData.revenueInfo.userImpact.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold">{companyData.products.length}</p>
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
                    <p className="text-2xl font-bold">{companyData.fundingInfo.fundingType}</p>
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
                    <div className="grid gap-6">
                      {companyData.products.map((product, index) => (
                        <motion.div
                          key={product.ID}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-6 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                                Product
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-orange-600">ID: {product.ID}</p>
                              <p className="text-sm text-gray-600">Digital Solution</p>
                            </div>
                          </div>
                          {product.description && (
                            <div className="mt-4">
                              <p className="text-gray-600">{product.description}</p>
                            </div>
                          )}
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
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Company Information</h4>
                        <p className="text-gray-600 bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg">
                          {companyData.name} is a technology company focused on delivering innovative solutions.
                          Visit our website to learn more about our offerings and expertise.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Business Focus</h4>
                        <p className="text-gray-600 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                          We specialize in providing digital solutions and technology services to help businesses grow and succeed in the modern marketplace.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500 text-white">
                          DPIIT Certified: {companyData.dpiitCertNumber}
                        </Badge>
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
                      <h3 className="font-bold text-lg text-gray-800">{companyData.director.directorName}</h3>
                      <p className="text-gray-600">Director</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-orange-500" />
                        <span className="break-all">{companyData.director.directorEmail}</span>
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
                          <p className="font-medium text-gray-800">{companyData.spoc.Name}</p>
                          <p className="text-sm text-gray-600">{companyData.spoc.Position}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-4 w-4 text-orange-500" />
                            <span className="break-all">{companyData.spoc.Email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4 text-orange-500" />
                            <span>{companyData.spoc.Phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <Button
                          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                          onClick={() => window.open(companyData.websiteURL, "_blank")}
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
                          Get instant support through chat or schedule a video call with our team
                        </p>
                      </div>

                      <div className="grid gap-3">
                        <Button
                          onClick={() => setIsChatOpen(true)}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Start Live Chat
                        </Button>

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
                      <p>
                        {companyData.address.city}, {companyData.address.state}
                      </p>
                      <p>PIN: {companyData.address.pincode}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Certification */}
              <motion.div variants={itemVariants}>
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-6 w-6" />
                      Certification
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">DPIIT Certificate Number</p>
                      <p className="font-mono font-bold text-gray-800 bg-gradient-to-r from-orange-50 to-yellow-50 p-2 rounded">
                        {companyData.dpiitCertNumber}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* Chat Widget */}
        <ChatWidget />

        {/* Video Call Modal */}
        {isVideoCallOpen && <VideoCallModal />}
      </div>
    </div>
  )
}

export default CompanyProfile
