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
    title: 'First Game To Present to Mr Solon Chen',
    description:
      'Langit Lupa is a 3D Multiplayer game where you and your friends try to catch each other just like in the old days',
    date: '2025',
    images: [
      '/solo chen 1.jpg',
      '/solo chen 2.jpg',
      '/solo chen 3.jpg',
      '/solo chen 4.jpg'
    ],
    badge: 'Milestone',
  },
  {
    id: 'ach-2',
    title: 'Coming Soon',
    description:
      'Coming Soon.',
    date: 'N/A',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
      '/images/achievements/placeholder4.png',
    ],
    badge: 'Milestone',
  },
  {
    id: 'ach-3',
    title: 'Coming Soon',
    description:
      'Coming Soon.',
    date: 'N/A',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
    ],
    badge: 'Milestone',
  },
  {
    id: 'ach-4',
    title: 'Coming Soon',
    description:
      'Coming Soon',
    date: 'N/A',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
      '/images/achievements/placeholder4.png',
    ],
    badge: 'Milestone',
  },
  {
    id: 'ach-5',
    title: 'Coming Soon',
    description:
      'Coming Soon',
    date: 'N/A',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
    ],
    badge: 'Milestone',
  },
  {
    id: 'ach-6',
    title: 'Coming Soon',
    description:
      'Coming Soon',
    date: 'N/A',
    images: [
      '/images/achievements/placeholder1.png',
      '/images/achievements/placeholder2.png',
      '/images/achievements/placeholder3.png',
      '/images/achievements/placeholder4.png',
    ],
    badge: 'Milestone',
  },
];
