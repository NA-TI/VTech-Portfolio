"use client";
import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
  aspectRatio?: number | null; // null => freeform
  circular?: boolean;
  isOpen: boolean;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCropper({
  imageSrc,
  onCropComplete,
  onCancel,
  aspectRatio = null,
  circular = false,
  isOpen,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (aspectRatio) {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspectRatio));
      }
    },
    [aspectRatio]
  );

  const getCroppedImg = useCallback(
    async (
      image: HTMLImageElement,
      crop: PixelCrop,
      fileName: string
    ): Promise<Blob> => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            }
          },
          "image/jpeg",
          0.95
        );
      });
    },
    []
  );

  const handleCropComplete = async () => {
    if (!imgRef.current) return;

    try {
      // If user didn't select a crop, use the full image
      const fallbackCrop: PixelCrop =
        completedCrop ||
        ({
          x: 0,
          y: 0,
          width: imgRef.current.width,
          height: imgRef.current.height,
          unit: "px",
        } as unknown as PixelCrop);
      const croppedImageBlob = await getCroppedImg(
        imgRef.current,
        fallbackCrop,
        "cropped-logo.jpg"
      );
      onCropComplete(croppedImageBlob);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Crop Image
              </h3>
              <button
                onClick={onCancel}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Cropper Content */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Controls */}
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Scale:
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {scale.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Rotate:
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="1"
                      value={rotate}
                      onChange={(e) => setRotate(Number(e.target.value))}
                      className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                      {rotate}°
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Aspect: 1:1 (Square)
                    </span>
                  </div>
                </div>

                {/* Image Cropper */}
                <div className="flex justify-center">
                  <div className="relative">
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspectRatio === null ? undefined : aspectRatio}
                      circularCrop={circular}
                      className="max-h-[60vh] max-w-full"
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imageSrc}
                        style={{
                          transform: `scale(${scale}) rotate(${rotate}deg)`,
                          maxHeight: "60vh",
                          maxWidth: "100%",
                        }}
                        onLoad={onImageLoad}
                        className="rounded-lg"
                      />
                    </ReactCrop>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Drag to move • Scroll to zoom • Drag corners to resize •
                    Rotate to adjust
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCropComplete}
                disabled={!completedCrop}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
              >
                Apply Crop
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
