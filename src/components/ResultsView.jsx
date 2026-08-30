import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import RadarChart from './RadarChart';
import BarChart from './BarChart';
import { DIMENSIONS } from '../data/questions';
import { Award, RotateCcw, Printer, Share2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function ResultsView({ resultData, onRetake, onViewDashboard, onShare }) {
  const { name, email, studentId, scores, submittedAt } = resultData;
  const { totalScore, maxTotalScore, percentage, breakdown, dominantTrait } = scores;

  useEffect(() => {
    // Trigger celebratory confetti effect on results load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti failed to trigger:', e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border-indigo-500/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Assessment Completed & Response Saved</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              {name}'s Big Five Profile
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              {email ? `${email} • ` : ''}{studentId ? `ID: ${studentId} • ` : ''}Submitted on {new Date(submittedAt || Date.now()).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-sm font-semibold transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Report</span>
            </button>
            <button
              onClick={onRetake}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-600/30"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Score Card */}
        <div className="glass-panel p-6 border-indigo-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Assessment Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{totalScore}</span>
              <span className="text-sm font-medium text-slate-400">/ {maxTotalScore} ({percentage}%)</span>
            </div>
          </div>
        </div>

        {/* Dominant Trait Card */}
        <div className="glass-panel p-6 border-purple-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Dominant Trait</span>
            <span className="text-xl font-bold text-gradient">{dominantTrait}</span>
          </div>
        </div>

        {/* Status Card */}
        <div className="glass-panel p-6 border-emerald-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Professor Sync</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-4 h-4" />
              Synced to Dashboard
            </span>
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Spider Plot */}
        <div className="glass-panel p-6 border-indigo-500/20">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
            <span>Personality Web (Radar Plot)</span>
            <span className="text-xs text-slate-400 font-normal">Range: 5 - 25</span>
          </h3>
          <RadarChart dimensionScores={scores.dimensionScores} />
        </div>

        {/* Bar Chart Breakdown */}
        <div className="glass-panel p-6 border-indigo-500/20">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
            <span>Dimension Score Comparison</span>
            <span className="text-xs text-slate-400 font-normal">Range: 5 - 25</span>
          </h3>
          <BarChart dimensionScores={scores.dimensionScores} />
        </div>
      </div>

      {/* Detailed Trait Breakdown Cards */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Detailed Parameter Breakdown & Insights</span>
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {Object.keys(breakdown).map((traitKey) => {
            const trait = breakdown[traitKey];
            return (
              <div
                key={traitKey}
                className="glass-panel p-6 transition-all border hover:border-indigo-500/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-md"
                      style={{ backgroundColor: trait.color }}
                    >
                      {trait.shortName[0]}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{trait.name}</h4>
                      <p className="text-xs text-slate-400">{trait.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        trait.level === 'High'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : trait.level === 'Low'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {trait.level} Level
                    </span>

                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-white">{trait.score}</span>
                      <span className="text-xs text-slate-400 font-medium"> / 25</span>
                    </div>
                  </div>
                </div>

                {/* Dimension Progress Bar */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-4 border border-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${trait.percentage}%`,
                      backgroundColor: trait.color
                    }}
                  />
                </div>

                {/* Behavioral Profile Interpretation */}
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-sm text-slate-200 leading-relaxed">
                  <strong className="text-slate-100 font-semibold block mb-1">
                    Behavioral Profile & Insights:
                  </strong>
                  {trait.profileText}
                </div>

                {/* Contributed Items list */}
                <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
                  <span>Questions evaluated: #{trait.items.join(', #')}</span>
                  <span>Calculated: Sum of 5 items</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="glass-panel p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onViewDashboard}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Switch to Professor View</span>
        </button>

        <button
          onClick={onShare}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Survey with Others</span>
        </button>
      </div>

    </div>
  );
}
