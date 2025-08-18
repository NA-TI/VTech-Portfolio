"use client";
import React from "react";
import { motion } from "framer-motion";

interface TestimonialResult {
  metric: string;
  improvement: string;
  timeframe: string;
}

interface EnhancedTestimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  results: TestimonialResult[];
  projectType: string;
  duration: string;
}

interface EnhancedTestimonialsProps {
  testimonials: EnhancedTestimonial[];
  className?: string;
}

const EnhancedTestimonials: React.FC<EnhancedTestimonialsProps> = ({
  testimonials,
  className = "",
}) => {
  return (
    <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 ${className}`}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200/60 dark:border-gray-700/60 h-full hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] flex flex-col relative overflow-hidden">
            {/* Top Section with Project Info */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {testimonial.projectType}
                </h3>
                <div className="flex items-center space-x-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-5 h-5 text-gradient-vtech-primary fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </motion.svg>
                  ))}
                </div>
              </div>
              <div className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-vtech-cyan-500/10 to-vtech-purple-500/10 border border-vtech-cyan-500/20 dark:border-vtech-cyan-400/20">
                <span className="text-sm font-semibold text-vtech-cyan-700 dark:text-vtech-cyan-300">
                  {testimonial.duration}
                </span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="relative mb-8">
              <div className="absolute -top-2 -left-2 text-4xl text-vtech-cyan-500/30 dark:text-vtech-cyan-400/30 font-serif">
                "
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-base pl-6 italic">
                {testimonial.content}
              </blockquote>
            </div>

            {/* Results Section */}
            <div className="mb-8 flex-1">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                Key Results Achieved
              </h4>
              <div className="space-y-4">
                {testimonial.results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-vtech-cyan-50/50 to-vtech-purple-50/50 dark:from-vtech-cyan-900/20 dark:to-vtech-purple-900/20 border border-vtech-cyan-200/30 dark:border-vtech-cyan-700/30"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {result.metric}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {result.timeframe}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gradient-vtech-primary">
                        {result.improvement}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Author Section */}
            <div className="flex items-center pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="relative">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback =
                        (e.currentTarget.nextSibling as HTMLElement) || null;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br from-vtech-cyan-500 to-vtech-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg ${testimonial.image ? "hidden" : ""}`}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <div className="font-bold text-gray-900 dark:text-white text-lg">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.title} at {testimonial.company}
                </div>
              </div>
            </div>

            {/* Subtle Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-vtech-cyan-500/5 to-vtech-purple-500/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-vtech-purple-500/5 to-vtech-cyan-500/5 rounded-full translate-y-12 -translate-x-12" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EnhancedTestimonials;
