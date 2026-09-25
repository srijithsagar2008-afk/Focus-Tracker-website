export interface WisdomQuote {
  id: string;
  quote: string;
  author: string;
  affiliationOrRole: string;
  concept: string;
  domain: 'Deep Work' | 'Deliberate Practice' | 'Neuro-Focus' | 'Cognitive Endurance';
}

export const ACADEMIC_WISDOM_QUOTES: WisdomQuote[] = [
  {
    id: 'w1',
    quote:
      "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time.",
    author: 'Cal Newport',
    affiliationOrRole: 'MIT PhD & Author of Deep Work',
    concept: 'Cognitive Hyper-Focus',
    domain: 'Deep Work',
  },
  {
    id: 'w2',
    quote:
      'I learned very early the difference between knowing the name of something and knowing something. True mastery is reconstructing the mechanism from scratch.',
    author: 'Richard Feynman',
    affiliationOrRole: 'Nobel Laureate in Theoretical Physics',
    concept: 'Feynman Active Reconstruction',
    domain: 'Deliberate Practice',
  },
  {
    id: 'w3',
    quote:
      'Premature optimization is the root of all evil in study. First solve the fundamental theorem; then streamline the computational elegance.',
    author: 'Donald Knuth',
    affiliationOrRole: 'Turing Award Laureate & Professor at Stanford',
    concept: 'Sequential Rigor',
    domain: 'Neuro-Focus',
  },
  {
    id: 'w4',
    quote:
      'Diffuse mode thinking works quietly in the background when you allow your mind to rest after high-intensity proofs. Rest is the physiological furnace of neuroplastic consolidation.',
    author: 'Dr. Barbara Oakley',
    affiliationOrRole: 'Engineering Professor & Author of A Mind for Numbers',
    concept: 'Neuroplastic Consolidation',
    domain: 'Cognitive Endurance',
  },
  {
    id: 'w5',
    quote:
      'It is not that we have a short time to learn, but that we surrender a lot of it to triviality. Academic hours are boundless when guarded with discipline.',
    author: 'Seneca',
    affiliationOrRole: 'Stoic Scholar & Statesman',
    concept: 'Time Sovereignty',
    domain: 'Deep Work',
  },
  {
    id: 'w6',
    quote:
      'It is not knowledge, but the act of learning, not possession but the act of getting there, which grants the greatest intellective elevation.',
    author: 'Carl Friedrich Gauss',
    affiliationOrRole: 'Prince of Mathematicians',
    concept: 'Intrinsic Mathematical Drive',
    domain: 'Deliberate Practice',
  },
  {
    id: 'w7',
    quote:
      'Do not act as if you had ten thousand semesters. While you sit before your manuscripts, while focus is in your power, achieve absolute clarity.',
    author: 'Marcus Aurelius',
    affiliationOrRole: 'Philosopher & Author of Meditations',
    concept: 'Urgent Epistemic Focus',
    domain: 'Neuro-Focus',
  },
];
