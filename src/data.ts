export const DATA = {
  brand: {
    name: 'Inu Studios',
    tagline: 'Indie Game Developer · 2D/3D Game Designer',
    itchUsername: 'Inu',
    itchProfileUrl: 'https://inuitchio.itch.io/',
   cvUrl: '/Inu-Resume.pdf',
  },

  social: {
    gmail: 'https://mail.google.com/mail/?view=cm&fs=1&to=inustudios@gmail.com',
    email: 'niceecalner05@gmail.com',
    facebook: 'https://www.facebook.com/nice.ecalner/',
    instagram: 'https://www.instagram.com/itsnayss.e?rpxt=eXk0eG92cTRyMTVq',
  },

  hero: {
    title: 'Inu Studios',
    subtitle: 'Crafting worlds, one frame at a time.',
    description:
      'Independent game developer and 2D/3D game designer building playable experiences in Unity & C#. From farming revenge fantasies to Filipino mythology brawlers — this is where pixels get dangerous.',
    profileImgUrl:
      '/Main image in top.jpeg',
    batmanImgUrl:
      '/Batman.jpg',
  },

  origin: {
    heading: 'Origin Story',
    body:
      'Hi my name is Nice but you can call me Inu I am an indie game developer and 2D/3D game designer. I studied in the Entertainment and Multimedia Computing course specializing in Game Development at Bicol State College of Applied Sciences and Technology (BISCAST) Everything started there and now I am ready to continue my journer towards something more, so if you are planning your Game Development journey as well give me a chat and we can both start.',
    workspaceImg:
      '/3rd image sa baba.jpeg',
    devSetupImg:
      '/2nd image sa baba.png',
  },

  stats: {
    gamesReleased: 6,
    yearsCoding: 4,
    bugsSquashed: 1200,
    qaProjects: 2,
    techStack: [
      { name: 'Unity', level: 92, color: 'neon-cyan' },
      { name: 'C#', level: 90, color: 'neon-cyan' },
      { name: 'HTML / CSS / JavaScript', level: 78, color: 'neon-magenta' },
      { name: 'Python', level: 70, color: 'neon-lime' },
      { name: 'Figma', level: 85, color: 'neon-amber' },
      { name: 'Adobe XD', level: 80, color: 'neon-violet' },
    ],
  },

  status: {
    heading: 'Currently Working On',
    project: 'SnapStack',
    task: 'Polishing Game Mechanics, Fixing animations, and adjusting Multiplayer Features',
    progress: 80,
    mood: 'In the zone',
  },

  services: [
    {
      icon: 'Code2',
      title: 'Game Programming',
      desc: 'Unity & C# gameplay systems, mechanics, and performance-tuned builds for desktop and mobile.',
    },
    {
      icon: 'Gamepad2',
      title: 'Game Design & Mechanics',
      desc: 'From paper prototype to feel — designing loops, levels, and economies that keep players hooked.',
    },
    {
      icon: 'Bug',
      title: 'QA Game Testing',
      desc: 'Methodical bug hunting with structured tracking databases, repro reports, and regression passes.',
    },
    {
      icon: 'Globe',
      title: 'Website Development',
      desc: 'Fast, responsive, modern web apps and portfolio sites built with React, Tailwind, and care.',
    },
  ],

  games: [
    {
      title: "ENDLESS AWAKENING",
      tagline: 'Action-farming revenge sim',
      desc: 'Fight through relentless hordes in this 2D survival roguelike. Test your limits, adapt your strategy, and see how long you can stay alive.',
      tags: ['Unity', 'C#', '2D'],
      poster:
        '/Endless Awakening.png',
      video:
        'https://cdn.coverr.co/videos/coverr-farming-field-from-above-2864/1080p.mp4',
      itch: 'https://inuitchio.itch.io/endless-awakening',
      color: 'neon-lime',
    },
    {
      title: 'The Tower Mobile',
      tagline: 'Cyberpunk stealth-puzzle',
      desc: 'A 2D roguelike defense game where you must survive and protect your central tower from relentless enemy waves while it is actively being built.',
      tags: ['Unity', 'C#', '2D'],
      poster:
        '/The Tower.png',
      video:
        'https://cdn.coverr.co/videos/coverr-hacker-typing-on-a-keyboard-1574/1080p.mp4',
      itch: 'https://inuitchio.itch.io/the-tower-mobile',
      color: 'neon-cyan',
    },
    {
      title: 'Langit, Lupa, Impiyerno',
      tagline: 'Filipino mythology brawler',
      desc: 'A multiplayer brawler spanning the Filipino cosmos — heaven, earth, and hell — built with Unity Netcode.',
      tags: ['Unity', 'C#', 'Multiplayer'],
      poster:
        '/Langit lupa.png',
      video:
        'https://cdn.coverr.co/videos/coverr-warrior-with-sword-2933/1080p.mp4',
      itch: 'https://frnzynprncss.itch.io/langit-lupa-impyerno',
      color: 'neon-magenta',
    },
    {
      title: "Snap'Stack",
      tagline: 'Card-stack puzzle',
      desc: 'A snappy card-stacking puzzler. Snap, stack, and combo your way through hand-crafted brain teasers.(On going production)',
      tags: ['Unity', 'C#', '2D'],
      poster:
        'https://images.pexels.com/photos/14623881/pexels-photo-14623881.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      video:
        'https://cdn.coverr.co/videos/coverr-playing-cards-on-a-table-1080p/1080p.mp4',
      itch: 'https://Inu.itch.io',
      color: 'neon-amber',
    },
    {
      title: 'Undead Arena',
      tagline: 'Voice-driven rhythm combat',
      desc: 'Team up with your friends in this multiplayer survival game. Fight together, gun down relentless hordes of zombies, and see how long your squad can survive the arena.',
      tags: ['Unity', 'C#', '2d'],
      poster:
        '/Undead Arena.png',
      video:
        'https://cdn.coverr.co/videos/coverr-game-controller-in-hand-1574/1080p.mp4',
      itch: 'https://frnzynprncss.itch.io/undead-arena',
      color: 'neon-violet',
    },
  ],

  qa: [
    {
      title: 'EthrA',
      role: 'Freelance QA Tester',
      desc: 'Bug tracking and database management for the 2D MMORPG EthrA — structured repro reports, severity triage, and a living bug database that kept the dev team on target.',
      tags: ['2D MMORPG', 'Bug DB', 'Regression'],
    },
    {
      title: 'Slime Merge',
      role: 'Alpha Tester',
      desc: 'Early alpha testing for Slime Merge — playtest feedback, balance notes, and edge-case discovery during the pre-release iteration sprint.',
      tags: ['Alpha', 'Playtest', 'Feedback'],
    },
  ],

  reviews: {
    average: 4.8,
    total: 24,
    sample: [
      { name: 'Maya R.', rating: 5, text: 'The Tower was so fun to play specially the Mobile Version hope it can still be updated.' },
      { name: 'Dev P.', rating: 5, text: 'QA reports from Inu Studios saved our launch. Professional and thorough.' },
      { name: 'Kai L.', rating: 4, text: 'Endless Awakening is great if you are passing time 3 different heroes with different abilies hoping more heroes will come soon.' },
    ],
  },

  audio: {
    // Replace each url with a direct raw .mp3 streaming link (hotlink-friendly host).
    // The <audio> element streams these natively inside the page — no external links.
   tracks: [
    {
      title: 'Super Far',
      artist: 'LANY',
      url: '/lany.mp3',
    },
    {
      title: 'Merry Christmas, Please Don\'t Call',
      artist: 'Bleachers',
      url: '/bleachers.mp3',
    },
   {
      title: 'Libo Libong Buwan',
      artist: 'OPM',
      url: '/kyle-raphael.mp3',
    },
  ],
},

  nav: [
    { label: 'Home', href: '#hero' },
    { label: 'Origin', href: '#origin' },
    { label: 'Stack', href: '#stack' },
    { label: 'Status', href: '#status' },
    { label: 'Services', href: '#services' },
    { label: 'Games', href: '#games' },
    { label: 'QA', href: '#qa' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ],
};

export type Game = (typeof DATA.games)[number];
export type Service = (typeof DATA.services)[number];
