import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DIMENSIONS } from '../data/questions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ dimensionScores, isComparison = false, averageScores = null }) {
  const labels = Object.keys(DIMENSIONS).map(k => DIMENSIONS[k].shortName);
  const userScores = Object.keys(DIMENSIONS).map(k => dimensionScores[k] || 0);

  const colors = [
    '#3B82F6', // Extraversion - Blue
    '#10B981', // Agreeableness - Emerald
    '#8B5CF6', // Adjustment - Purple
    '#F59E0B', // Conscientiousness - Amber
    '#EC4899'  // Openness - Pink
  ];

  const datasets = [
    {
      label: isComparison ? 'Student Score' : 'Trait Score (5 - 25)',
      data: userScores,
      backgroundColor: colors,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)'
    }
  ];

  if (isComparison && averageScores) {
    const avgValues = Object.keys(DIMENSIONS).map(k => Number(averageScores[k]) || 0);
    datasets.push({
      label: 'Class Average',
      data: avgValues,
      backgroundColor: 'rgba(148, 163, 184, 0.4)',
      borderColor: '#94a3b8',
      borderRadius: 8,
      borderWidth: 1
    });
  }

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: isComparison,
        labels: {
          color: '#f8fafc',
          font: { size: 12, weight: '500' }
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw} / 25`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#f8fafc', font: { size: 11, weight: '600' } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#94a3b8', stepSize: 5 },
        min: 0,
        max: 25
      }
    }
  };

  return (
    <div className="w-full h-[320px] md:h-[380px] p-2">
      <Bar data={data} options={options} />
    </div>
  );
}
