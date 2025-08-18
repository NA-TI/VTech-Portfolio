"use client";
import React, { useState } from "react";
import { companyInfo } from "@/config/company-info";
import { useHSBColors } from "@/hooks/useHSBColors";

const CareersPage = () => {
  const { brandGradients, createStyles } = useHSBColors();
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const jobOpenings = [];

  const departments = ["all", "Engineering", "Product", "Design", "Sales"];

  const filteredJobs =
    selectedDepartment === "all"
      ? jobOpenings
      : jobOpenings.filter((job) => job.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Join Our
              <span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                style={createStyles.gradient(brandGradients.primary)}
              >
                {" "}
                Team
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              We're not currently hiring, but we're always looking for talented
              individuals to join our team. Leave your information and we'll
              notify you when positions become available.
            </p>
          </div>
        </div>
      </div>

      {/* No Open Positions */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Open Positions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              We're not currently hiring, but we're always on the lookout for
              talented individuals who are passionate about technology and
              innovation. Leave your information below and we'll notify you when
              new opportunities become available.
            </p>

            {/* Interest Form */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get notified when we have new openings that match your
                interests.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Department of Interest</option>
                  <option value="frontend-development">
                    Frontend Development
                  </option>
                  <option value="backend-development">
                    Backend Development
                  </option>
                  <option value="full-stack-development">
                    Full Stack Development
                  </option>
                  <option value="devops-engineering">DevOps Engineering</option>
                  <option value="mobile-development">Mobile Development</option>
                  <option value="ai-ml-engineering">AI/ML Engineering</option>
                  <option value="data-engineering">Data Engineering</option>
                  <option value="product-management">Product Management</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="qa-testing">QA & Testing</option>
                  <option value="technical-writing">Technical Writing</option>
                  <option value="sales-engineering">Sales Engineering</option>
                  <option value="customer-success">Customer Success</option>
                </select>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Interested in Joining Our Team?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            While we're not currently hiring, we're always building our talent
            pipeline. Send us your resume and we'll reach out when the right
            opportunity comes along.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Submit Your Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
