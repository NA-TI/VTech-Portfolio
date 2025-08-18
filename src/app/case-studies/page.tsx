"use client";
import React, { useState } from "react";
import { companyInfo } from "@/config/company-info";
import { useHSBColors } from "@/hooks/useHSBColors";

const CaseStudiesPage = () => {
  const { brandGradients, createStyles } = useHSBColors();
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const caseStudies = [
    {
      id: 1,
      title: "FinTech CRM Revolution",
      client: "TechStart Inc.",
      industry: "FinTech",
      description:
        "A comprehensive customer relationship management system that increased client retention by 45% and reduced processing time by 60%.",
      challenge:
        "Legacy system was slow, unreliable, and couldn't scale with growing customer base.",
      solution:
        "Built a modern, cloud-based CRM with AI-powered insights and automated workflows.",
      results: [
        "45% increase in client retention",
        "60% reduction in processing time",
        "300% improvement in system reliability",
        "$2M annual cost savings",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "AI/ML"],
      image: "/case-studies/fintech-crm.jpg",
      duration: "6 months",
      team: "8 developers",
    },
    {
      id: 2,
      title: "Healthcare Patient Portal",
      client: "HealthTech Solutions",
      industry: "Healthcare",
      description:
        "A secure patient portal that improved patient engagement and streamlined healthcare operations.",
      challenge:
        "Manual patient management processes were time-consuming and error-prone.",
      solution:
        "Developed a HIPAA-compliant patient portal with appointment scheduling and medical record access.",
      results: [
        "80% reduction in appointment scheduling time",
        "95% patient satisfaction rate",
        "50% decrease in administrative workload",
        "Enhanced data security compliance",
      ],
      technologies: ["Vue.js", "Python", "MongoDB", "Azure", "Docker"],
      image: "/case-studies/healthcare-portal.jpg",
      duration: "8 months",
      team: "6 developers",
    },
    {
      id: 3,
      title: "E-commerce Platform Scaling",
      client: "GrowthCorp",
      industry: "E-commerce",
      description:
        "Scaled an e-commerce platform to handle 10x traffic increase during peak seasons.",
      challenge:
        "Existing platform couldn't handle seasonal traffic spikes and was losing sales.",
      solution:
        "Implemented microservices architecture with auto-scaling and CDN optimization.",
      results: [
        "10x traffic handling capacity",
        "99.9% uptime during peak seasons",
        "40% faster page load times",
        "200% increase in conversion rate",
      ],
      technologies: ["Next.js", "Go", "Redis", "Kubernetes", "CloudFlare"],
      image: "/case-studies/ecommerce-scaling.jpg",
      duration: "4 months",
      team: "10 developers",
    },
    {
      id: 4,
      title: "Manufacturing IoT Dashboard",
      client: "SmartFactory Inc.",
      industry: "Manufacturing",
      description:
        "Real-time IoT dashboard for manufacturing process monitoring and optimization.",
      challenge:
        "Lack of real-time visibility into manufacturing processes was causing inefficiencies.",
      solution:
        "Built an IoT dashboard with real-time monitoring, predictive analytics, and alert systems.",
      results: [
        "25% reduction in production downtime",
        "30% improvement in energy efficiency",
        "Real-time process monitoring",
        "Predictive maintenance alerts",
      ],
      technologies: ["React", "Python", "InfluxDB", "MQTT", "TensorFlow"],
      image: "/case-studies/manufacturing-iot.jpg",
      duration: "7 months",
      team: "7 developers",
    },
    {
      id: 5,
      title: "Educational LMS Platform",
      client: "EduTech Academy",
      industry: "Education",
      description:
        "Comprehensive learning management system serving 50,000+ students across multiple institutions.",
      challenge:
        "Multiple institutions needed a unified platform for online learning and course management.",
      solution:
        "Developed a multi-tenant LMS with advanced analytics and mobile-first design.",
      results: [
        "50,000+ active students",
        "95% course completion rate",
        "60% reduction in administrative overhead",
        "Enhanced student engagement",
      ],
      technologies: ["Angular", "Java", "MySQL", "AWS", "Elasticsearch"],
      image: "/case-studies/education-lms.jpg",
      duration: "10 months",
      team: "12 developers",
    },
    {
      id: 6,
      title: "Real Estate Management System",
      client: "PropertyMax",
      industry: "Real Estate",
      description:
        "Comprehensive property management system with tenant portal and financial tracking.",
      challenge:
        "Manual property management was inefficient and lacked transparency for tenants.",
      solution:
        "Built a complete property management platform with tenant self-service features.",
      results: [
        "70% reduction in property management time",
        "90% tenant satisfaction rate",
        "Automated rent collection",
        "Real-time financial reporting",
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      image: "/case-studies/real-estate.jpg",
      duration: "5 months",
      team: "5 developers",
    },
  ];

  const industries = [
    "all",
    "FinTech",
    "Healthcare",
    "E-commerce",
    "Manufacturing",
    "Education",
    "Real Estate",
  ];

  const filteredCaseStudies =
    selectedIndustry === "all"
      ? caseStudies
      : caseStudies.filter((study) => study.industry === selectedIndustry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Success
              <span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                style={createStyles.gradient(brandGradients.primary)}
              >
                {" "}
                Stories
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Discover how we've helped businesses across industries transform
              their operations and achieve remarkable results through innovative
              software solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Industry Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                selectedIndustry === industry
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {industry === "all" ? "All Industries" : industry}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredCaseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {study.industry}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{study.title}</h3>
                  <p className="text-blue-100">{study.client}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {study.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Challenge
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Solution
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {study.solution}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Key Results
                  </h4>
                  <ul className="space-y-2">
                    {study.results.map((result, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {study.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>Duration: {study.duration}</span>
                  <span>Team: {study.team}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Impact in Numbers
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Projects Completed", value: "150+", icon: "📊" },
              { label: "Happy Clients", value: "80+", icon: "😊" },
              { label: "Success Rate", value: "98%", icon: "🎯" },
              { label: "Average ROI", value: "300%", icon: "💰" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how we can help transform your business with
            innovative software solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Project
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Our Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPage;
