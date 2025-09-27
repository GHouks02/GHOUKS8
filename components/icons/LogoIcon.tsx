import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        width="64" 
        height="64" 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
        {...props}
    >
        <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38BDF8" /> 
                <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
        </defs>
        <path d="M54.5 19.75L32 6.5L9.5 19.75L32 33L54.5 19.75Z" stroke="url(#logo-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 44.25L32 57.5L54.5 44.25" stroke="url(#logo-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 32L32 45.25L54.5 32" stroke="url(#logo-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);