"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ensure at least one contact method is provided
    if (!formState.email && !formState.phone) {
      toast({
        title: "Contact info required",
        description: "Please provide your email or phone number.",
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      // Reset form
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">
          Name
        </Label>
        <div className="relative">
          <Input
            id="name"
            placeholder="Your name"
            required
            value={formState.name}
            onChange={handleChange}
            className="border-[#1a1a2e] bg-[#0a0a12] text-white placeholder:text-gray-500 focus:border-[#3ecef7] focus:ring-[#3ecef7]/20"
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: formState.name ? "0%" : "-100%" }}
              transition={{ duration: 0.3 }}
              className="h-full w-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            required
            value={formState.email}
            onChange={handleChange}
            className="border-[#1a1a2e] bg-[#0a0a12] text-white placeholder:text-gray-500 focus:border-[#3ecef7] focus:ring-[#3ecef7]/20"
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: formState.email ? "0%" : "-100%" }}
              transition={{ duration: 0.3 }}
              className="h-full w-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">
          Phone
        </Label>
        <div className="relative">
          <Input
            id="phone"
            type="tel"
            placeholder="Your phone number"
            value={formState.phone}
            onChange={handleChange}
            className="border-[#1a1a2e] bg-[#0a0a12] text-white placeholder:text-gray-500 focus:border-[#3ecef7] focus:ring-[#3ecef7]/20"
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: formState.phone ? "0%" : "-100%" }}
              transition={{ duration: 0.3 }}
              className="h-full w-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-white">
          Subject
        </Label>
        <div className="relative">
          <Input
            id="subject"
            placeholder="Project inquiry"
            required
            value={formState.subject}
            onChange={handleChange}
            className="border-[#1a1a2e] bg-[#0a0a12] text-white placeholder:text-gray-500 focus:border-[#3ecef7] focus:ring-[#3ecef7]/20"
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: formState.subject ? "0%" : "-100%" }}
              transition={{ duration: 0.3 }}
              className="h-full w-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">
          Message
        </Label>
        <div className="relative">
          <Textarea
            id="message"
            placeholder="Tell us about your project requirements"
            className="min-h-[120px] border-[#1a1a2e] bg-[#0a0a12] text-white placeholder:text-gray-500 focus:border-[#3ecef7] focus:ring-[#3ecef7]/20"
            required
            value={formState.message}
            onChange={handleChange}
          />
          <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: formState.message ? "0%" : "-100%" }}
              transition={{ duration: 0.3 }}
              className="h-full w-full bg-gradient-to-r from-[#3ecef7] to-[#7deb7d]"
            />
          </div>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="relative w-full overflow-hidden border-0 bg-gradient-to-r from-[#3ecef7] to-[#7deb7d] text-black transition-all hover:shadow-[0_0_15px_rgba(62,206,247,0.5)]"
          disabled={isSubmitting}
        >
          <span className="relative z-10">
            {isSubmitting ? "Sending..." : "Send Message"}
          </span>
          {!isSubmitting && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-full w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
            </span>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
