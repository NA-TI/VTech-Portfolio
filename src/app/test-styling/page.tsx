"use client";
import React from 'react';
import SelectiveTextStyling from '@/components/SelectiveTextStyling';

interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color';
  color?: string;
}

export default function TestStyling() {
  const testText = "When I'm not designing websites, I'm probably in Blender or Cinema 4D creating 3D artwork. Because apparently 2D design wasn't challenging enough, I had to add a whole extra dimension to my creative chaos.";
  
  const testStyledWords: StyledWord[] = [
    { word: 'design', style: 'bold-color', color: 'blue' },
    { word: 'Blender', style: 'bold-color', color: 'purple' },
    { word: 'Cinema 4D', style: 'bold-color', color: 'purple' },
    { word: '3D artwork', style: 'bold-color', color: 'green' },
    { word: '2D design', style: 'italic' },
    { word: 'creative chaos', style: 'bold-color', color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Test: Selective Text Styling
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test Text
          </h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Original Text:
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {testText}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Styled Text:
            </h3>
            <SelectiveTextStyling
              text={testText}
              styledWords={testStyledWords}
              className="text-gray-600 dark:text-gray-400"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Styled Words Data:
            </h3>
            <pre className="text-xs text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-auto">
              {JSON.stringify(testStyledWords, null, 2)}
            </pre>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              ✅ Test Results
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If you can see the styled text above with highlighted words, the SelectiveTextStyling component is working correctly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 