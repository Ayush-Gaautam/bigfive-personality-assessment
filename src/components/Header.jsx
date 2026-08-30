import React from 'react';
import { UserCheck, ShieldCheck, BarChart3, Share2, ClipboardList, Award } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenShare, submissionCount }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('assessment')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient tracking-tight">Big Five Personality Assessment</h1>
            <p className="text-xs text-slate-400">25-Item Standardized Behavioral Profile</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/50 text-sm font-medium">
          <button
            onClick={() => setActiveTab('assessment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'assessment'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Take Test</span>
          </button>

          <button
            onClick={() => setActiveTab('professor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'professor' || activeTab === 'analytics'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Professor Dashboard</span>
            {submissionCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-purple-900/80 text-purple-200 rounded-full font-bold">
                {submissionCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'analytics'
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Class Analytics</span>
          </button>
        </nav>

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all border border-indigo-400/30"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Survey Link</span>
        </button>

      </div>
    </header>
  );
}
