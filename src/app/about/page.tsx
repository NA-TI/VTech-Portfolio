"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { companyInfo } from "@/config/company-info";
import TeamMemberCard from "@/components/TeamMemberCard";

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 12 2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default function AboutPage() {
  const [isClient, setIsClient] = React.useState(false);
  const { content, isLoading, isMounted } = useContent();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
        </div>
      </div>
    );
  }

  const aboutContent = content.about;
  const companyContent = content.company;

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Ultra-thin Hero Section */}
      <section className="relative px-4 pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-cyan-50/40 to-teal-50/30 dark:from-slate-900/30 dark:via-cyan-900/15 dark:to-teal-900/10"></div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-green-500/10 dark:bg-green-400/10 border border-green-500/20 dark:border-green-400/20 rounded-full mb-6 md:mb-8"
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs md:text-sm font-medium text-green-700 dark:text-green-400">
                Building the future of software
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
              {isClient && isMounted && aboutContent?.hero?.title
                ? aboutContent.hero.title
                : "We Build Software That Actually Works"}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
              {isClient && isMounted && aboutContent?.hero?.description
                ? aboutContent.hero.description
                : "Founded with a mission to create reliable, scalable software solutions that help businesses thrive in the digital age."}
            </p>
          </motion.div>

          {/* Ultra-thin Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto px-4"
          >
            {companyInfo.stats.slice(0, 4).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="text-center p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 hover:border-slate-300/80 dark:hover:border-gray-600/80 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="text-2xl md:text-3xl mb-2 md:mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ultra-thin About Sections */}
      {isClient &&
        isMounted &&
        aboutContent?.sections &&
        aboutContent.sections.length > 0 && (
          <section className="px-4 py-12 md:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {aboutContent.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-slate-300/80 dark:hover:border-gray-600/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                      {section.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {section.content}
                    </p>
                    {section.image && (
                      <div className="mt-6">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Ultra-thin Team Members Section */}
      <section className="px-4 py-16 md:py-20 bg-gradient-to-br from-gray-50/60 via-cyan-50/40 to-teal-50/30 dark:from-gray-900/30 dark:via-cyan-900/15 dark:to-teal-900/10 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-vtech-slate-900/5 via-transparent to-vtech-cyan-500/5" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-vtech-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-vtech-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-vtech-cyan-500/15 to-vtech-purple-500/15 border border-vtech-cyan-500/25 dark:border-vtech-cyan-400/25 rounded-full mb-6 md:mb-8 shadow-lg backdrop-blur-sm"
            >
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500 animate-pulse shadow-sm"></div>
              <span className="text-xs md:text-sm font-semibold text-vtech-cyan-700 dark:text-vtech-cyan-300 tracking-wide">
                Meet the experts
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8"
            >
              Meet Our <span className="text-gradient-vtech-primary">Team</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            >
              The brilliant minds behind VTech's innovative solutions. Each team
              member brings unique expertise and passion to deliver exceptional
              results.
            </motion.p>
          </motion.div>

          {/* Ultra-thin Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto items-stretch px-4">
            {aboutContent?.teamMembers?.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member as any}
                index={index}
              />
            )) || (
              // Fallback team members if API data is not available
              <>
                <TeamMemberCard
                  key="fallback-1"
                  member={{
                    id: "fallback-1",
                    name: "Alex Chen",
                    role: "CEO & Lead Developer",
                    description:
                      "Full-stack architect with 8+ years of experience. Passionate about scalable solutions and cutting-edge technologies.",
                    avatar: "👨‍💻",
                    skills: ["React/Next.js", "Node.js", "TypeScript", "AWS"],
                    social: [
                      { platform: "LinkedIn", url: "#", icon: "linkedin" },
                      { platform: "GitHub", url: "#", icon: "github" },
                      { platform: "Twitter", url: "#", icon: "twitter" },
                    ],
                    status: "online",
                  }}
                  index={0}
                />
                <TeamMemberCard
                  key="fallback-2"
                  member={{
                    id: "fallback-2",
                    name: "Sarah Kim",
                    role: "UX/UI Designer",
                    description:
                      "Creative designer focused on user-centered design principles. Expert in creating intuitive and beautiful user experiences.",
                    avatar: "🎨",
                    skills: [
                      "Figma",
                      "Adobe Creative Suite",
                      "Prototyping",
                      "User Research",
                    ],
                    social: [
                      { platform: "LinkedIn", url: "#", icon: "linkedin" },
                      { platform: "Dribbble", url: "#", icon: "dribbble" },
                      { platform: "Behance", url: "#", icon: "behance" },
                    ],
                    status: "online",
                  }}
                  index={1}
                />
                <TeamMemberCard
                  key="fallback-3"
                  member={{
                    id: "fallback-3",
                    name: "Marcus Rodriguez",
                    role: "Backend Engineer",
                    description:
                      "Experienced backend developer specializing in scalable architecture and database design. Expert in Python and cloud services.",
                    avatar: "⚙️",
                    skills: ["Python", "Django", "PostgreSQL", "AWS"],
                    social: [
                      { platform: "LinkedIn", url: "#", icon: "linkedin" },
                      { platform: "GitHub", url: "#", icon: "github" },
                      { platform: "Twitter", url: "#", icon: "twitter" },
                    ],
                    status: "busy",
                  }}
                  index={2}
                />
                <TeamMemberCard
                  key="fallback-4"
                  member={{
                    id: "fallback-4",
                    name: "Lisa Wang",
                    role: "DevOps Engineer",
                    description:
                      "Infrastructure specialist focused on CI/CD pipelines and cloud architecture. Ensures reliable and scalable deployments.",
                    avatar: "🚀",
                    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
                    social: [
                      { platform: "LinkedIn", url: "#", icon: "linkedin" },
                      { platform: "GitHub", url: "#", icon: "github" },
                      { platform: "Twitter", url: "#", icon: "twitter" },
                    ],
                    status: "online",
                  }}
                  index={3}
                />
                <TeamMemberCard
                  key="fallback-5"
                  member={{
                    id: "fallback-5",
                    name: "David Thompson",
                    role: "Mobile Developer",
                    description:
                      "Cross-platform mobile developer with expertise in React Native and native iOS/Android development.",
                    avatar: "📱",
                    skills: ["React Native", "Swift", "Kotlin", "Firebase"],
                    social: [
                      { platform: "LinkedIn", url: "#", icon: "linkedin" },
                      { platform: "GitHub", url: "#", icon: "github" },
                      { platform: "Twitter", url: "#", icon: "twitter" },
                    ],
                    status: "online",
                  }}
                  index={4}
                />
              </>
            )}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20 md:mt-24"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to work with our talented team? Let's discuss your project
              and bring your vision to life.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500 text-white rounded-xl font-semibold text-base hover:shadow-2xl transition-all duration-300 group"
              >
                <span>Start Your Project</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ArrowRightIcon />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Bio Section */}
      <section className="px-4 py-16 bg-gray-50/40 dark:bg-gray-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About {companyContent.name}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {companyContent.bio}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                📧 {companyContent.email}
              </span>
              {companyContent.phone && (
                <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                  📞 {companyContent.phone}
                </span>
              )}
              <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                📍 {companyContent.address}
              </span>
              {companyContent.available && (
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                  ✅ Available for projects
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
