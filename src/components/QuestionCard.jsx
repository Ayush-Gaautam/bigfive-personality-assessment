import React from 'react';
import { RATING_SCALE, DIMENSIONS } from '../data/questions';
import { CheckCircle2 } from 'lucide-react';

export default function QuestionCard({ question, selectedValue, onSelect }) {
  const traitInfo = DIMENSIONS[question.trait];

  return (
    <div
      className={`glass-panel p-6 transition-all duration-200 border ${
        selectedValue
          ? 'border-indigo-500/50 bg-slate-800/80 shadow-lg shadow-indigo-950/40'
          : 'border-slate-700/40 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-sm flex items-center justify-center border border-indigo-500/30">
            #{question.id}
          </span>
          <span
            className="px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase border"
            style={{
              borderColor: `${traitInfo.color}40`,
              backgroundColor: `${traitInfo.color}15`,
              color: traitInfo.color
            }}
          >
            {traitInfo.shortName}
          </span>
        </div>

        {selectedValue && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full animate-fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Selected ({selectedValue})
          </span>
        )}
      </div>

      {/* Question Text */}
      <h3 className="text-base md:text-lg font-medium text-slate-100 mb-6 leading-relaxed">
        {question.text}
      </h3>

      {/* 5 Rating Scale Buttons (1-5) */}
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {RATING_SCALE.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(question.id, opt.value)}
              className={`rating-btn ${isSelected ? `active-${opt.value}` : ''}`}
            >
              <span className="text-base md:text-lg font-bold mb-1">{opt.value}</span>
              <span className="text-[10px] md:text-xs text-center font-medium leading-tight opacity-90 hidden sm:block">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Rating Label indicator */}
      <div className="flex justify-between text-[11px] text-slate-400 mt-2 px-1 sm:hidden">
        <span>1: Not Like Me</span>
        <span>3: Neutral</span>
        <span>5: Like Me</span>
      </div>
    </div>
  );
}
