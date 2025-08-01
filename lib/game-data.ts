export interface Character {
  id: string
  name: string
  model: string
  animations: {
    idle: string
    walk: string
    run: string
    attack: string
    death: string
  }
  stats: {
    health: number
    mana: number
    attack: number
    defense: number
    speed: number
  }
}

export interface Equipment {
  id: string
  name: string
  type: "weapon" | "armor" | "accessory"
  model: string
  price: number
  stats: {
    attack?: number
    defense?: number
    health?: number
    mana?: number
  }
  description: string
}

export interface Enemy {
  id: string
  name: string
  model: string
  animations: {
    idle: string
    walk: string
    attack: string
    death: string
  }
  stats: {
    health: number
    attack: number
    defense: number
    speed: number
  }
  reward: number
}

export interface ChestReward {
  id: string
  sectionId: string
  coins: number
  items?: Equipment[]
  experience: number
}

// Game Data
export const CHARACTERS: Character[] = [
  {
    id: "steve",
    name: "Steve",
    model: "/models/steve.glb",
    animations: {
      idle: "idle",
      walk: "walk",
      run: "run",
      attack: "attack",
      death: "death",
    },
    stats: {
      health: 100,
      mana: 50,
      attack: 20,
      defense: 10,
      speed: 5,
    },
  },
]

export const EQUIPMENT: Equipment[] = [
  {
    id: "wooden_sword",
    name: "Wooden Sword",
    type: "weapon",
    model: "/models/wooden_sword.glb",
    price: 50,
    stats: { attack: 10 },
    description: "A basic wooden sword for beginners",
  },
  {
    id: "iron_sword",
    name: "Iron Sword",
    type: "weapon",
    model: "/models/iron_sword.glb",
    price: 150,
    stats: { attack: 25 },
    description: "A sturdy iron sword with good damage",
  },
  {
    id: "diamond_sword",
    name: "Diamond Sword",
    type: "weapon",
    model: "/models/diamond_sword.glb",
    price: 500,
    stats: { attack: 50 },
    description: "The ultimate weapon for true warriors",
  },
  {
    id: "leather_armor",
    name: "Leather Armor",
    type: "armor",
    model: "/models/leather_armor.glb",
    price: 100,
    stats: { defense: 15, health: 20 },
    description: "Basic protection from leather",
  },
  {
    id: "iron_armor",
    name: "Iron Armor",
    type: "armor",
    model: "/models/iron_armor.glb",
    price: 300,
    stats: { defense: 35, health: 50 },
    description: "Strong iron protection",
  },
  {
    id: "diamond_armor",
    name: "Diamond Armor",
    type: "armor",
    model: "/models/diamond_armor.glb",
    price: 800,
    stats: { defense: 70, health: 100 },
    description: "Ultimate protection for heroes",
  },
]

export const ENEMIES: Enemy[] = [
  {
    id: "zombie",
    name: "Zombie",
    model: "/models/zombie.glb",
    animations: {
      idle: "idle",
      walk: "walk",
      attack: "attack",
      death: "death",
    },
    stats: {
      health: 80,
      attack: 15,
      defense: 5,
      speed: 2,
    },
    reward: 25,
  },
  {
    id: "skeleton",
    name: "Skeleton",
    model: "/models/skeleton.glb",
    animations: {
      idle: "idle",
      walk: "walk",
      attack: "attack",
      death: "death",
    },
    stats: {
      health: 60,
      attack: 20,
      defense: 3,
      speed: 4,
    },
    reward: 30,
  },
  {
    id: "creeper",
    name: "Creeper",
    model: "/models/creeper.glb",
    animations: {
      idle: "idle",
      walk: "walk",
      attack: "explode",
      death: "death",
    },
    stats: {
      health: 100,
      attack: 40,
      defense: 8,
      speed: 3,
    },
    reward: 50,
  },
]

export const CHEST_REWARDS: ChestReward[] = [
  {
    id: "about_chest",
    sectionId: "about",
    coins: 100,
    experience: 50,
  },
  {
    id: "experience_chest",
    sectionId: "experience",
    coins: 150,
    experience: 75,
  },
  {
    id: "projects_chest",
    sectionId: "projects",
    coins: 200,
    experience: 100,
  },
  {
    id: "skills_chest",
    sectionId: "skills",
    coins: 250,
    experience: 125,
  },
]

// Portfolio Data
export const PORTFOLIO_DATA = {
  personal: {
    name: "Nguyễn Thành Nghĩa",
    title: "Game Developer",
    location: "Hà Nội, Vietnam",
    phone: "0352614770",
    email: "thanhnghia98@gmail.com",
    linkedin: "https://www.linkedin.com/in/nghia-nguyen-thanh-4b61a613a",
  },
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
      status: "Released",
    },
    {
      title: "Rope Tangle - Master Twisted 3D",
      period: "2024",
      description: "3D puzzle game featuring rope physics and optimized mobile performance.",
      technologies: ["Unity", "Obi-rope", "AdMob", "Firebase"],
      status: "Released",
    },
    {
      title: "Hellven NFT Game",
      period: "Jul 2022 - Jul 2023",
      description: "WebGL NFT game developed for funding and full product deployment.",
      technologies: ["Unity", "WebGL", "Nakama", "Spine"],
      status: "Released",
    },
    {
      title: "Planet Sandbox",
      period: "2022",
      description: "Multiplayer sandbox game with multilingual support and collaborative UI development.",
      technologies: ["Unity", "Photon Fusion", "Multiplayer"],
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
