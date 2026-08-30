import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { DIMENSIONS } from '../data/questions';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({ dimensionScores }) {
  const labels = Object.keys(DIMENSIONS).map(k => DIMENSIONS[k].shortName);
  const dataValues = Object.keys(DIMENSIONS).map(k => dimensionScores[k] || 0);

  const data = {
    labels,
    datasets: [
      {
        label: 'Your Personality Score (5 - 25)',
        data: dataValues,
        backgroundColor: 'rgba(99, 102, 241, 0.35)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(236, 72, 153, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(236, 72, 153, 1)',
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.15)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: '#f8fafc',
          font: {
            size: 12,
            weight: '600'
          }
        },
        ticks: {
          color: '#94a3b8',
          backdropColor: 'transparent',
          stepSize: 5,
          min: 0,
          max: 25
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#f8fafc',
          font: {
            size: 13,
            weight: '500'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => ` Score: ${context.raw} / 25`
        }
      }
    }
  };

  return (
    <div className="w-full h-[320px] md:h-[380px] flex items-center justify-center p-2">
      <Radar data={data} options={options} />
    </div>
  );
}
