import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ToastContext } from '../hooks/useToast';
import { AlertIcon, CheckCircleIcon, XIcon } from './icons';

let toastCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((message, type = 'info', title) => {
    const id = ++toastCounter;
    setToasts((prev) => [...prev.slice(-2), { id, message, type, title }]);
    return id;
  }, []);

  const success = useCallback((message, title = 'Success') => show(message, 'success', title), [show]);
  const error = useCallback((message, title = 'Error') => show(message, 'error', title), [show]);
  const info = useCallback((message, title = 'Notice') => show(message, 'info', title), [show]);

  return (
    <ToastContext.Provider value={{ toasts, show, success, error, info, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

function Toast({ toast, onDismiss }) {
  const { id, type, message, title } = toast;
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(id), 4000);
    return () => clearTimeout(timerRef.current);
  }, [id, onDismiss]);

  const borderColor =
    type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-primary';

  return (
    <div
      className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border-l-4 ${borderColor} p-4 animate-slide-in-right`}
      role="status"
    >
      <div className="flex items-start gap-3">
        {type === 'success' && <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0" />}
        {type === 'error' && <AlertIcon className="w-5 h-5 text-red-500 shrink-0" />}
        {type === 'info' && <CheckCircleIcon className="w-5 h-5 text-primary shrink-0" />}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <button
          onClick={() => onDismiss(id)}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Dismiss notification"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ToastContainer() {
  const context = useContext(ToastContext);
  const { toasts, dismiss } = context || { toasts: [], dismiss: () => {} };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  );
}

export default ToastContainer;