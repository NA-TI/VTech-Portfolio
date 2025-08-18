"use client";
import React from "react";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  photo?: string;
  skills: string[];
  social: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  status: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "busy":
        return "bg-amber-500";
      default:
        return "bg-slate-500";
    }
  };

  const getRoleIcon = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes("ceo") || roleLower.includes("lead")) return "👑";
    if (roleLower.includes("design") || roleLower.includes("ui")) return "🎨";
    if (roleLower.includes("backend") || roleLower.includes("devops"))
      return "⚙️";
    if (roleLower.includes("mobile")) return "📱";
    if (roleLower.includes("frontend")) return "💻";
    return "🚀";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Modern Card Container */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden h-full flex flex-col">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-slate-100/30 dark:from-slate-800/30 dark:via-transparent dark:to-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Header Section */}
        <div className="relative mb-8">
          {/* Avatar and Status */}
          <div className="flex items-start justify-between mb-6">
            <div className="relative">
              {/* Photo or Avatar */}
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback =
                      (e.currentTarget.nextSibling as HTMLElement) || null;
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
              ) : null}
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 ${member.photo ? "hidden" : ""}`}
              >
                {member.avatar}
              </div>

              {/* Status Indicator */}
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white dark:border-slate-900 ${getStatusColor(member.status)}`}
              />
            </div>

            {/* Role Icon */}
            <div className="text-2xl md:text-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {getRoleIcon(member.role)}
            </div>
          </div>

          {/* Name and Role */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg inline-block">
              {member.role}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 flex-1">
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3">
            {member.description}
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-8 flex-shrink-0">
          <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
            Expertise
          </h4>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {member.skills.slice(0, 3).map((skill, skillIndex) => (
              <motion.span
                key={skillIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: skillIndex * 0.1 }}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg text-xs md:text-sm font-medium border border-cyan-200/50 dark:border-cyan-700/50"
              >
                {skill}
              </motion.span>
            ))}
            {member.skills.length > 3 && (
              <span className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs md:text-sm font-medium">
                +{member.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex-shrink-0">
          <div className="flex gap-2">
            {member.social.slice(0, 3).map((social, socialIndex) => (
              <motion.a
                key={socialIndex}
                href={social.url}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: socialIndex * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  {social.icon === "linkedin" && (
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  )}
                  {social.icon === "github" && (
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  )}
                  {social.icon === "twitter" && (
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  )}
                  {social.icon === "dribbble" && (
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073a44.91 44.91 0 01-.767-.396c-.64-.35-1.338-.699-2.086-1.047-.749-.348-1.516-.646-2.299-.894-.783-.248-1.586-.372-2.399-.372-.813 0-1.616.124-2.399.372-.783.248-1.516.546-2.299.894-.748.348-1.446.697-2.086 1.047a44.91 44.91 0 01-.767.396c-2.16.372-4.528.349-7.103.073C1.892 9.401 1.5 6.559 1.5 3.5c0-1.933.5-3.5 1.5-4.5C4.5-2 6.067-2.5 8-2.5s3.5.5 4.5 1.5c1 1 1.5 2.567 1.5 4.5 0 3.059-.392 5.901-1.115 8.441zM12 1.5c-1.933 0-3.5.5-4.5 1.5C6.5 4 6 5.567 6 7.5c0 1.933.5 3.5 1.5 4.5C8.5 13 10.067 13.5 12 13.5s3.5-.5 4.5-1.5c1-1 1.5-2.567 1.5-4.5 0-1.933-.5-3.5-1.5-4.5C15.5 2 13.933 1.5 12 1.5z" />
                  )}
                  {social.icon === "behance" && (
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H13.96c.13 3.211 3.483 3.312 4.588 2.029h3.178zm-7.686 4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 6.061-3.207 6.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                  )}
                </svg>
              </motion.a>
            ))}
          </div>

          {/* View Profile Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors duration-300"
          >
            View Profile →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
