"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface TimelineEvent {
  type: "education" | "experience";
  year: string;
  title: string;
  org: string;
  date: string;
  logo: string;
  category?: string;
  bullets?: string[];
  details?: string[];
}

const timelineData: TimelineEvent[] = [
  // Education
  {
    type: "education",
    year: "2024",
    title: "Master's degree, Business Administration",
    org: "University Name",
    date: "Aug 2023 - Dec 2024",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    details: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Relevant Coursework: Product Management, Business Strategy, Data Analytics",
      "Awards: Dean's List, Academic Excellence",
    ],
  },
  {
    type: "education",
    year: "2021",
    title: "Bachelor's degree, Business Administration",
    org: "University Name",
    date: "Aug 2017 - May 2021",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    details: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Relevant Coursework: Marketing, Finance, Operations Management, Business Analytics",
      "Awards: Dean's List, Academic Excellence",
    ],
  },
  {
    type: "education",
    year: "2017",
    title: "High School Diploma",
    org: "High School Name",
    date: "Aug 2013 - May 2017",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    details: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Leadership activities and community service",
      "Academic excellence and extracurricular involvement",
    ],
  },
  // Experience (Most Recent First)
  {
    type: "experience",
    year: "2025",
    title: "Senior Product Manager",
    org: "Company Name · Full-time",
    date: "Jan 2025 - Present",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    category: "product",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    type: "experience",
    year: "2024",
    title: "Product Manager",
    org: "Company Name · Full-time",
    date: "Mar 2024 - Dec 2024",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    category: "product",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    type: "experience",
    year: "2024",
    title: "Product Manager Intern",
    org: "Company Name · Internship",
    date: "Jun 2024 - Aug 2024",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    category: "product",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    type: "experience",
    year: "2023",
    title: "Associate Product Manager",
    org: "Company Name · Full-time",
    date: "Jan 2023 - Dec 2023",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    category: "product",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    type: "experience",
    year: "2022",
    title: "Product Analyst",
    org: "Company Name · Full-time",
    date: "Jan 2022 - Dec 2022",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    category: "product",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    type: "experience",
    year: "2021",
    title: "Business Analyst",
    org: "Company Name · Full-time",
    date: "Jan 2021 - Dec 2021",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    category: "product",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    type: "experience",
    year: "2020",
    title: "Marketing Intern",
    org: "Company Name · Internship",
    date: "Jun 2020 - Aug 2020",
    logo: "/images/logos/pm_happy_hour_logo.jpeg",
    category: "marketing",
    bullets: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
];

const categories = [
  { key: "all", label: "All" },
  { key: "product", label: "Product Management" },
  { key: "engineering", label: "Engineering" },
  { key: "retail", label: "Retail" },
];

interface TimelineSectionProps {
  tourActive?: boolean;
  currentStep?: number;
}

const generateId = (item: TimelineEvent) => {
  const orgSlug = item.org
    .toLowerCase()
    .replace(/ /g, "-")
    .split("·")[0]
    .replace(/-+$/, "");
  return `timeline-${orgSlug}`;
};

