import React from 'react';
import BarChart from './BarChart';
import { DIMENSIONS } from '../data/questions';
import { BarChart3, Users, TrendingUp, Sparkles, PieChart, Building2, Briefcase } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ClassAnalytics({ stats, submissions }) {
  const { total, averages, ageDistribution, genderDistribution } = stats;

  const sampleDimensionScores = {
    extraversion: Number(averages?.extraversion) || 0,
    agreeableness: Number(averages?.agreeableness) || 0,
    adjustment: Number(averages?.adjustment) || 0,
    conscientiousness: Number(averages?.conscientiousness) || 0,
    openness: Number(averages?.openness) || 0
  };

  // Prepare Age Chart Data
  const ageLabels = Object.keys(ageDistribution || {});
  const ageValues = Object.values(ageDistribution || {});
  const ageData = {
    labels: ageLabels.length > 0 ? ageLabels : ['Under 18', '18-25', '26-35', '36+'],
    datasets: [{
      data: ageValues.length > 0 ? ageValues : [0, 0, 0, 0],
      backgroundColor: ['#60A5FA', '#34D399', '#FBBF24', '#F472B6'],
      borderWidth: 1,
      borderColor: '#0f172a'
    }]
  };

  // Prepare Gender Chart Data
  const genderLabels = Object.keys(genderDistribution || {});
  const genderValues = Object.values(genderDistribution || {});
  const genderData = {
    labels: genderLabels.length > 0 ? genderLabels : ['Male', 'Female', 'Other'],
    datasets: [{
      data: genderValues.length > 0 ? genderValues : [0, 0, 0],
      backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6'],
      borderWidth: 1,
      borderColor: '#0f172a'
    }]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#f8fafc', font: { size: 12, weight: '500' } }
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 bg-gradient-to-r from-pink-950/80 via-slate-900 to-indigo-950/80 border-pink-500/30">
        <div className="flex items-center gap-2 text-pink-400 font-semibold text-xs uppercase tracking-wider mb-2">
          <BarChart3 className="w-4 h-4" />
          <span>Demographic & Personality Analytics</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">Cohort Demographic & Trait Analytics</h2>
        <p className="text-slate-300 text-sm mt-1">
          Comprehensive parameter breakdown across all {total} respondents.
        </p>
      </div>

      {/* Aggregate Mean Big Five Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4">
        {Object.keys(DIMENSIONS).map((key) => {
          const trait = DIMENSIONS[key];
          const avgVal = averages?.[key] || 0;
          return (
            <div key={key} className="glass-panel p-4 text-center border-slate-800">
              <span
                className="w-3 h-3 rounded-full inline-block mb-2"
                style={{ backgroundColor: trait.color }}
              />
              <span className="text-xs font-bold text-slate-400 block uppercase">{trait.shortName}</span>
              <div className="text-2xl font-extrabold text-white mt-1">
                {avgVal} <span className="text-xs text-slate-500 font-normal">/ 25</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Demographic Chart Representations (Age & Gender) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Group Distribution Chart */}
        <div className="glass-panel p-6 border-blue-500/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-400" />
            <span>Age Distribution Chart</span>
          </h3>
          <div className="h-64 flex items-center justify-center">
            {total === 0 ? (
              <span className="text-xs text-slate-500">No demographic data collected yet</span>
            ) : (
              <Doughnut data={ageData} options={doughnutOptions} />
            )}
          </div>
        </div>

        {/* Gender Breakdown Chart */}
        <div className="glass-panel p-6 border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            <span>Gender Breakdown Chart</span>
          </h3>
          <div className="h-64 flex items-center justify-center">
            {total === 0 ? (
              <span className="text-xs text-slate-500">No demographic data collected yet</span>
            ) : (
              <Doughnut data={genderData} options={doughnutOptions} />
            )}
          </div>
        </div>
      </div>

      {/* Main Big Five Parameter Comparison Bar Chart */}
      <div className="glass-panel p-6 border-pink-500/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-400" />
              <span>Big Five Mean Score Comparison</span>
            </h3>
            <p className="text-xs text-slate-400">Average dimension score (out of 25) across all participants.</p>
          </div>
        </div>

        {total === 0 ? (
          <div className="py-16 text-center text-slate-400">
            No class data available yet. Complete an assessment to populate charts!
          </div>
        ) : (
          <BarChart dimensionScores={sampleDimensionScores} />
        )}
      </div>

    </div>
  );
}
