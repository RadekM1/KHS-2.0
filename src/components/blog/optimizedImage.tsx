import React, { memo } from "react";

interface OptimizedImageProps {
  file: {
    file: string;
    alt: string;
    description: string;
    preview: string;
  };
  selectedFile: string;
  handleFileClick: (file: { file: string; description: string; alt: string; preview: string; }) => void;
  index: number;
}

const OptimizedImage = memo<OptimizedImageProps>(
  ({ file, 
    selectedFile, handleFileClick, index }) => {
    return (
        <div
          key={index}
          className={`cursor-pointer rounded border-[1px] border-gray-300 p-2 ${
            selectedFile === file.file
              ? "border-[1px] border-orange-500 bg-orange-200 dark:border-orange-900 dark:bg-orange-900"
              : "border-transparent"
          }`}
          onClick={() => handleFileClick(file)}
        >
          <img
            src={file.preview}
            alt={file.description}
            className="h-72 w-full rounded object-contain lg:h-72"
          />
        </div>
    )
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
