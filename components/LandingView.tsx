import React, { useRef } from 'react';
import { CameraIcon, UploadIcon } from './IconComponents';

interface LandingViewProps {
  onStartCapture: () => void;
  onImageUpload: (imageSrc: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStartCapture, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onImageUpload(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700 max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Welcome to Hairstyle AI</h2>
      <p className="text-lg text-slate-300">
        Ready for a new look? Choose an option below to get started. You can use your webcam for a live photo or upload an existing picture.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-4">
        <button
          onClick={onStartCapture}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 text-slate-900 font-bold text-lg rounded-full shadow-lg hover:bg-cyan-400 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <CameraIcon className="w-6 h-6" />
          Take a Photo
        </button>
        <button
          onClick={handleUploadClick}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-slate-600 text-slate-100 font-bold text-lg rounded-full shadow-lg hover:bg-slate-500 transition-colors"
        >
          <UploadIcon className="w-6 h-6" />
          Upload an Image
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />
      </div>
    </div>
  );
};
