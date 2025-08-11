// VTech Software Company Configuration
// Company information and branding

export const companyInfo = {
  name: "VTech Software Solutions",
  tagline: "Building Tomorrow's Digital Infrastructure Today",
  shortName: "VTech",
  bio: "We are a forward-thinking software development company specializing in custom applications, cloud solutions, and digital transformation. Our team combines cutting-edge technology with business expertise to deliver scalable, secure, and innovative software solutions that drive growth.",
  mission: "To empower businesses with innovative software solutions that transform operations, enhance efficiency, and accelerate digital growth.",
  vision: "To be the leading software development partner for companies seeking reliable, scalable, and future-ready technology solutions.",
  email: "hello@vtech-solutions.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  address: "123 Tech Street, Suite 400, San Francisco, CA 94105",
  founded: "2020",
  teamSize: "15+ Experts",
  projectsCompleted: "150+",
  logo: "/vtech-logo.svg",
  available: true,
  
  // Company values
  values: [
    {
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex business challenges.",
      icon: "🚀"
    },
    {
      title: "Quality",
      description: "We deliver robust, scalable, and maintainable software with rigorous testing and best practices.",
      icon: "⭐"
    },
    {
      title: "Partnership",
      description: "We work closely with our clients as trusted partners, ensuring their success is our success.",
      icon: "🤝"
    },
    {
      title: "Transparency",
      description: "We maintain open communication and provide clear insights throughout the development process.",
      icon: "🔍"
    }
  ],

  // Social and professional links
  social: {
    linkedin: "https://linkedin.com/company/vtech-solutions",
    github: "https://github.com/vtech-solutions",
    twitter: "https://twitter.com/vtechsolutions",
    youtube: "https://youtube.com/c/vtechsolutions",
    medium: "https://medium.com/@vtechsolutions"
  },

  // Core services
  services: [
    {
      id: "custom-development",
      title: "Custom Software Development",
      description: "End-to-end development of tailored software solutions that perfectly fit your business requirements and scale with your growth.",
      icon: "💻",
      features: ["Web Applications", "Desktop Software", "API Development", "Database Design", "System Integration"],
      color: "from-slate-700 to-cyan-500"
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android platforms.",
      icon: "📱",
      features: ["iOS Development", "Android Development", "React Native", "Flutter", "App Store Deployment"],
      color: "from-cyan-500 to-teal-500"
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps Solutions",
      description: "Scalable cloud architecture, automated deployment pipelines, and infrastructure management for modern applications.",
      icon: "☁️",
      features: ["AWS/Azure/GCP", "Docker & Kubernetes", "CI/CD Pipelines", "Infrastructure as Code", "Monitoring & Analytics"],
      color: "from-orange-500 to-amber-500"
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Intelligent solutions that leverage artificial intelligence and machine learning to automate processes and generate insights.",
      icon: "🤖",
      features: ["Data Analysis", "Predictive Models", "Natural Language Processing", "Computer Vision", "AI Integration"],
      color: "from-emerald-500 to-green-500"
    },
    {
      id: "consulting",
      title: "Digital Transformation",
      description: "Strategic guidance and implementation support for modernizing legacy systems and adopting new technologies.",
      icon: "🔄",
      features: ["Technology Strategy", "System Modernization", "Process Automation", "Digital Workflows", "Change Management"],
      color: "from-violet-500 to-purple-500"
    },
    {
      id: "support",
      title: "Maintenance & Support",
      description: "Ongoing maintenance, updates, and technical support to ensure your software remains secure and performs optimally.",
      icon: "🛠️",
      features: ["24/7 Monitoring", "Security Updates", "Performance Optimization", "Bug Fixes", "Feature Enhancements"],
      color: "from-slate-600 to-gray-700"
    }
  ],

  // Technology stack
  technologies: {
    frontend: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Python", "Java", "C#", ".NET", "Go", "PHP"],
    mobile: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"],
    database: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"],
    cloud: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
    tools: ["Git", "Jenkins", "GitHub Actions", "Jira", "Figma", "Slack"]
  },

  // Industry expertise
  industries: [
    { name: "FinTech", icon: "💳", description: "Banking and financial services solutions" },
    { name: "Healthcare", icon: "🏥", description: "Medical software and patient management systems" },
    { name: "E-commerce", icon: "🛒", description: "Online retail and marketplace platforms" },
    { name: "Education", icon: "🎓", description: "Learning management and educational tools" },
    { name: "Manufacturing", icon: "🏭", description: "Industrial automation and IoT solutions" },
    { name: "Real Estate", icon: "🏠", description: "Property management and listing platforms" }
  ],

  // Client testimonials (placeholder data)
  testimonials: [
    {
      id: "1",
      name: "Sarah Johnson",
      title: "CTO",
      company: "TechStart Inc.",
      content: "VTech delivered exceptional results on our custom CRM system. Their technical expertise and attention to detail exceeded our expectations.",
      rating: 5,
      image: "/testimonials/sarah.jpg"
    },
    {
      id: "2", 
      name: "Michael Chen",
      title: "Product Manager",
      company: "GrowthCorp",
      content: "The mobile app VTech built for us has been a game-changer. User engagement increased by 300% after launch.",
      rating: 5,
      image: "/testimonials/michael.jpg"
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      title: "Founder",
      company: "HealthTech Solutions",
      content: "Working with VTech was seamless. They understood our complex requirements and delivered a robust, scalable solution on time.",
      rating: 5,
      image: "/testimonials/emily.jpg"
    }
  ],

  // Company stats
  stats: [
    { label: "Projects Completed", value: "150+", icon: "📊" },
    { label: "Happy Clients", value: "80+", icon: "😊" },
    { label: "Team Members", value: "15+", icon: "👥" },
    { label: "Years Experience", value: "4+", icon: "🗓️" },
    { label: "Code Commits", value: "10K+", icon: "💻" },
    { label: "Coffee Consumed", value: "∞", icon: "☕" }
  ]
};

// Navigation items for company site
export const navigationItems = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/services', label: 'Services', icon: 'services' },
  { href: '/solutions', label: 'Solutions', icon: 'solutions' },
  { href: '/about', label: 'About', icon: 'about' },
  { href: '/portfolio', label: 'Portfolio', icon: 'portfolio' },
  { href: '/team', label: 'Team', icon: 'team' },
  { href: '/resources', label: 'Resources', icon: 'resources' },
  { href: '/contact', label: 'Contact', icon: 'contact' },
];

export default companyInfo;
