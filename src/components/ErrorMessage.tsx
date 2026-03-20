import React, { memo } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface Props {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage = memo(function ErrorMessage({ message, onDismiss }: Props) {
  return (
    <div
      role="alert"
      className="
        flex items-center gap-3
        bg-red-500/15 backdrop-blur-md
        border border-red-400/30
        text-white px-4 py-3.5 rounded-2xl
        shadow-lg animate-fade-in
        max-w-md w-full mx-auto
      "
    >
      <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
      <span className="text-sm font-medium flex-1 text-white/90">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="text-white/40 hover:text-white/80 transition-colors p-0.5 rounded-lg flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
});

export default ErrorMessage;