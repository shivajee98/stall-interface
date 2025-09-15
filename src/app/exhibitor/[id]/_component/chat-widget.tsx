"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Minimize2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export const ChatWidget = ({companyData}: any) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add welcome message when chat opens
  const openChat = () => {
    setIsChatOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: companyData.name,
          message: `Hello! Welcome to ${companyData.name}. How can we help you today?`,
          timestamp: new Date(),
          isBot: true,
        },
      ]);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date(),
        isBot: false,
      };
      setMessages([...messages, userMessage]);
      setNewMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          sender: companyData.name,
          message:
            "Thank you for your message! Our team will get back to you shortly. You can also schedule a video call for immediate assistance.",
          timestamp: new Date(),
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
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
          onClick={openChat}
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
                Chat with {companyData.name}
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
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? "bg-gradient-to-r from-orange-100 to-yellow-100 text-gray-800"
                        : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isBot ? "text-gray-500" : "text-orange-100"
                      }`}
                    >
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
  );
};
