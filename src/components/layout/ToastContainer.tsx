import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useData();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-notification-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-200 ${
              isSuccess
                ? 'bg-slate-900/95 border-emerald-500/40 text-slate-100'
                : isError
                ? 'bg-slate-900/95 border-red-500/40 text-slate-100'
                : 'bg-slate-900/95 border-cyan-500/40 text-slate-100'
            }`}
          >
            <div className="mr-3 shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isError && <AlertCircle className="w-4 h-4 text-red-400" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-cyan-400" />}
            </div>

            <div className="flex-1 text-xs leading-relaxed">{toast.message}</div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="ml-2 text-slate-400 hover:text-white shrink-0 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
