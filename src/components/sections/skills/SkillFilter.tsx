"use client";

import React from "react";
import { motion } from "framer-motion";
import { SkillCategory, SkillLevel } from "./SkillCard";

/**
 * Skill filter props interface
 */
export interface SkillFilterProps {
  /** Currently selected category */
  selectedCategory: SkillCategory | "all";
  /** Currently selected level */
  selectedLevel: SkillLevel | "all";
  /** Callback when category changes */
  onCategoryChange: (category: SkillCategory | "all") => void;
  /** Callback when level changes */
  onLevelChange: (level: SkillLevel | "all") => void;
  /** Whether to show level filters */
  showLevelFilter?: boolean;
  /** Animation delay for staggered animations */
  animationDelay?: number;
}

/**
 * Skill Filter Component
 *
 * Provides filtering controls for skills by category and level.
 * Supports responsive design and smooth animations.
 *
 * @param props - SkillFilterProps
 * @returns JSX.Element
 */
export function SkillFilter({
  selectedCategory,
  selectedLevel,
  onCategoryChange,
  onLevelChange,
  showLevelFilter = true,
  animationDelay = 0,
}: SkillFilterProps) {
  const categories: {
    value: SkillCategory | "all";
    label: string;
    icon: string;
  }[] = [
    { value: "all", label: "All Skills", icon: "🎯" },
    { value: "business", label: "Business", icon: "💼" },
    { value: "data", label: "Data", icon: "📊" },
    { value: "engineering", label: "Engineering", icon: "⚙️" },
    { value: "design", label: "Design", icon: "🎨" },
  ];

  const levels: { value: SkillLevel | "all"; label: string }[] = [
    { value: "all", label: "All Levels" },
    { value: "expert", label: "Expert" },
    { value: "proficient", label: "Proficient" },
    { value: "familiar", label: "Familiar" },
  ];

  /**
   * Get filter button color based on selection state
   */
  const getFilterColor = (isActive: boolean) => {
    return isActive
      ? "bg-gray-800 text-white border-gray-800"
      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400";
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Filter by Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <motion.button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${getFilterColor(selectedCategory === category.value)}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: animationDelay + 0.1 + index * 0.05,
              }}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Level Filter */}
      {showLevelFilter && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: animationDelay + 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900">
            Filter by Level
          </h3>
          <div className="flex flex-wrap gap-2">
            {levels.map((level, index) => (
              <motion.button
                key={level.value}
                onClick={() => onLevelChange(level.value)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${getFilterColor(selectedLevel === level.value)}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: animationDelay + 0.3 + index * 0.05,
                }}
              >
                <span className="text-sm font-medium">{level.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
