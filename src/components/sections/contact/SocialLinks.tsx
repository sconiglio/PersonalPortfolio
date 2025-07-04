"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaFacebookF } from "react-icons/fa6";
import { FiGithub, FiMail } from "react-icons/fi";

/**
 * Social media link interface
 */
export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

/**
 * Social links props interface
 */
export interface SocialLinksProps {
  /** Custom social links to display */
  links?: SocialLink[];
  /** Whether to show email link */
  showEmail?: boolean;
  /** Email address to link to */
  email?: string;
  /** Animation delay for staggered animations */
  animationDelay?: number;
}

/**
 * Social Links Component
 *
 * Displays social media links and contact information in an animated grid.
 * Supports custom social links and email integration.
 *
 * @param props - SocialLinksProps
 * @returns JSX.Element
 */
export function SocialLinks({
  links = [],
  showEmail = true,
  email = "your.email@example.com",
  animationDelay = 0,
}: SocialLinksProps) {
  // Default social links if none provided
  const defaultLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/your-profile",
      icon: FaLinkedin,
      color: "hover:bg-blue-600",
    },
    {
      name: "GitHub",
      url: "https://github.com/your-username",
      icon: FaGithub,
      color: "hover:bg-gray-800",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/your-profile",
      icon: FaFacebookF,
      color: "hover:bg-blue-600",
    },
  ];

  const displayLinks = links.length > 0 ? links : defaultLinks;

  return (
    <div className="space-y-6">
      <motion.h3
        className="text-xl font-semibold text-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
      >
        Connect With Me
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Social Media Links */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: animationDelay + 0.1 }}
        >
          <h4 className="text-sm font-medium text-gray-700">Social Media</h4>
          <div className="flex space-x-3">
            {displayLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-lg bg-gray-100 text-gray-700 transition-all duration-200 ${link.color} hover:text-white`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: animationDelay + 0.2 + index * 0.1,
                }}
                aria-label={`Visit ${link.name}`}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Email Link */}
        {showEmail && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: animationDelay + 0.2 }}
          >
            <h4 className="text-sm font-medium text-gray-700">Email</h4>
            <motion.a
              href={`mailto:${email}`}
              className="flex items-center space-x-2 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: animationDelay + 0.3 }}
            >
              <FiMail className="w-5 h-5" />
              <span className="text-sm">{email}</span>
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
