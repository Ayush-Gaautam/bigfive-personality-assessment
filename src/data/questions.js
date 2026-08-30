export const DIMENSIONS = {
  extraversion: {
    id: 'extraversion',
    name: 'Surgency / Extraversion',
    shortName: 'Extraversion',
    icon: 'Zap',
    color: '#3B82F6', // Blue
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    description: 'Measures leadership drive, assertiveness, social energy, competitiveness, and enthusiasm for interacting with others.',
    items: [1, 6, 11, 16, 21],
    highProfile: 'Assertive, outgoing, energetic leader who thrives in dynamic social environments and takes initiative.',
    modProfile: 'Balanced social energy; capable of leading when necessary while comfortable working independently.',
    lowProfile: 'Reserved, reflective, and independent; prefers small groups or solitary work over high-stakes social situations.'
  },
  agreeableness: {
    id: 'agreeableness',
    name: 'Agreeableness',
    shortName: 'Agreeableness',
    icon: 'Heart',
    color: '#10B981', // Emerald
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    description: 'Measures empathy, warmth, interest in harmony, teamwork orientation, and concern for others’ well-being.',
    items: [2, 7, 12, 17, 22],
    highProfile: 'Highly empathetic, cooperative, and relationship-focused; builds trust and values group harmony.',
    modProfile: 'Friendly and supportive while maintaining healthy boundaries and standing up for personal views.',
    lowProfile: 'Direct, pragmatic, and task-focused; willing to challenge others even if it creates friction.'
  },
  adjustment: {
    id: 'adjustment',
    name: 'Adjustment / Emotional Stability',
    shortName: 'Emotional Stability',
    icon: 'Shield',
    color: '#8B5CF6', // Purple
    bgGradient: 'from-purple-500/20 to-indigo-500/20',
    description: 'Measures stress tolerance, emotional control, optimism, composure, and psychological resilience under pressure.',
    items: [3, 8, 13, 18, 23],
    highProfile: 'Calm, resilient, and optimistic; maintains composure under high pressure and rarely gets flustered.',
    modProfile: 'Generally stable and composed, experiencing occasional stress in intense or prolonged conflict.',
    lowProfile: 'Sensitive to environmental stressors; feels emotions intensely and may require deliberate stress management.'
  },
  conscientiousness: {
    id: 'conscientiousness',
    name: 'Conscientiousness',
    shortName: 'Conscientiousness',
    icon: 'Target',
    color: '#F59E0B', // Amber
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    description: 'Measures dependability, organization, achievement orientation, discipline, and adherence to commitments.',
    items: [4, 9, 14, 19, 24],
    highProfile: 'Meticulous, reliable, organized, and goal-driven; highly accountable and systematic in execution.',
    modProfile: 'Organized and goal-directed while remaining flexible to spontaneous changes or unstructured tasks.',
    lowProfile: 'Spontaneous and adaptable; prefers flexible environments over strict routine or detailed micro-planning.'
  },
  openness: {
    id: 'openness',
    name: 'Openness to Experience',
    shortName: 'Openness',
    icon: 'Compass',
    color: '#EC4899', // Pink
    bgGradient: 'from-pink-500/20 to-rose-500/20',
    description: 'Measures curiosity, openness to innovation, adaptability to change, willingness to experiment, and creative thinking.',
    items: [5, 10, 15, 20, 25],
    highProfile: 'Imaginative, innovative, and eager for novel experiences; champions change and creative problem-solving.',
    modProfile: 'Open to new ideas while maintaining appreciation for proven traditional methods.',
    lowProfile: 'Pragmatic and traditional; relies on established processes and prefers familiar routines.'
  }
};

export const QUESTIONS = [
  {
    id: 1,
    text: "I step forward and take charge in leaderless situations.",
    trait: "extraversion"
  },
  {
    id: 2,
    text: "I am concerned about getting along well with others.",
    trait: "agreeableness"
  },
  {
    id: 3,
    text: "I have good self-control; I don't get emotional and get angry and yell.",
    trait: "adjustment"
  },
  {
    id: 4,
    text: "I'm dependable; when I say I will do something, it's done well and on time.",
    trait: "conscientiousness"
  },
  {
    id: 5,
    text: "I try to do things differently to improve my performance.",
    trait: "openness"
  },
  {
    id: 6,
    text: "I enjoy competing and winning; losing bothers me.",
    trait: "extraversion"
  },
  {
    id: 7,
    text: "I enjoy having lots of friends and going to parties.",
    trait: "agreeableness"
  },
  {
    id: 8,
    text: "I perform well under pressure.",
    trait: "adjustment"
  },
  {
    id: 9,
    text: "I work hard to be successful.",
    trait: "conscientiousness"
  },
  {
    id: 10,
    text: "I go to new places and enjoy traveling.",
    trait: "openness"
  },
  {
    id: 11,
    text: "I am outgoing and willing to confront people when in conflict.",
    trait: "extraversion"
  },
  {
    id: 12,
    text: "I try to see things from other people's points of view.",
    trait: "agreeableness"
  },
  {
    id: 13,
    text: "I am an optimistic person who sees the positive side of situations (the cup is half full).",
    trait: "adjustment"
  },
  {
    id: 14,
    text: "I am a well-organized person.",
    trait: "conscientiousness"
  },
  {
    id: 15,
    text: "When I go to a new restaurant, I order foods I haven't tried.",
    trait: "openness"
  },
  {
    id: 16,
    text: "I want to climb the corporate ladder to as high a level of management as I can.",
    trait: "extraversion"
  },
  {
    id: 17,
    text: "I want other people to like me and to be viewed as very friendly.",
    trait: "agreeableness"
  },
  {
    id: 18,
    text: "I give people lots of praise and encouragement; I don't put people down and criticize.",
    trait: "adjustment"
  },
  {
    id: 19,
    text: "I conform by following the rules of an organization.",
    trait: "conscientiousness"
  },
  {
    id: 20,
    text: "I volunteer to be the first to learn or do new tasks at work.",
    trait: "openness"
  },
  {
    id: 21,
    text: "I try to influence other people to get my way.",
    trait: "extraversion"
  },
  {
    id: 22,
    text: "I enjoy working with others more than working alone.",
    trait: "agreeableness"
  },
  {
    id: 23,
    text: "I view myself as being relaxed and secure, rather than nervous and insecure.",
    trait: "adjustment"
  },
  {
    id: 24,
    text: "I am considered credible because I do a good job and come through for people.",
    trait: "conscientiousness"
  },
  {
    id: 25,
    text: "When people suggest doing things differently, I support them and help bring about change; I don't make statements such as, 'It will not work,' 'We never did it before,' 'Who else did it?' or 'We can't do it.'",
    trait: "openness"
  }
];

export const RATING_SCALE = [
  { value: 1, label: 'Not Like Me', shortLabel: '1 - Not Like Me', desc: 'Does not describe me at all' },
  { value: 2, label: 'Somewhat Unlike Me', shortLabel: '2 - Slightly Unlike Me', desc: 'Rarely describes me' },
  { value: 3, label: 'Neutral', shortLabel: '3 - Neutral', desc: 'Sometimes true, sometimes not' },
  { value: 4, label: 'Somewhat Like Me', shortLabel: '4 - Slightly Like Me', desc: 'Frequently describes me' },
  { value: 5, label: 'Like Me', shortLabel: '5 - Like Me', desc: 'Accurately describes me' }
];
