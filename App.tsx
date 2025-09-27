import React, { useState, useCallback, useEffect } from 'react';
import { fetchPhotoEditingTools } from './services/geminiService';
import type { PhotoEditingTool, GroundingChunk } from './types';
import { ToolCard } from './components/ToolCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { SourceLink } from './components/SourceLink';
import { LogoIcon } from './components/icons/LogoIcon';

const initialPrompt = `Provide a complete and updated list of all websites and apps specialized in photo editing online. Include free and paid tools, and mention key features such as background removal, quality enhancement, face retouching, effects, and design. Organize the results by popularity and ease of use. CRITICAL: Your entire response must be ONLY a single, valid JSON array of objects. Do not include any text, titles, or explanations before or after the JSON array. Each object in the array must have the following structure: { "name": string, "website": string, "pricing": "Free" | "Paid" | "Freemium", "description": string, "easeOfUse": "Beginner-Friendly" | "Intermediate" | "Professional", "keyFeatures": string[] }.`;

const App: React.FC = () => {
  const [prompt] = useState<string>(initialPrompt);
  const [results, setResults] = useState<PhotoEditingTool[] | null>(null);
  const [sources, setSources] = useState<GroundingChunk[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setShowResults(false);
    setError(null);
    setResults(null);
    setSources(null);

    try {
      const { tools, sources } = await fetchPhotoEditingTools(prompt);
      setResults(tools);
      setSources(sources);
      // Trigger animation
      setTimeout(() => setShowResults(true), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-20">
          <LoadingSpinner />
          <p className="text-lg text-slate-400 mt-4">Finding the best tools for you...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20 bg-red-900/30 border border-red-500/50 rounded-lg p-6">
          <p className="text-xl font-semibold text-red-300">Oops! Something went wrong.</p>
          <p className="text-md text-red-400 mt-2">{error}</p>
        </div>
      );
    }
    
    if (results) {
        return (
          <div className={`transition-opacity duration-700 ease-in-out ${showResults ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2 space-y-6">
                {results.map((tool, index) => (
                  <ToolCard key={index} tool={tool} />
                ))}
              </div>
              <div className="lg:col-span-1">
                {sources && sources.length > 0 && (
                  <div className="bg-slate-900/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-700 sticky top-8">
                    <h3 className="text-xl font-bold text-slate-100 mb-4">Sources</h3>
                    <div className="space-y-3">
                      {sources.map((source, index) => (
                        <SourceLink key={index} source={source.web} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 font-sans text-slate-200">
      <header className="relative py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-4 mb-4">
            <LogoIcon />
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">
              Photo Editor Finder
            </h1>
          </div>
          <p className="mt-2 text-lg text-slate-400 max-w-2xl mx-auto">
            Your AI-powered guide to the best online photo editing tools, tailored to your needs.
          </p>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-8">
        <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl shadow-md border border-slate-700 mb-10">
          <label htmlFor="prompt" className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            Search Context
          </label>
          <p id="prompt" className="text-slate-300 text-sm p-2 rounded-lg bg-slate-700/50 border border-slate-600">
            {prompt}
          </p>
        </div>

        <div>
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;