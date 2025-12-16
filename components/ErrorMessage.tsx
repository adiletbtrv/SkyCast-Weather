import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-500/80 backdrop-blur-md border border-red-400 text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg animate-fade-in max-w-md w-full mx-auto">
      <AlertCircle className="w-6 h-6 flex-shrink-0" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
