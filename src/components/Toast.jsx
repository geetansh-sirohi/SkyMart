import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToastMessage, clearToast } from '../store/cartSlice';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast() {
  const dispatch = useDispatch();
  const toastMessage = useSelector(selectToastMessage);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 border border-indigo-500/40 text-white shadow-2xl backdrop-blur-xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span className="text-sm font-medium text-slate-100">{toastMessage}</span>
        <button
          onClick={() => dispatch(clearToast())}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
