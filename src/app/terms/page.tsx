"use client";
import React from "react";
import { companyInfo } from "@/config/company-info";
import { useHSBColors } from "@/hooks/useHSBColors";

const TermsPage = () => {
  const { brandGradients, createStyles } = useHSBColors();

  const termsSections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using our website and services, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
      ],
    },
    {
      title: "Use License",
      content: [
        "Permission is granted to temporarily download one copy of the materials (information or software) on VTech Software Solutions's website for personal, non-commercial transitory viewing only.",
        "This is the grant of a license, not a transfer of title, and under this license you may not:",
        "• Modify or copy the materials",
        "• Use the materials for any commercial purpose or for any public display",
        "• Attempt to reverse engineer any software contained on the website",
        "• Remove any copyright or other proprietary notations from the materials",
      ],
    },
    {
      title: "Service Terms",
      content: [
        "Our services are provided 'as is' and 'as available' without warranties of any kind.",
        "We reserve the right to modify, suspend, or discontinue any part of our services at any time.",
        "You are responsible for maintaining the confidentiality of your account information.",
        "You agree not to use our services for any unlawful purpose or in violation of these terms.",
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        "All content on this website, including text, graphics, logos, and software, is the property of VTech Software Solutions.",
        "You may not reproduce, distribute, or create derivative works without our written permission.",
        "Our trademarks and trade dress may not be used without our prior written permission.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "VTech Software Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "Our total liability to you for any claims arising from the use of our services shall not exceed the amount you paid us.",
        "We are not responsible for any third-party content or services linked to our website.",
      ],
    },
    {
      title: "Governing Law",
      content: [
        "These terms shall be governed by and construed in accordance with the laws of the State of California.",
        "Any disputes arising from these terms shall be resolved in the courts of San Francisco County, California.",
        "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect.",
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
              Terms of
              <span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                style={createStyles.gradient(brandGradients.primary)}
              >
                {" "}
                Service
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: March 15, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              These Terms of Service ("Terms") govern your use of our website
              and services operated by VTech Software Solutions. By accessing or
              using our services, you agree to be bound by these Terms.
            </p>

            {termsSections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <div className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <p
                      key={itemIndex}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Changes to Terms
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We reserve the right to modify these terms at any time. We will
                notify users of any material changes by posting the new Terms on
                this page. Your continued use of our services after such
                modifications constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about these Terms of Service, please
                contact us at:
              </p>
              <ul className="mt-2 text-gray-600 dark:text-gray-300">
                <li>Email: legal@vtech-solutions.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>
                  Address: 123 Tech Street, Suite 400, San Francisco, CA 94105
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're here to help clarify any questions you may have about our
            terms of service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@vtech-solutions.com"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Legal Team
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

export default TermsPage;

