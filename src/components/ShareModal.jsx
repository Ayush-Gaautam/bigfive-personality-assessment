import React, { useState } from 'react';
import { Copy, Check, Share2, QrCode, X, Globe, Wifi } from 'lucide-react';

export default function ShareModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.origin;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-panel p-6 md:p-8 max-w-lg w-full bg-slate-900 border-indigo-500/40 relative shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Public Share Survey Link</h3>
              <p className="text-xs text-slate-400">Share with anyone worldwide to collect responses</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Link Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Public Assessment Link</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-sm font-mono focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 shrink-0 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* QR Code Graphic Box */}
        <div className="bg-slate-950/70 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="w-40 h-40 bg-white p-3 rounded-xl shadow-lg flex items-center justify-center mb-3">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`}
              alt="Survey QR Code"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <QrCode className="w-3.5 h-3.5 text-indigo-400" />
            Scan QR Code with mobile phone camera to fill assessment
          </span>
        </div>

        {/* Info Box */}
        <div className="text-xs text-slate-400 leading-relaxed bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-500/20">
          💡 <strong>Public Access Active:</strong> Share this link with your students, colleagues, or professor. All responses submit directly into your <strong>Professor Dashboard</strong> in real time.
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
