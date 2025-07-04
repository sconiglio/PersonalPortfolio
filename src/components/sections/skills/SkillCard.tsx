"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Skill level type
 */
export type SkillLevel = "expert" | "proficient" | "familiar";

/**
 * Skill category type
 */
export type SkillCategory = "business" | "data" | "engineering" | "design";

/**
 * Skill data interface
 */
export interface Skill {
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  icon: string;
  experience: string;
  projects: number;
  achievement: string;
  endorsements: string[];
}

/**
 * Skill card props interface
 */
export interface SkillCardProps {
  /** Skill data to display */
  skill: Skill;
  /** Whether card is selected/filtered */
  isSelected?: boolean;
  /** Animation delay for staggered animations */
  animationDelay?: number;
  /** Whether to show detailed information */
  showDetails?: boolean;
  /** Click handler for the card */
  onClick?: (skill: Skill) => void;
}

/**
 * Skill Card Component
 *
 * Displays individual skill information in a card format.
 * Supports filtering, animations, and detailed view modes.
 *
 * @param props - SkillCardProps
 * @returns JSX.Element
 */
export function SkillCard({
  skill,
  isSelected = true,
  animationDelay = 0,
  showDetails = false,
  onClick,
}: SkillCardProps) {
  /**
   * Get badge color based on skill level
   */
  const getLevelBadgeColor = (level: SkillLevel) => {
    switch (level) {
      case "expert":
        return "bg-gray-800 text-white";
      case "proficient":
        return "bg-gray-600 text-white";
      case "familiar":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  /**
   * Handle card click
   */
  const handleClick = () => {
    onClick?.(skill);
  };

  return (
    <motion.div
      className={`p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "border-gray-300 bg-white shadow-sm hover:shadow-md"
          : "border-gray-200 bg-gray-50 opacity-50"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isSelected ? 1 : 0.5, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      whileHover={isSelected ? { scale: 1.02 } : {}}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {skill.name}
            </h3>
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getLevelBadgeColor(skill.level)}`}
            >
              {skill.level}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Experience:</span>
          <span className="font-medium">{skill.experience}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Projects:</span>
          <span className="font-medium">{skill.projects}</span>
        </div>

        {showDetails && (
          <>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-700 mb-3">{skill.achievement}</p>
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-600">
                  Endorsements:
                </span>
                <div className="flex flex-wrap gap-1">
                  {skill.endorsements.map((endorsement, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {endorsement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
