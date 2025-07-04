"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaQuoteLeft, FaPause, FaPlay } from "react-icons/fa";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
  linkedinUrl: string;
}

const testimonialsData: Testimonial[] = [
  // Testimonials section removed - users can add their own testimonials here
];

// Function to format testimonial text with bold markdown
const formatTestimonialText = (text: string) => {
  return text.replace(
    /\*\*(.*?)\*\*/g,
    "<strong class='text-slate-700 dark:text-slate-200 font-semibold'>$1</strong>"
  );
};

// Helper to truncate long quotes for card preview
const truncateText = (text: string, maxLen = 300) => {
  if (text.length <= maxLen) return text;
  const truncated = text.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.slice(0, lastSpace) + "…";
};

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  // Ref for horizontal scroll container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect (pauses on hover / pause state)
  useEffect(() => {
    let frameId: number;
    // Use a slightly faster speed on mobile where fractional scrollLeft values may be rounded.
    const speed = isMobile ? 1.2 : 0.8; // px per frame

    const step = () => {
      const el = scrollRef.current;
      if (el && !isPaused) {
        // Only scroll if content overflows
        if (el.scrollWidth > el.clientWidth) {
          // Some mobile browsers ignore fractional additions to scrollLeft.
          // Try scrollBy as a fallback for better compatibility.
          const prev = el.scrollLeft;
          el.scrollLeft += speed;

          // If scrollLeft did not change, fall back to scrollBy (Safari iOS quirk)
          if (el.scrollLeft === prev) {
            el.scrollBy({ left: speed, behavior: "auto" });
          }

          // Loop seamlessly
          if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
            el.scrollLeft = 0;
          }
        }
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, isMobile]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedTestimonial) {
      // Prevent background scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedTestimonial]);

  const containerVariants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.15,
        duration: isMobile ? 0 : 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0 : 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: isMobile ? 1 : 0,
      y: isMobile ? 0 : 30,
      scale: isMobile ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0 : 0.7,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  const previewLen = isMobile ? 300 : 450;

  // Card click handler to open modal
  const handleCardClick = (
    testimonial: Testimonial,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSelectedTestimonial(testimonial);
    setIsPaused(true);
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400/10 to-blue-400/10 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/5 to-purple-300/5 blur-2xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* Enhanced Section Header */}
        <motion.div variants={itemVariants} className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl leading-tight">
            What colleagues and mentors say about my{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-size-200 animate-gradient">
              work and character
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Testimonials from leaders and colleagues who have worked closely
            with Lawrence across product management, engineering, and leadership
            roles
          </p>

          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-blue-600 rounded-full" />
            <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-2" />
            <div className="h-1 w-16 bg-gradient-to-r from-purple-600 to-transparent rounded-full" />
          </div>
        </motion.div>

        {/* Auto-scrolling Gallery with Pause/Play Button beside it */}
        <div className="items-center mb-20 w-full">
          {/* Pause/Play Button to the left of the gallery */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="mr-4 bg-slate-800/80 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg backdrop-blur-md transition-all"
            title={isPaused ? "Play auto-scroll" : "Pause auto-scroll"}
            style={{ alignSelf: "flex-start" }}
          >
            {isPaused ? <FaPlay /> : <FaPause />}
          </button>
          {/* Gallery container with touch-action and user-select disabled */}
          <div
            className="w-full overflow-x-auto whitespace-nowrap pb-6 hide-scrollbar"
            ref={scrollRef}
            style={{ userSelect: "none", WebkitOverflowScrolling: "touch" }}
          >
            {/* Add extra space at the start */}
            <div style={{ minWidth: "48px", display: "inline-block" }} />
            {testimonialsData.map((t, i) => (
              <motion.div
                key={t.name}
                variants={cardVariants}
                className={`inline-block align-top w-96 sm:w-[28rem] cursor-pointer select-none${i < testimonialsData.length - 1 ? " mr-6" : ""}`}
                onClick={(e) => handleCardClick(t, e as any)}
              >
                <div className="relative rounded-2xl bg-gradient-to-br from-white via-blue-50/60 to-purple-50/60 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900/60 border border-slate-200/70 dark:border-slate-700/70 shadow-lg p-5 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover ring-2 ring-blue-400/30"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white truncate">
                        {t.name}
                      </span>
                      <span className="text-xs text-blue-600 dark:text-blue-300 truncate">
                        {t.title}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed flex-1 break-words whitespace-normal overflow-hidden">
                    {truncateText(t.quote, previewLen)}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-xs text-blue-500 hover:underline">
                      Read more →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Add extra space at the end */}
            <div style={{ minWidth: "48px", display: "inline-block" }} />
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <motion.div variants={itemVariants} className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-slate-200/50 dark:border-slate-700/50">
            <p className="mb-6 text-lg text-slate-600 dark:text-slate-300">
              Want to add your testimonial?
            </p>
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  const elementPosition =
                    contactSection.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - 120;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform"
            >
              Work With Lawrence
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Modal for full testimonial */}
        {selectedTestimonial && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => {
              setSelectedTestimonial(null);
              setIsPaused(false);
            }}
            onWheel={(e) => {
              // Prevent wheel events from propagating to body when overlay is hovered
              e.stopPropagation();
            }}
          >
            <div
              className="relative max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-3xl bg-gradient-to-br from-white via-blue-50/80 to-purple-50/80 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-900 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover ring-2 ring-blue-400/40 flex-shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedTestimonial.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    {selectedTestimonial.title} — {selectedTestimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {selectedTestimonial.quote}
              </p>
              <div className="mt-8 text-right">
                <Link
                  href={selectedTestimonial.linkedinUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View on LinkedIn <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
