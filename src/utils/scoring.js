import { DIMENSIONS, QUESTIONS } from '../data/questions';

export function calculateScores(answers) {
  // answers is an object like { 1: 5, 2: 4, 3: 3, ... 25: 5 }
  const dimensionScores = {
    extraversion: 0,
    agreeableness: 0,
    adjustment: 0,
    conscientiousness: 0,
    openness: 0
  };

  let totalScore = 0;

  QUESTIONS.forEach(q => {
    const val = Number(answers[q.id]) || 0;
    dimensionScores[q.trait] += val;
    totalScore += val;
  });

  const breakdown = {};

  Object.keys(DIMENSIONS).forEach(traitKey => {
    const score = dimensionScores[traitKey];
    const info = DIMENSIONS[traitKey];
    let level = 'Moderate';
    let profileText = info.modProfile;

    if (score >= 19) {
      level = 'High';
      profileText = info.highProfile;
    } else if (score <= 11) {
      level = 'Low';
      profileText = info.lowProfile;
    }

    // percentage score out of max 25
    const percentage = Math.round((score / 25) * 100);

    breakdown[traitKey] = {
      ...info,
      score,
      maxScore: 25,
      percentage,
      level,
      profileText
    };
  });

  // Calculate Overall Dominant Trait
  let highestTrait = Object.keys(dimensionScores).reduce((a, b) =>
    dimensionScores[a] > dimensionScores[b] ? a : b
  );

  return {
    totalScore,
    maxTotalScore: 125,
    percentage: Math.round((totalScore / 125) * 100),
    dimensionScores,
    breakdown,
    dominantTrait: DIMENSIONS[highestTrait].name
  };
}

export function formatTimestamp(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
