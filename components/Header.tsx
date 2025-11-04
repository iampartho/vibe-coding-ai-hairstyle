
import React from 'react';
import { ScissorsIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex items-center space-x-3">
            <ScissorsIcon className="h-8 w-8 text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              Hairstyle AI
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
