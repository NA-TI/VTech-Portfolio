"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/useData";
import { companyInfo } from "@/config/company-info";

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

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

type Category = "all" | "web" | "mobile" | "cloud" | "ai" | "enterprise";

const categories: { id: Category; label: string; description: string }[] = [
  { id: "all", label: "All Projects", description: "Complete portfolio" },
  {
    id: "web",
    label: "Web Applications",
    description: "Full-stack web solutions",
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    description: "iOS & Android applications",
  },
  {
    id: "cloud",
    label: "Cloud Solutions",
    description: "Infrastructure & DevOps",
  },
  { id: "ai", label: "AI & ML", description: "Machine learning integration" },
  {
    id: "enterprise",
    label: "Enterprise Software",
    description: "Large-scale systems",
  },
];

export default function WorkPage() {
  const [isClient, setIsClient] = React.useState(false);
  const [category, setCategory] = useState<Category>("all");

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: allProjects, isLoading } = useProjects(category);
  const { data: featured } = useProjects(undefined, true);

  const projects = allProjects?.data ?? [];
  const featuredProjects = featured?.data ?? [];

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

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Hero */}
      <section className="px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Recent{" "}
              <span className="bg-gradient-to-r from-slate-800 to-cyan-500 bg-clip-text text-transparent">
                Work
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A growing collection of software we've built for startups and
              established businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="text-center py-24 text-gray-600 dark:text-gray-400">
                Loading projects…
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  More Projects Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We're working on some exciting software projects. Check back
                  soon to see our latest work.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Work with us
                  <ArrowRightIcon />
                </Link>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {projects.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/projects/${p.id}`}
                      className="group block rounded-2xl overflow-hidden border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-950 hover:shadow-xl hover:border-slate-300 dark:hover:border-gray-700 transition-all duration-300"
                    >
                      <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-900 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full">
                            {p.category === "web"
                              ? "Web Application"
                              : p.category === "mobile"
                                ? "Mobile App"
                                : p.category === "ai"
                                  ? "AI/ML Solution"
                                  : p.category === "cloud"
                                    ? "Cloud Infrastructure"
                                    : p.category === "enterprise"
                                      ? "Enterprise Software"
                                      : "Software Solution"}
                          </span>
                          {p.live_url && (
                            <div className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                              <ExternalLinkIcon />
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                          {p.title}
                        </h3>

                        {p.description && (
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                            {p.description}
                          </p>
                        )}

                        {p.technologies && p.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {p.technologies.slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded border border-gray-200/20 dark:border-gray-700/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center text-sm font-medium text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                          View project
                          <ArrowRightIcon />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="px-4 py-16 border-t border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Let's talk about your software needs and see how we can help bring
            your ideas to life.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Get in touch
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}
