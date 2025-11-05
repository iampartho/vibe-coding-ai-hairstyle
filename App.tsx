
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { WebcamView } from './components/WebcamView';
import { EditorView } from './components/EditorView';
import { editImageWithHairstyle } from './services/geminiService';
import { Footer } from './components/Footer';
import { LandingView } from './components/LandingView';

type AppState = 'initial' | 'capturing' | 'editing' | 'loading' | 'displaying' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('initial');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCapture = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setAppState('editing');
  };

  const handleStartCapture = () => {
    setAppState('capturing');
  };

  const handleImageUpload = (imageSrc: string) => {
    setCapturedImage(imageSrc);
    setAppState('editing');
  }

  const handleGenerate = useCallback(async (hairstylePrompt: string) => {
    if (!capturedImage) return;
    setAppState('loading');
    setGeneratedImage(null);
    setErrorMessage('');
    try {
      const resultImage = await editImageWithHairstyle(capturedImage, hairstylePrompt);
      if (resultImage) {
        setGeneratedImage(resultImage);
        setAppState('displaying');
      } else {
        throw new Error('The AI could not generate an image. Please try a different prompt.');
      }
    } catch (error) {
      console.error('Error generating hairstyle:', error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(message);
      setAppState('error');
    }
  }, [capturedImage]);

  const handleReset = () => {
    setAppState('initial');
    setCapturedImage(null);
    setGeneratedImage(null);
    setErrorMessage('');
  };

  const handleRetryPrompt = () => {
    setAppState('editing');
    setGeneratedImage(null);
    setErrorMessage('');
  };

  const renderContent = () => {
    switch (appState) {
      case 'initial':
        return <LandingView onStartCapture={handleStartCapture} onImageUpload={handleImageUpload} />;
      case 'capturing':
        return <WebcamView onCapture={handleCapture} />;
      case 'editing':
      case 'loading':
      case 'displaying':
      case 'error':
        return (
          <EditorView
            capturedImage={capturedImage!}
            generatedImage={generatedImage}
            onGenerate={handleGenerate}
            onReset={handleReset}
            onRetryPrompt={handleRetryPrompt}
            isLoading={appState === 'loading'}
            isDisplaying={appState === 'displaying'}
            error={appState === 'error' ? errorMessage : null}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
