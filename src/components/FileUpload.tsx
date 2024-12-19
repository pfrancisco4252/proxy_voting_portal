import React, { useState } from 'react';
import { uploadFile } from '../services/fileService';

interface FileUploadProps {
  onFileUploaded: (file: any) => void;
  acceptedTypes?: string;
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUploaded,
  acceptedTypes = "*",
  maxSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const validateFile = (file: File): boolean => {
    if (maxSize && file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return false;
    }
    
    if (acceptedTypes !== "*" && !file.type.match(acceptedTypes)) {
      setError("Invalid file type");
      return false;
    }

    return true;
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      await processFile(file);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    try {
      setUploading(true);
      const uploadedFile = await uploadFile(file);
      onFileUploaded(uploadedFile);
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
        ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
        ${error ? 'border-red-500' : ''}
      `}
    >
      <div className="space-y-4">
        <div className="flex justify-center">
          <svg
            className={`w-12 h-12 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <div className="text-gray-600">
          {uploading ? (
            <p>Uploading...</p>
          ) : (
            <>
              <p className="font-medium">Drag and drop your file here, or</p>
              <label className="cursor-pointer text-indigo-600 hover:text-indigo-500">
                <span>browse</span>
                <input
                  type="file"
                  className="hidden"
                  accept={acceptedTypes}
                  onChange={handleFileInput}
                />
              </label>
            </>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
