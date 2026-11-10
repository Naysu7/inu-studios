export type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  images: string[];
  badge?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Game Released',
    description:
      'Shipped Endless Awakening — a 2D survival roguelike — marking the transition from student projects to published indie titles.',
    date: '2023',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
      '/images/achievements/placeholder4.png',
    ],
    badge: 'Milestone',
  },
  {
    id: 'ach-2',
    title: 'Multiplayer Netcode',
    description:
      'Implemented Unity Netcode for Langit, Lupa, Impiyerno — a 3-player Filipino mythology brawler spanning heaven, earth, and hell.',
    date: '2024',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
      '/images/achievements/placeholder4.png',
    ],
    badge: 'Technical',
  },
  {
    id: 'ach-3',
    title: 'QA Database Lead',
    description:
      'Built and maintained a structured bug-tracking database for EthrA (2D MMORPG), covering repro reports, severity triage, and regression passes.',
    date: '2024',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
    ],
    badge: 'QA',
  },
  {
    id: 'ach-4',
    title: 'Mobile Launch',
    description:
      'Brought The Tower to mobile platforms — adapting controls, UI, and performance for touch-screen gameplay.',
    date: '2024',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
      '/images/achievements/placeholder4.png',
    ],
    badge: 'Release',
  },
  {
    id: 'ach-5',
    title: 'BSEMC Specialized',
    description:
      'Completed the Entertainment and Multimedia Computing program specializing in Game Development at BISCAST.',
    date: '2024',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
    ],
    badge: 'Education',
  },
  {
    id: 'ach-6',
    title: '6 Titles Shipped',
    description:
      'Reached six published games on itch.io spanning roguelikes, brawlers, tower defense, and puzzle genres.',
    date: '2025',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
      '/images/achievements/placeholder4.png',
    ],
    badge: 'Milestone',
  },
];
