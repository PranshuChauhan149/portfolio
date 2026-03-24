export type SkillCategory = {
  title: string;
  icon: string;
  items: { name: string; level: number }[];
};

export type ProjectCategory = "web" | "mobile" | "ai";

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  stack: string[];
  highlights: string[];
  gallery: string[];
  demoUrl: string;
  githubUrl: string;
  image: string;
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
};

export const roles = [
  "Full Stack Engineer",
  "Web Developer",
  "Mobile Developer",
  "AI/ML Builder",
];

export const stats = [
  { label: "Projects Delivered", value: "35+" },
  { label: "Technologies Mastered", value: "25+" },
  { label: "Years of Experience", value: "4+" },
  { label: "Client Satisfaction", value: "98%" },
];

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    items: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 86 },
      { name: "MongoDB", level: 84 },
      { name: "PostgreSQL", level: 78 },
    ],
  },
  {
    title: "Mobile",
    icon: "📱",
    items: [
      { name: "React Native", level: 87 },
      { name: "Flutter", level: 72 },
      { name: "Expo", level: 85 },
      { name: "Native APIs", level: 78 },
    ],
  },
  {
    title: "AI / ML",
    icon: "🧠",
    items: [
      { name: "Python", level: 88 },
      { name: "TensorFlow", level: 77 },
      { name: "PyTorch", level: 74 },
      { name: "OpenAI APIs", level: 89 },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "ai-resume-builder",
    title: "AI Resume Builder",
    description:
      "An AI-powered resume builder with Gemini AI for content optimization, template customization, and PDF export.",
    longDescription:
      "AI Resume Builder is a full-stack MERN application that leverages Google Gemini AI to help users create professional, optimized resumes with real-time preview and export functionality.",
    category: "ai",
    stack: [
      "React.js (Vite)",
      "Redux Toolkit",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "Gemini API",
      "ImageKit"
    ],
    highlights: [
      "AI-powered resume enhancement using Gemini AI.",
      "Real-time preview with customizable templates.",
      "Image upload with background removal.",
      "One-click PDF export."
    ],
    gallery: [],
    demoUrl: "https://ai-resume-builder-phi-flax.vercel.app",
    githubUrl: "https://github.com/PranshuChauhan149/AI-Resume-Builder",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
  },

  {
    slug: "campussync",
    title: "CampusSync",
    description:
      "A MERN-based campus platform with AI tools, marketplace, and lost & found system.",
    longDescription:
      "CampusSync combines multiple student services including AI interview system, notes generator, marketplace, and lost & found into one unified platform.",
    category: "ai",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion"
    ],
    highlights: [
      "AI interview system with voice interaction.",
      "AI notes generator.",
      "Marketplace + Lost & Found.",
      "Modular MERN architecture."
    ],
    gallery: [],
    demoUrl: "https://campus-sigma-flame.vercel.app/",
    githubUrl: "https://github.com/PranshuChauhan149/CampusSync",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
  },

  {
    slug: "agri-crop-insight",
    title: "SmartAgro AI",
    description:
      "AI-powered agriculture assistant for crop health, pest prediction, and irrigation optimization.",
    longDescription:
      "SmartAgro AI provides real-time insights for farming using AI models, weather data, and predictive analytics.",
    category: "ai",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Gemini API",
      "OpenWeather API"
    ],
    highlights: [
      "Plant disease detection.",
      "Pest prediction system.",
      "Soil health analysis.",
      "Smart irrigation planning."
    ],
    gallery: [],
    demoUrl: "https://agri-crop-insight.onrender.com/",
    githubUrl: "https://github.com/PranshuChauhan149/agri-crop-insight",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80"
  },

  {
    slug: "track-cart",
    title: "Track-Cart",
    description:
      "A grocery delivery platform with real-time tracking and chat.",
    longDescription:
      "Track-Cart enables live order tracking and communication using Socket.io and Next.js.",
    category: "web",
    stack: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "NextAuth",
      "Socket.io",
      "Tailwind CSS"
    ],
    highlights: [
      "Real-time tracking.",
      "Socket.io chat system.",
      "Secure authentication.",
      "Modern UI."
    ],
    gallery: [],
    demoUrl: "",
    githubUrl: "https://github.com/PranshuChauhan149/Track-Cart",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80"
  },

  {
    slug: "doctor-appointment-system",
    title: "Doctor Appointment System",
    description:
      "Healthcare platform with booking, dashboards, and payments.",
    longDescription:
      "A MERN app with role-based dashboards for patients, doctors, and admins including payment integration.",
    category: "web",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
      "Razorpay",
      "Stripe"
    ],
    highlights: [
      "Role-based dashboards.",
      "Appointment booking system.",
      "Payment integration.",
      "Secure authentication."
    ],
    gallery: [],
    demoUrl: "https://doctor-appointment-system-wine-five.vercel.app",
    githubUrl: "https://github.com/PranshuChauhan149/Doctor-Appointment-System",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
  },

  {
    slug: "greencart-grocery",
    title: "GreenCart",
    description:
      "MERN grocery e-commerce platform with cart and admin dashboard.",
    longDescription:
      "GreenCart provides product browsing, cart management, and admin inventory system.",
    category: "web",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS"
    ],
    highlights: [
      "Cart system.",
      "Admin dashboard.",
      "Product management.",
      "Authentication."
    ],
    gallery: [],
    demoUrl: "",
    githubUrl: "https://github.com/PranshuChauhan149/greencart-grocery",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
  },

  {
    slug: "gym-management-system",
    title: "Gym Management System",
    description:
      "Dashboard for managing gym members and memberships.",
    longDescription:
      "A MERN admin dashboard for handling gym member data and tracking activity.",
    category: "web",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS"
    ],
    highlights: [
      "Member management.",
      "Membership tracking.",
      "CRUD system.",
      "Dashboard UI."
    ],
    gallery: [],
    demoUrl: "https://gym-management-system-nine-livid.vercel.app",
    githubUrl: "https://github.com/PranshuChauhan149/Gym-Management-System-",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
  },

  {
    slug: "chat-app",
    title: "ChatApp",
    description: "Real-time chat application using Socket.io.",
    longDescription:
      "A MERN chat app supporting instant messaging, online users, and media sharing.",
    category: "web",
    stack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io"
    ],
    highlights: [
      "Real-time messaging.",
      "Online user tracking.",
      "Media sharing.",
      "Authentication."
    ],
    gallery: [],
    demoUrl: "https://chat-app-backend-olive-three.vercel.app",
    githubUrl: "https://github.com/PranshuChauhan149/ChatApp",
    image:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=800&q=80"
  },

  {
    slug: "bitrush",
    title: "BitRush",
    description: "Food ordering app with Razorpay integration.",
    longDescription:
      "A full-stack food ordering platform with admin dashboard and secure payments.",
    category: "web",
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "PHP",
      "MongoDB",
      "Razorpay"
    ],
    highlights: [
      "Food ordering system.",
      "Payment integration.",
      "Admin panel.",
      "Responsive UI."
    ],
    gallery: [],
    demoUrl: "https://biterush-e5jv.onrender.com/",
    githubUrl: "https://github.com/PranshuChauhan149/BitRush",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
  },

  {
    slug: "spotify-clone",
    title: "Spotify Clone",
    description: "Music player app with modern UI.",
    longDescription:
      "A React-based Spotify-inspired player with audio playback and responsive design.",
    category: "web",
    stack: ["React.js", "Vite", "JavaScript", "HTML", "CSS"],
    highlights: [
      "Music playback.",
      "Playlist UI.",
      "Fast performance.",
      "Responsive design."
    ],
    gallery: [],
    demoUrl: "https://pranshu-spotify-clone.netlify.app/",
    githubUrl: "https://github.com/PranshuChauhan149/spotify-clone",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80"
  },

  {
    slug: "todo-list",
    title: "Todo List App",
    description: "Task management app using Next.js and TypeScript.",
    longDescription:
      "A simple and fast todo app for managing daily tasks with clean UI.",
    category: "web",
    stack: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    highlights: [
      "Add/edit/delete tasks.",
      "Mark completed.",
      "Clean UI.",
      "Fast performance."
    ],
    gallery: [],
    demoUrl: "https://todo-list-five-rho-80.vercel.app/",
    githubUrl: "https://github.com/PranshuChauhan149/Todo-List",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80"
  }
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, count = 2) {
  return projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, count);
}
export const experiences: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "SkillCraft Technology",
    duration: "2024",
    achievements: [
      "Worked on real-world web development projects using MERN stack.",
      "Improved problem-solving skills by building and debugging full-stack applications.",
      "Gained hands-on experience in API development, frontend integration, and deployment.",
      "Followed a 30-day build-in-public journey, consistently shipping features and projects."
    ],
  },
  {
    role: "Freelance Full Stack Developer",
    company: "Client Project (BitRush)",
    duration: "2024",
    achievements: [
      "Developed a food ordering web application with cart system and Razorpay payment integration.",
      "Built admin dashboard for managing menu items and orders.",
      "Delivered a responsive and user-friendly UI for real-world usage.",
      "Handled end-to-end development from backend APIs to frontend deployment."
    ],
  },
  {
    role: "Self-Driven Full Stack Developer",
    company: "Personal Projects",
    duration: "2023 - Present",
    achievements: [
      "Built multiple full-stack applications using MERN and Next.js including AI-based and real-time systems.",
      "Implemented advanced features like Socket.io real-time communication and authentication systems.",
      "Integrated AI tools such as Gemini API for intelligent applications.",
      "Focused on scalable architecture, clean UI, and production-ready deployments."
    ],
  },
];

export const socialLinks = {
  github: "https://github.com/PranshuChauhan149",
  linkedin: "https://linkedin.com/in/pranshu-chauhan",
  twitter: "https://twitter.com/",
  leetcode: "https://leetcode.com/",
  hackerrank: "https://www.hackerrank.com/",
  codeforces: "https://codeforces.com/",
  email: "mailto:pranshuchauhan149@gmail.com",
};
