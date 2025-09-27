import React from 'react';
import { LinkIcon } from './icons/LinkIcon';

interface SourceLinkProps {
  source: {
    uri: string;
    title: string;
  };
}

export const SourceLink: React.FC<SourceLinkProps> = ({ source }) => {
  if (!source || !source.uri) return null;

  return (
    <a
      href={source.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors duration-200 group"
    >
      <div className="flex-shrink-0 pt-1">
        <LinkIcon className="w-5 h-5 text-slate-500 group-hover:text-sky-400 transition-colors duration-200" />
      </div>
      <div>
        <p className="font-semibold text-sky-500 group-hover:underline text-sm leading-snug">
          {source.title || 'Untitled Source'}
        </p>
        <p className="text-slate-500 text-xs truncate">{source.uri}</p>
      </div>
    </a>
  );
};