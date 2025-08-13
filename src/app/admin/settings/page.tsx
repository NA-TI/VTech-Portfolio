"use client";
import React from "react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">General configuration (coming soon)</p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
          <li>Branding, theme, and SEO options</li>
          <li>Admin credentials management</li>
          <li>API keys and integrations</li>
        </ul>
      </div>
    </div>
  );
}



