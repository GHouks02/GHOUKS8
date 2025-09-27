import React from 'react';
import type { PhotoEditingTool } from '../types';
import { CheckIcon } from './icons/CheckIcon';

interface ToolCardProps {
  tool: PhotoEditingTool;
}

const getBadgeClass = (value: string) => {
  switch (value) {
    case 'Free':
      return 'bg-green-500/10 text-green-400 border border-green-500/20';
    case 'Freemium':
      return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
    case 'Paid':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    case 'Beginner-Friendly':
      return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    case 'Intermediate':
        return 'bg-teal-500/10 text-teal-400 border border-teal-500/20';
    case 'Professional':
        return 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
  }
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <a href={tool.website} target="_blank" rel="noopener noreferrer" className="group">
            <h2 className="text-2xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors duration-200">{tool.name}</h2>
          </a>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getBadgeClass(tool.pricing)}`}>
              {tool.pricing}
            </span>
             <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getBadgeClass(tool.easeOfUse)}`}>
              {tool.easeOfUse}
            </span>
          </div>
        </div>
        <p className="mt-3 text-slate-400">{tool.description}</p>
      </div>
      <div className="bg-slate-900/50 px-6 py-5 border-t border-slate-700">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Key Features</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {tool.keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-center text-slate-300">
              <CheckIcon className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};