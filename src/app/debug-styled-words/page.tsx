"use client";
import React from 'react';
import { useFunInterests } from '@/hooks/useFunInterests';
import SelectiveTextStyling from '@/components/SelectiveTextStyling';

export default function DebugStyledWords() {
  const { interests, loading, error } = useFunInterests();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading interests...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Debug: Styled Words
        </h1>

        <div className="space-y-8">
          {interests.map((interest, index) => (
            <div key={interest.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {interest.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Raw Data */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Raw Data
                  </h3>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Description:</strong>
                    </p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mb-4">
                      {interest.description}
                    </p>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <strong>Styled Words:</strong>
                    </p>
                    <pre className="text-xs text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 p-2 rounded overflow-auto">
                      {JSON.stringify(interest.styled_words, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* Rendered Output */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Rendered Output
                  </h3>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    {interest.styled_words && interest.styled_words.length > 0 ? (
                      <SelectiveTextStyling
                        text={interest.description}
                        styledWords={interest.styled_words}
                        className="text-sm text-gray-800 dark:text-gray-200"
                      />
                    ) : (
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {interest.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Debug Info */}
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Debug Info
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <p>• Has styled_words: {interest.styled_words ? 'Yes' : 'No'}</p>
                  <p>• styled_words length: {interest.styled_words?.length || 0}</p>
                  <p>• styled_words type: {typeof interest.styled_words}</p>
                  <p>• styled_words is array: {Array.isArray(interest.styled_words) ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {interests.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-gray-400">No interests found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 