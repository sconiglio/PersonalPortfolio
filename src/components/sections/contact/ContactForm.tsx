"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

/**
 * Contact form props interface
 */
export interface ContactFormProps {
  /** Initial form data */
  initialData?: Partial<ContactFormData>;
  /** Callback when form is submitted successfully */
  onSuccess?: () => void;
  /** Callback when form submission fails */
  onError?: (error: string) => void;
  /** Whether form is disabled */
  disabled?: boolean;
}

/**
 * Contact Form Component
 *
 * A simple contact form for sending messages to the portfolio owner.
 * Handles form validation, submission, and status feedback.
 *
 * @param props - ContactFormProps
 * @returns JSX.Element
 */
export function ContactForm({
  initialData = {},
  onSuccess,
  onError,
  disabled = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    ...initialData,
  });

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  /**
   * Handle form input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
        onSuccess?.();
      } else {
        setSubmitStatus("error");
        onError?.("Failed to send message");
      }
    } catch (error) {
      setSubmitStatus("error");
      onError?.("Network error occurred");
    }

    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Your company (optional)"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={disabled}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
          placeholder="Tell me about your project or how I can help..."
        />
      </div>

      <motion.button
        type="submit"
        disabled={submitStatus === "loading" || disabled}
        className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          submitStatus === "loading"
            ? "bg-gray-400 cursor-not-allowed"
            : submitStatus === "success"
              ? "bg-green-600 hover:bg-green-700"
              : submitStatus === "error"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-800 hover:bg-gray-900"
        } text-white`}
        whileHover={submitStatus === "idle" ? { scale: 1.02 } : {}}
        whileTap={submitStatus === "idle" ? { scale: 0.98 } : {}}
      >
        {submitStatus === "loading" && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
        )}
        {submitStatus === "success" && <CheckCircle className="w-5 h-5 mr-2" />}
        {submitStatus === "error" && <AlertCircle className="w-5 h-5 mr-2" />}
        {submitStatus === "idle" && <Send className="w-5 h-5 mr-2" />}

        {submitStatus === "loading"
          ? "Sending..."
          : submitStatus === "success"
            ? "Message Sent!"
            : submitStatus === "error"
              ? "Failed to Send"
              : "Send Message"}
      </motion.button>
    </motion.form>
  );
}
