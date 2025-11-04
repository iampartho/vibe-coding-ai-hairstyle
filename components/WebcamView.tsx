
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CameraIcon, NoCameraIcon } from './IconComponents';

interface WebcamViewProps {
  onCapture: (imageSrc: string) => void;
}

export const WebcamView: React.FC<WebcamViewProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    const enableStream = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
        setError("Could not access the webcam. Please grant permission and try again.");
      }
    };

    enableStream();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(dataUrl);
      }
    }
  }, [onCapture]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 bg-slate-800/50 rounded-2xl shadow-lg border border-slate-700">
      <h2 className="text-xl md:text-2xl font-semibold text-center text-slate-200">Position Yourself for a New Look</h2>
      <div className="relative w-full max-w-2xl aspect-[16/9] bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-700">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-red-400 p-4">
            <NoCameraIcon className="w-16 h-16 mb-4" />
            <p className="text-center font-medium">{error}</p>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <button
        onClick={handleCapture}
        disabled={!!error || !stream}
        className="flex items-center justify-center gap-3 px-8 py-3 bg-cyan-500 text-slate-900 font-bold text-lg rounded-full shadow-lg hover:bg-cyan-400 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
      >
        <CameraIcon className="w-6 h-6" />
        Take Photo
      </button>
    </div>
  );
};
