"use client";
import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import ImageCropper from "./ImageCropper";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onUploadComplete?: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  currentImage?: string;
  className?: string;
  folder?: string;
  label?: string;
  crop?: {
    aspect?: number | null; // null => freeform
    circular?: boolean; // true => circle mask
  };
  showCropOptions?: boolean;
  presets?: Array<{ id: string; label: string; aspect: number | null }>;
}

// Ultra-thin icons
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21,15 16,10 5,21" />
  </svg>
);

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const LoadingIcon = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
    ></circle>
    <path
      className="opacity-60"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  onUploadComplete,
  accept = "image/*",
  maxSize = 5,
  currentImage,
  className = "",
  folder = "uploads",
  label = "Upload Image",
  crop = { aspect: 1, circular: true },
  showCropOptions = true,
  presets = [
    { id: "square", label: "Square 1:1", aspect: 1 },
    { id: "landscape", label: "Landscape 16:9", aspect: 16 / 9 },
    { id: "portrait", label: "Portrait 4:5", aspect: 4 / 5 },
    { id: "free", label: "Freeform", aspect: null },
  ],
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultPresetId = (() => {
    const match = presets.find((p) => p.aspect === (crop?.aspect ?? 1));
    return match ? match.id : "square";
  })();
  const [selectedPresetId, setSelectedPresetId] =
    useState<string>(defaultPresetId);
  const selectedPreset =
    presets.find((p) => p.id === selectedPresetId) || presets[0];
  const [circular, setCircular] = useState<boolean>(
    crop?.circular ?? selectedPreset.aspect === 1
  );

  const validateFile = (file: File): boolean => {
    // Check file type
    if (accept === "image/*" && !file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, GIF, etc.)");
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelect = async (file: File) => {
    if (!validateFile(file)) return;

    // Create temporary preview for cropping
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setTempImageSrc(e.target.result as string);
        setShowCropper(true);
      }
    };
    reader.readAsDataURL(file);

    onFileUpload(file);
  };

  const handleCropComplete = async (croppedImageBlob: Blob) => {
    setIsUploading(true);
    setUploadProgress(0);
    setShowCropper(false);

    try {
      // Create preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(croppedImageBlob);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Upload cropped image to server
      const formData = new FormData();
      formData.append("file", croppedImageBlob, "cropped-logo.jpg");
      formData.append("folder", folder);

      // Add current image URL for cleanup if it exists and is a Supabase URL
      if (currentImage && currentImage.includes("supabase.co")) {
        formData.append("oldImageUrl", currentImage);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (data.success) {
        // Update preview with actual uploaded URL
        setPreview(data.url);
        onUploadComplete?.(data.url);
        toast.success("Image cropped and uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
        setPreview(null);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
      setPreview(null);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImageSrc("");
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
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUploadComplete?.("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Crop presets */}
      {showCropOptions && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setSelectedPresetId(p.id);
                if (p.aspect !== 1 && circular) setCircular(false);
              }}
              className={`px-2.5 py-1.5 rounded-md border transition-colors ${
                selectedPresetId === p.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white/10 dark:bg-gray-700/40 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-white/30 dark:hover:bg-gray-700"
              }`}
            >
              {p.label}
            </button>
          ))}
          <div className="flex items-center gap-1 ml-2">
            <input
              id="crop-circle"
              type="checkbox"
              checked={circular}
              onChange={(e) => setCircular(e.target.checked)}
              disabled={selectedPreset.aspect !== 1}
              className="h-3.5 w-3.5"
            />
            <label
              htmlFor="crop-circle"
              className={`select-none ${
                selectedPreset.aspect !== 1
                  ? "text-gray-400"
                  : "text-gray-700 dark:text-gray-200"
              }`}
              title={
                selectedPreset.aspect !== 1
                  ? "Circle mask requires 1:1 aspect"
                  : "Toggle circular crop"
              }
            >
              Circle
            </label>
          </div>
        </div>
      )}
      {/* Image Cropper Modal */}
      <ImageCropper
        imageSrc={tempImageSrc}
        onCropComplete={handleCropComplete}
        onCancel={handleCropCancel}
        aspectRatio={selectedPreset.aspect}
        circular={!!circular}
        isOpen={showCropper}
      />

      {/* Label */}
      {label && (
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 tracking-wide">
          {label}
        </label>
      )}

      {/* File Upload Area */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`
          relative border border-dashed rounded-xl p-6 text-center transition-all duration-300
          ${
            isUploading
              ? "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed"
              : isDragOver
                ? "border-blue-500/50 bg-blue-50/50 dark:bg-blue-900/10 cursor-pointer scale-[1.02]"
                : "border-white/20 dark:border-gray-600/50 hover:border-blue-500/30 dark:hover:border-blue-500/30 cursor-pointer hover:bg-white/5 dark:hover:bg-gray-700/50"
          }
          ${preview ? "bg-white/5 dark:bg-gray-800/50" : "bg-white/5 dark:bg-gray-700/50"}
        `}
        whileHover={!isUploading ? { scale: 1.01 } : {}}
        whileTap={!isUploading ? { scale: 0.99 } : {}}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg mx-auto border border-white/10 dark:border-gray-600/50 shadow-lg"
                />

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFileInput();
                      }}
                      className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                      title="Change image"
                    >
                      <CameraIcon />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="p-2 bg-red-500/20 backdrop-blur-sm text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Remove image"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">
                  {isUploading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <LoadingIcon />
                      <span>Uploading... {uploadProgress}%</span>
                    </span>
                  ) : (
                    "Click to change image or drag a new one"
                  )}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <div
                  className={`
                  w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
                  ${
                    isDragOver
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-white/10 dark:bg-gray-600/50 text-gray-500 dark:text-gray-400"
                  }
                `}
                >
                  {isUploading ? <LoadingIcon /> : <UploadIcon />}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white tracking-wide">
                  {isDragOver
                    ? "Drop your image here"
                    : "Drop your image here, or click to browse"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
                  Supports JPG, PNG, GIF • Max {maxSize}MB • Advanced cropping
                  available
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Progress Bar */}
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 4 }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gray-200 dark:bg-gray-700 rounded-b-xl overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* File Info */}
      {preview && !isUploading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-xs text-green-600 dark:text-green-400"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>Image uploaded successfully</span>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
