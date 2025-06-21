import React from 'react';

const LoadingAnimation = ({ 
  message = "Loading...", 
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-slate-50 flex items-center justify-center ${className}`}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        .fade-pulse {
          animation: fade 1.5s ease-in-out infinite;
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
      `}</style>

      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Simple spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-100 rounded-full"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full spinner"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-blue-600 font-medium">
          {message}
        </div>
        
        {/* Simple dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full fade-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full fade-pulse delay-1"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full fade-pulse delay-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;