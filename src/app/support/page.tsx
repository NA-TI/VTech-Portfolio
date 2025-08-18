"use client";
import React from "react";
import { companyInfo } from "@/config/company-info";
import { useHSBColors } from "@/hooks/useHSBColors";

const SupportPage = () => {
  const { brandGradients, createStyles } = useHSBColors();

  const supportOptions = [
    {
      title: "Knowledge Base",
      description: "Browse our comprehensive documentation and tutorials",
      icon: "📚",
      href: "/docs",
    },
    {
      title: "Community Forum",
      description: "Connect with other developers and share solutions",
      icon: "💬",
      href: "#",
    },
    {
      title: "Email Support",
      description: "Get help from our technical support team",
      icon: "✉️",
      href: "mailto:support@vtech-solutions.com",
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: "💬",
      href: "#",
    },
  ];

  const faqs = [
    {
      question: "How do I get started with your platform?",
      answer:
        "Check out our getting started guide in the documentation section for step-by-step instructions.",
    },
    {
      question: "What are your support hours?",
      answer:
        "Our support team is available Monday through Friday, 9 AM to 6 PM PST. Emergency support is available 24/7 for enterprise customers.",
    },
    {
      question: "How can I report a bug?",
      answer:
        "You can report bugs through our support email or by creating an issue in our community forum.",
    },
    {
      question: "Do you offer training sessions?",
      answer:
        "Yes, we offer training sessions for enterprise customers. Contact our sales team to learn more.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Support &
              <span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                style={createStyles.gradient(brandGradients.primary)}
              >
                {" "}
                Help
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              We're here to help you succeed. Find the support option that works
              best for you.
            </p>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {option.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {option.description}
              </p>
              <a
                href={option.href}
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Get Help
              </a>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our support team is ready to assist you with any questions or
            issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@vtech-solutions.com"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Support
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;

