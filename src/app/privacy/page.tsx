"use client";
import React from "react";
import { companyInfo } from "@/config/company-info";
import { useHSBColors } from "@/hooks/useHSBColors";

const PrivacyPage = () => {
  const { brandGradients, createStyles } = useHSBColors();

  const privacySections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone number) when you contact us or use our services",
        "Usage data and analytics to improve our services",
        "Technical information about your device and browser",
        "Cookies and similar tracking technologies",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services",
        "To communicate with you about our services",
        "To improve and personalize your experience",
        "To comply with legal obligations",
        "To protect against fraud and abuse",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share information with trusted service providers who assist us in operating our business",
        "We may disclose information if required by law or to protect our rights and safety",
        "We may share aggregated, non-personal information for research and analytics",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement appropriate security measures to protect your personal information",
        "We use encryption to secure data transmission",
        "We regularly review and update our security practices",
        "We limit access to personal information to authorized personnel only",
      ],
    },
    {
      title: "Your Rights",
      content: [
        "Access and review your personal information",
        "Request correction of inaccurate information",
        "Request deletion of your personal information",
        "Opt-out of marketing communications",
        "Withdraw consent for data processing",
      ],
    },
    {
      title: "Contact Us",
      content: [
        "If you have questions about this privacy policy, please contact us at:",
        "Email: privacy@vtech-solutions.com",
        "Phone: +1 (555) 123-4567",
        "Address: 123 Tech Street, Suite 400, San Francisco, CA 94105",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Privacy
              <span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                style={createStyles.gradient(brandGradients.primary)}
              >
                {" "}
                Policy
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              We are committed to protecting your privacy and ensuring the
              security of your personal information.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: March 15, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              At VTech Software Solutions, we respect your privacy and are
              committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </p>

            {privacySections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Changes to This Policy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. We encourage you
                to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're here to help. Contact us if you have any questions about our
            privacy practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@vtech-solutions.com"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Privacy Team
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              General Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

