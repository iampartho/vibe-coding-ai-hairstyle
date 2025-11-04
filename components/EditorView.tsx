import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { SparklesIcon, BackIcon, RetryIcon } from './IconComponents';

interface EditorViewProps {
  capturedImage: string;
  generatedImage: string | null;
  onGenerate: (prompt: string) => void;
  onReset: () => void;
  onRetryPrompt: () => void;
  isLoading: boolean;
  isDisplaying: boolean;
  error: string | null;
}

const hairstyleSuggestions = [
  { name: 'Pixie Cut', emoji: '💇‍♀️' },
  { name: 'Slick Back', emoji: '✨' },
  { name: 'Long Wavy', emoji: '🌊' },
  { name: 'Mohawk', emoji: '🤘' },
  { name: 'Bob Cut', emoji: '💁‍♀️' },
  { name: 'Curly Afro', emoji: '🧑‍🦱' },
  { name: 'Braided Crown', emoji: '👑' },
  { name: 'High Ponytail', emoji: '👱‍♀️' },
  { name: 'Man Bun', emoji: '👱‍♂️' },
  { name: 'Buzz Cut', emoji: '🪒' },
  { name: 'Undercut', emoji: '💈' },
  { name: 'Dreadlocks', emoji: '😎' },
  { name: 'Mullet', emoji: '🎸' },
  { name: 'Shag Cut', emoji: '🧑‍🎤' },
  { name: 'Spiky Hair', emoji: '🌵' },
  { name: 'Vibrant Blue', emoji: '💙' },
  { name: 'Fiery Red', emoji: '🔥' },
  { name: 'Pastel Pink', emoji: '🌸' },
];

export const EditorView: React.FC<EditorViewProps> = ({
  capturedImage,
  generatedImage,
  onGenerate,
  onReset,
  onRetryPrompt,
  isLoading,
  isDisplaying,
  error,
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };
  
  const imageToDisplay = generatedImage || capturedImage;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="relative w-full aspect-[4/3] bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-700 shadow-2xl">
        <img src={imageToDisplay} alt={generatedImage ? 'Generated Hairstyle' : 'Captured Photo'} className="w-full h-full object-cover" />
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <LoadingSpinner />
            <p className="text-slate-300 mt-4 text-lg font-medium animate-pulse">Styling in progress...</p>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-6 bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
                <p className="font-bold mb-1">Oh no, a snip!</p>
                <p>{error}</p>
            </div>
        )}
        
        {!isDisplaying && !error && (
            <>
                <h2 className="text-2xl font-bold text-slate-100">Describe Your Dream Hairstyle</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                    {hairstyleSuggestions.map((style) => (
                    <button
                        type="button"
                        key={style.name}
                        onClick={() => setPrompt(style.name)}
                        className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded-full text-sm hover:bg-cyan-500 hover:text-slate-900 transition-colors"
                    >
                        {style.emoji} {style.name}
                    </button>
                    ))}
                </div>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'vibrant blue mohawk' or 'elegant braided updo'"
                    className="w-full p-3 bg-slate-900 border-2 border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-colors h-28 resize-none"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-cyan-500 text-slate-900 font-bold text-lg rounded-full shadow-lg hover:bg-cyan-400 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <SparklesIcon className="w-6 h-6" />
                    {isLoading ? 'Generating...' : 'Generate Style'}
                </button>
                </form>
            </>
        )}
        
        {(isDisplaying || error) && (
            <div className="flex flex-col gap-4">
                {isDisplaying && <h2 className="text-2xl font-bold text-green-400">Success! How's this look?</h2>}
                <button
                    onClick={onRetryPrompt}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-600 text-slate-100 font-bold text-lg rounded-full shadow-lg hover:bg-slate-500 transition-colors"
                >
                    <RetryIcon className="w-6 h-6" />
                    Try a Different Style
                </button>
                <a
                    href={imageToDisplay}
                    download="hairstyle-ai-result.jpg"
                    className="w-full text-center px-6 py-3 bg-cyan-500 text-slate-900 font-bold text-lg rounded-full shadow-lg hover:bg-cyan-400 transition-colors"
                    >
                    Download Image
                </a>
            </div>
        )}

        <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-transparent border-2 border-slate-600 text-slate-300 font-bold text-lg rounded-full shadow-lg hover:bg-slate-700 transition-colors"
        >
          <BackIcon className="w-6 h-6" />
          Take a New Photo
        </button>
      </div>
    </div>
  );
};