export function TimelineSection({
  tourActive = false,
  currentStep = -1,
}: TimelineSectionProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredTimeline = React.useMemo(() => {
    // Special filtering for tour step 4 - show specific experiences in priority order
    if (tourActive && currentStep === 3) {
      const allExperiences = timelineData.filter(
        (item) => item.type === "experience"
      );

      // Define the priority 4 experiences in the requested order
      const priorityExperiences: TimelineEvent[] = [];

      // 1. PM Happy Hour · Internship (Product Manager) - Mar 2025 - Present
      const pmHappyHour = allExperiences.find(
        (item) =>
          item.title === "Product Manager" && item.org.includes("PM Happy Hour")
      );
      if (pmHappyHour) priorityExperiences.push(pmHappyHour);

      // 2. Tutora · Part-time (AI Product Consultant & CS Instructor) - Mar 2021 - Present
      const tutora = allExperiences.find(
        (item) =>
          item.title === "AI Product Consultant & CS Instructor" &&
          item.org.includes("Tutora")
      );
      if (tutora) priorityExperiences.push(tutora);

      // 3. Kearney (Student Consultant, Technical Lead) - Sep 2024 - Dec 2024
      const kearney = allExperiences.find(
        (item) =>
          item.title === "Student Consultant, Technical Lead" &&
          item.org.includes("Kearney")
      );
      if (kearney) priorityExperiences.push(kearney);

      // 4. Motorola Solutions · Full-time (Embedded Android Engineer) - Aug 2021 - Aug 2023
      const motorola = allExperiences.find(
        (item) =>
          item.title === "Embedded Android Engineer" &&
          item.org.includes("Motorola Solutions")
      );
      if (motorola) priorityExperiences.push(motorola);

      // Get the rest of the experiences (excluding the priority 4)
      const priorityTitlesAndOrgs = priorityExperiences.map((exp) => ({
        title: exp.title,
        org: exp.org,
      }));

      const remainingExperiences = allExperiences.filter((item) => {
        return !priorityTitlesAndOrgs.some(
          (priority) =>
            priority.title === item.title && priority.org === item.org
        );
      });

      // Return priority experiences first, then the rest
      return [...priorityExperiences, ...remainingExperiences];
    }

    return timelineData.filter(
      (item) =>
        activeCategory === "all" ||
        item.category === activeCategory ||
        item.type === "education"
    );
  }, [activeCategory, tourActive, currentStep]);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 10;
    setShowScrollIndicator(!isAtBottom);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = container;

    // Check if scrolling up and already at top
    if (e.deltaY < 0 && scrollTop === 0) {
      return; // Allow page scroll
    }

    // Check if scrolling down and already at bottom
    if (e.deltaY > 0 && scrollTop >= scrollHeight - clientHeight) {
      return; // Allow page scroll
    }

    // Prevent page scroll and handle container scroll
    e.preventDefault();
    e.stopPropagation();
    container.scrollTo({
      top: scrollTop + e.deltaY,
      behavior: "auto",
    });
  };

  const containerVariants = tourActive
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: isMobile ? 1 : 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: isMobile ? 0 : 0.1,
            duration: isMobile ? 0 : 0.6,
          },
        },
      };

  const itemVariants = tourActive
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: isMobile ? 0 : 0.6,
            ease: "easeOut",
          },
        },
      };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "product":
        return "from-blue-500 to-purple-500";
      case "engineering":
        return "from-green-500 to-blue-500";
      case "retail":
        return "from-orange-500 to-red-500";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative py-20 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 mx-auto max-w-7xl px-6"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            From software engineering to AI product management.
            <br />
            <span className="font-bold">
              11 career milestones, 16 projects, 3 degrees
            </span>
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </motion.div>

        {/* Filter Controls */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border backdrop-blur-sm ${
                  activeCategory === category.key
                    ? "bg-blue-600/20 border-blue-500/80 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/20"
                    : "bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Split Timeline: Education & Work Experience */}
        <motion.div
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Education Column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Education
            </h3>
            <div className="space-y-6">
              {timelineData
                .filter((item) => item.type === "education")
                .map((item) => {
                  const cardId = `${item.type}-${item.year}-${item.title}`;
                  const isExpanded = expandedCards.has(cardId);
                  const timelineId = generateId(item);

                  return (
                    <motion.div
                      key={cardId}
                      id={timelineId}
                      variants={itemVariants}
                      className="relative"
                    >
                      <motion.div
                        onClick={() => toggleCard(cardId)}
                        className="group relative cursor-pointer rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 shadow-md border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] hover:bg-white dark:hover:bg-slate-800"
                      >
                        {/* Header */}
                        <div className="flex items-center space-x-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-md flex-shrink-0">
                            <Image
                              src={item.logo}
                              alt={item.org}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                              {item.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-1">
                                {item.org}
                              </p>
                              <span className="text-xs text-slate-400">•</span>
                              <p className="text-xs text-slate-500 dark:text-slate-500">
                                {item.date}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                          >
                            <svg
                              className="w-4 h-4 text-slate-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Expandable Content */}
                        <div
                          className={`overflow-hidden ${isExpanded ? "block" : "hidden"}`}
                        >
                          <div className="mt-4 space-y-2">
                            {item.details?.map((detail, idx) => (
                              <div
                                key={idx}
                                className="flex items-start space-x-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  {detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>

          {/* Work Experience Column */}
          <motion.div variants={itemVariants} className="relative">
            <h3
              id="work-experience-title"
              className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center"
            >
              Work Experience
            </h3>
            <div className="relative">
              {/* Gallery Container */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                onWheel={handleWheel}
                className="relative space-y-6 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent pr-4 -mr-4"
              >
                {filteredTimeline
                  .filter((item) => item.type === "experience")
                  .map((item) => {
                    const cardId = `${item.type}-${item.year}-${item.title}`;
                    const isExpanded = expandedCards.has(cardId);
                    const timelineId = generateId(item);

                    return (
                      <motion.div
                        key={cardId}
                        id={timelineId}
                        variants={itemVariants}
                        className="relative"
                      >
                        <motion.div
                          onClick={() => toggleCard(cardId)}
                          className="group relative cursor-pointer rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                        >
                          {/* Category Badge */}
                          {item.category && (
                            <div
                              className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(item.category)}`}
                            >
                              {item.category}
                            </div>
                          )}

                          {/* Header */}
                          <div className="flex items-start space-x-4">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white shadow-lg flex-shrink-0">
                              <Image
                                src={item.logo}
                                alt={item.org}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                {item.org}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-500">
                                {item.date}
                              </p>
                            </div>
                            <div
                              className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                            >
                              <svg
                                className="w-5 h-5 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Expandable Content */}
                          <div
                            className={`overflow-hidden ${isExpanded ? "block" : "hidden"}`}
                          >
                            <div className="mt-4 space-y-2">
                              {item.bullets?.map((bullet, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start space-x-2"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                  <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {bullet}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
              </div>

              {/* Enhanced Scroll Indicator */}
              {showScrollIndicator && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-slate-600 dark:text-slate-300 z-20 pointer-events-none"
                >
                  <div className="flex flex-col items-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-xs font-semibold mb-1">
                      Scroll for more
                    </span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
