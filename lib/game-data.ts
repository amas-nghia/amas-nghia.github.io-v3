export interface Equipment {
  id: string
  name: string
  type: "weapon" | "armor"
  stats: {
    attack?: number
    defense?: number
    health?: number
  }
  price: number
  description: string
}

export interface Enemy {
  id: string
  name: string
  type: "zombie" | "skeleton" | "creeper"
  stats: {
    health: number
    attack: number
    defense: number
  }
  rewards: {
    coins: number
    experience: number
  }
}

export interface ChestReward {
  id: string
  coins: number
  experience: number
  description: string
}

export const EQUIPMENT: Equipment[] = [
  {
    id: "wooden_sword",
    name: "Wooden Sword",
    type: "weapon",
    stats: { attack: 10 },
    price: 50,
    description: "A basic wooden sword for beginners",
  },
  {
    id: "iron_sword",
    name: "Iron Sword",
    type: "weapon",
    stats: { attack: 25 },
    price: 150,
    description: "A sturdy iron sword with good damage",
  },
  {
    id: "diamond_sword",
    name: "Diamond Sword",
    type: "weapon",
    stats: { attack: 40 },
    price: 300,
    description: "The ultimate weapon for serious battles",
  },
  {
    id: "leather_armor",
    name: "Leather Armor",
    type: "armor",
    stats: { defense: 5, health: 20 },
    price: 75,
    description: "Basic protection from leather",
  },
  {
    id: "iron_armor",
    name: "Iron Armor",
    type: "armor",
    stats: { defense: 15, health: 50 },
    price: 200,
    description: "Strong iron protection",
  },
  {
    id: "diamond_armor",
    name: "Diamond Armor",
    type: "armor",
    stats: { defense: 25, health: 100 },
    price: 400,
    description: "Ultimate protection for warriors",
  },
]

export const ENEMIES: Enemy[] = [
  {
    id: "zombie",
    name: "Zombie",
    type: "zombie",
    stats: { health: 80, attack: 15, defense: 5 },
    rewards: { coins: 30, experience: 25 },
  },
  {
    id: "skeleton",
    name: "Skeleton",
    type: "skeleton",
    stats: { health: 60, attack: 20, defense: 3 },
    rewards: { coins: 40, experience: 30 },
  },
  {
    id: "creeper",
    name: "Creeper",
    type: "creeper",
    stats: { health: 100, attack: 30, defense: 2 },
    rewards: { coins: 60, experience: 50 },
  },
]

export const CHEST_REWARDS: ChestReward[] = [
  {
    id: "about_chest",
    coins: 50,
    experience: 25,
    description: "Reward for learning about the developer",
  },
  {
    id: "experience_chest",
    coins: 75,
    experience: 40,
    description: "Reward for exploring work experience",
  },
  {
    id: "projects_chest",
    coins: 100,
    experience: 60,
    description: "Reward for checking out projects",
  },
  {
    id: "skills_chest",
    coins: 75,
    experience: 35,
    description: "Reward for reviewing skills",
  },
]

export const PORTFOLIO_DATA = {
  experiences: [
    {
      company: "Capy Labs",
      position: "Developer",
      period: "Aug 2024 - Present",
      description:
        "Developing NFT games for Android and Web using Unity Engine and Phaser Framework. Building partner websites using TypeScript, React, and NextJS.",
      technologies: ["Unity", "Phaser", "TypeScript", "React", "NextJS"],
    },
    {
      company: "EGD Group",
      position: "Unity Game Developer - Junior/Middle",
      period: "Jul 2023 - Jul 2024",
      description:
        "Developed mobile games from concept to release, including programming, ideation, graphic design, and client communication to create engaging and profitable games.",
      technologies: ["Unity", "Mobile Development", "Game Design"],
    },
    {
      company: "Dinosys Corporation",
      position: "Unity Game Developer - Junior",
      period: "Jul 2022 - Jul 2023",
      description:
        "Built NFT game 'Hellven' using Unity Engine. Developed multiplayer shooter 'Gunslinger' and 'Metabank' project for VPBank and Vietcombank.",
      technologies: ["Unity", "NFT Games", "Multiplayer", "Banking Solutions"],
    },
    {
      company: "The Minders Studio",
      position: "Unity Game Developer - Fresher",
      period: "Jan 2022 - Jun 2022",
      description:
        "Learned project management through Jira, Git workflows, Photon library, RPC models, and API integration. Optimized game UI management and performance.",
      technologies: ["Unity", "Photon", "Git", "Jira", "API Integration"],
    },
    {
      company: "Leanminds Studio",
      position: "Unity Game Developer - Intern",
      period: "Oct 2020 - Dec 2021",
      description:
        "Developed mobile games including programming, graphic design, and game experience design in a small team environment.",
      technologies: ["Unity", "Mobile Games", "Game Design", "Graphics"],
    },
  ],
  projects: [
    {
      title: "Basoho Real Estate Platform",
      period: "Apr 2025 - Present",
      description:
        "Real estate platform supporting property businesses with VIP listings, top placement, location-based search, and advertising features.",
      technologies: ["React", "TypeScript", "SEO", "Responsive Design"],
      link: "https://www.basoho.com.vn/",
      status: "Live",
    },
    {
      title: "VR Tour Projects",
      period: "Apr 2025 - Present",
      description:
        "Interactive VR tours providing authentic experiences for businesses and products without physical visits.",
      technologies: ["WebGL", "VR", "3D Graphics"],
      link: "https://vrtour.wepac.vn/",
      status: "Live",
    },
    {
      title: "Tapout: Unlock Anime",
      period: "2024",
      description: "Android mobile game with optimized performance and integrated advertising systems.",
      technologies: ["Unity", "Android", "AdMob", "Firebase"],
      link: "#",
      status: "Released",
    },
    {
      title: "Rope Tangle - Master Twisted 3D",
      period: "2024",
      description: "3D puzzle game featuring rope physics and optimized mobile performance.",
      technologies: ["Unity", "Obi-rope", "AdMob", "Firebase"],
      link: "#",
      status: "Released",
    },
    {
      title: "Hellven NFT Game",
      period: "Jul 2022 - Jul 2023",
      description: "WebGL NFT game developed for funding and full product deployment.",
      technologies: ["Unity", "WebGL", "Nakama", "Spine"],
      link: "#",
      status: "Released",
    },
    {
      title: "Planet Sandbox",
      period: "2022",
      description: "Multiplayer sandbox game with multilingual support and collaborative UI development.",
      technologies: ["Unity", "Photon Fusion", "Multiplayer"],
      link: "#",
      status: "Released",
    },
  ],
  skills: [
    {
      category: "Game Development",
      items: [
        "Unity Engine",
        "C# Programming",
        "Phaser Framework",
        "2D/3D Games",
        "Mobile Optimization",
        "Multiplayer (Netcode/Nakama)",
        "Game Physics",
        "Animation Systems",
      ],
    },
    {
      category: "Frontend Development",
      items: [
        "React",
        "TypeScript",
        "Next.js",
        "TailwindCSS",
        "Shadcn",
        "SSR/SSG",
        "SEO Optimization",
        "Responsive Design",
      ],
    },
    {
      category: "Tools & Technologies",
      items: [
        "Unity UI Toolkit",
        "Git/GitHub",
        "Jira/Trello",
        "Firebase",
        "AdMob",
        "Photon",
        "WebGL",
        "Android Development",
      ],
    },
    {
      category: "Soft Skills",
      items: [
        "Problem Solving",
        "Team Collaboration",
        "Agile/Scrum",
        "Project Management",
        "Time Management",
        "Client Communication",
      ],
    },
  ],
}
