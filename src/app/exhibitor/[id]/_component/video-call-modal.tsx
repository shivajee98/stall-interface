"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, Clock, Video } from "lucide-react";

interface VideoCallModalProps {
  companyData: any;
  onClose: () => void;
}

export const VideoCallModal = ({ companyData, onClose }: VideoCallModalProps) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
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
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Connect with {companyData.spoc.Name}
                </h3>
                <p className="text-gray-600">{companyData.spoc.Position}</p>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                  onClick={() => {
                    // Simulate instant call functionality
                    alert(`Starting instant video call with ${companyData.spoc.Name}...`);
                    onClose();
                  }}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Instant Call
                </Button>

                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  onClick={() => {
                    // Simulate schedule functionality
                    alert(`Scheduling video call with ${companyData.spoc.Name}...`);
                    onClose();
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule for Later
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                    onClick={() => {
                      alert("15-minute consultation scheduled!");
                      onClose();
                    }}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    15 min
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                    onClick={() => {
                      alert("30-minute consultation scheduled!");
                      onClose();
                    }}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    30 min
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Available Monday - Friday, 9 AM - 6 PM IST
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Contact: {companyData.spoc.Email} | {companyData.spoc.Phone}
                </p>
                <Button
                  variant="ghost"
                  onClick={onClose}
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
  );
};
