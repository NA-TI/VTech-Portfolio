"use client";
import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  currentImage?: string;
  className?: string;
}

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  accept = "image/*", 
  maxSize = 5,
  currentImage,
  className = ""
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (accept === "image/*" && !file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (!validateFile(file)) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    onFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${preview ? 'bg-gray-50 dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-3">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-20 object-cover rounded-lg mx-auto border border-gray-200 dark:border-gray-600"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click to change image
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <UploadIcon />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Drop your image here, or click to browse
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Maximum file size: {maxSize}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* File Info */}
      {preview && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>✓ Image uploaded successfully</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
