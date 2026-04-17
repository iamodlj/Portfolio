import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Code,
  Database,
  Lock,
  Sprout,
  Monitor,
  ShieldCheck,
  Wine,
  Calculator,
  Sparkles,
  Church,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string | string[];
  tags: string[];
  link: string;
  icon?: JSX.Element;
}

const projects: Project[] = [
  {
    id: 0,
    title: "Clapes Department",
    description:
      "Clapes Department clothing brand E-commerce website. Providing a modern, component-based architecture. Features include responsive design, modern dark UI, product catalog with filtering, contact form with validation, about page, shopping cart and checkout, image gallery with filtering, and smooth animations. Deployed on Vercel.",
    image: "/clapesdept.png",
    tags: ["React.js", "CSS", "E-commerce", "Vercel"],
    link: "https://www.clapesdepartment.com/",
    icon: <Monitor size={20} className="text-black/80" />,
  },
  {
    id: 1,
    title: "Calculator App",
    description:
      "Calculator built with React and styled with Tailwind CSS. Features basic arithmetic operations, clear and backspace functionality, modern responsive design, error handling for invalid calculations, SEO optimization, and PWA ready with manifest.json.",
    image: "/Calculator.png",
    tags: ["React", "Tailwind CSS", "JavaScript", "PWA"],
    link: "https://calculator-app-iamodljs-projects.vercel.app/",
    icon: <Calculator size={20} className="text-black/80" />,
  },
  {
    id: 2,
    title: "Web-Based Ghana Vehicle Check",
    description:
      "Created a platform bridging the gap between DVLA and Ghana Police Serive(MTTD) allowing law enforcement to verify vehicle registration and ownership data. Integrated a backend system to flag stolen vehicles during traffic checks. Serving as my final year project in the university - UPSA",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop",
    tags: [
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
      "EmailJS",
      "AJAX",
      "GitHub",
      "Chart.js",
    ],
    link: "https://github.com/iamodlj/",
    icon: <Database size={20} className="text-black/80" />,
  },
  {
    id: 3,
    title: "Abokobi Secure Banking Shield",
    description:
      "A modern banking platform designed for rural banking in Ghana with comprehensive fraud protection features, secure authentication, and user-friendly interfaces. Includes multi-factor authentication, secure transaction processing, and advanced fraud monitoring.",
    image: "/abokobi-banking-login.png",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://abokobi-banking.vercel.app/",
    icon: <ShieldCheck size={20} className="text-black/80" />,
  },
  {
    id: 4,
    title: "Secure Password Manager",
    description:
      "A secure password manager implemented in Python. It allows you to store, retrieve, and manage your passwords securely using encryption.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    tags: ["Python", "Encryption", "Security"],
    link: "https://github.com/iamodlj/password-manager-project",
    icon: <Lock size={20} className="text-black/80" />,
  },
  {
    id: 5,
    title: "Agrisoz",
    description:
      "An AI-powered system that assists farmers in swiftly identifying, diagnosing, and addressing issues related to crops and livestock, enhancing productivity and reducing losses. Worked as a frontend developer for the project. Team Lead for this project",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Tailwind CSS", "shadcn-ui", "Vite"],
    link: "https://github.com/iamodlj/",
    icon: <Sprout size={20} className="text-black/80" />,
  },
  {
    id: 6,
    title: "Website for PrimeTech",
    description:
      "A responsive, modern website developed for PrimeTech showcasing their services and products.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1600&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript", "Git"],
    link: "https://iamodlj.github.io/PrimeTech/",
    icon: <Monitor size={20} className="text-black/80" />,
  },
  {
    id: 7,
    title: "Personal Portfolio",
    description: "A showcase of my work and abilities as a developer.",
    image:
      "https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=1600&auto=format&fit=crop",
    tags: ["React", "Vite", "TypeScript", "shadcn-ui", "Tailwind CSS", "Live"],
    link: "#",
    icon: <Code size={20} className="text-black/80" />,
  },
  {
    id: 8,
    title: "Weather Dashboard",
    description: "Real-time weather information with beautiful visualizations.",
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=1600&auto=format&fit=crop",
    tags: ["HTML", "JavaScript", "API", "CSS", "GitHub"],
    link: "https://iamodlj.github.io/weather-app/",
  },
  {
    id: 9,
    title: "TicTacToe Game",
    description:
      "A classic TicTacToe game with both Player vs Player and Player vs AI modes. Features a modern UI design and smooth animations.",
    image: "/TicTacToe.png",
    tags: ["HTML", "CSS", "JavaScript", "Game Development"],
    link: "https://tic-tac-toc-taupe.vercel.app/",
    icon: <Code size={20} className="text-black/80" />,
  },
  {
    id: 10,
    title: "Kool Hib",
    description:
      "An e-commerce platform for a premium hibiscus-based beverage brand based in Accra, Ghana. Features include product catalog, shopping cart functionality, responsive design, blog section, and SEO optimization for their line of premium juices.",
    image: "/kool_hib_preview.png",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    link: "https://kool-hib.vercel.app/",
    icon: <Wine size={20} className="text-black/80" />,
  },
  {
    id: 11,
    title: "Luna Essence Spa",
    description:
      "A beautiful, modern spa booking website with SMS confirmations, built with React, TypeScript, and TailwindCSS. Features glassmorphism effects, fully responsive design, interactive UI with dynamic SVG backgrounds, real-time SMS booking system via MNotify API, and Vercel Analytics integration.",
    image: "/Luna.png",
    tags: ["React", "TypeScript", "TailwindCSS", "Vite", "shadcn/ui"],
    link: "https://lunaessencespa.com",
    icon: <Sparkles size={20} className="text-black/80" />,
  },
  {
    id: 12,
    title: "Church Management System",
    description:
      "A comprehensive church management system built with React, Vite, and Supabase for a church in Ghana. Features role-based access control, member and visitor management, attendance tracking, financial management, SMS broadcasting, equipment management, and analytics with real-time updates.",
    image: ["/caci-fwc.PNG", "/Grace_Avenue.png"],
    tags: [
      "React",
      "TypeScript",
      "Supabase",
      "Vite",
      "shadcn/ui",
      "PostgreSQL",
      "Live",
    ],
    link: "https://github.com/iamodlj",
    icon: <Church size={20} className="text-black/80" />,
  },
  {
    id: 13,
    title: "Makarios Consult",
    description:
      "A modern, responsive website for Makarios Consult - a professional business consulting firm specializing in operations, healthcare strategy, and brand development. Features modern design, responsive layout, Calendly integration, team profiles, contact forms, fast performance, SEO optimization, and social media meta tags.",
    image: "/makariocapital.png",
    tags: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "shadcn/ui",
      "React Router DOM",
      "React Hook Form",
      "Zod",
      "Lucide React",
      "GoDaddy DNS",
    ],
    link: "https://www.makariocapital.com",
    icon: <Sparkles size={20} className="text-black/80" />,
  },
  {
    id: 14,
    title: "Mount Sinai Home Healthcare Services Inc",
    description:
      "Personalized 1-on-1 Home Healthcare Services for loved ones. Experience compassionate care that enhances independence and quality of life. Certified professionals, licensed & insured. Based in Ontario.",
    image: "/Mount_SinaiHomeHealthServices.png",
    tags: ["Healthcare", "Website", "Ontario"],
    link: "https://mountsinaihealthcare.com",
    icon: <ShieldCheck size={20} className="text-black/80" />,
  },
  {
    id: 15,
    title: "Elite Health Solutions Inc.",
    description:
      "We are a leading provider of comprehensive healthcare staffing solutions, dedicated to connecting skilled professionals such as Nurses, RPNs, and PSWs with facilities across Canada.",
    image: "/elite.png",
    tags: ["Healthcare", "Website", "Canada"],
    link: "https://www.ehssi.ca/",
    icon: <ShieldCheck size={20} className="text-black/80" />,
  },
  {
    id: 16,
    title: "Lingua.care",
    description:
      "A human-centered health tech platform transforming how culturally and linguistically diverse communities access healthcare. Features multilingual care note transcription, voice-to-text documentation, EHR integration API, family communication portal, and smart care recommendations with AI-driven tools for 100+ languages.",
    image: "/lingua.png",
    tags: ["HealthTech", "Multilingual", "Healthcare", "EHR Integration"],
    link: "https://www.lingua.care/",
    icon: <ShieldCheck size={20} className="text-black/80" />,
  },
  {
    id: 17,
    title: "Orphanage Care Management System",
    description:
      "A comprehensive management system designed for orphanage care facilities. Streamlines operations with features for child records management, staff coordination, donation tracking, visitor management, and reporting. Built to enhance care delivery and administrative efficiency.",
    image: "/orphan_care_management_system.png",
    tags: ["React", "TypeScript", "Management System", "Social Impact"],
    link: "https://assurance-orphan.vercel.app/",
    icon: <ShieldCheck size={20} className="text-black/80" />,
  },
  {
    id: 18,
    title: "ASOG POS Web App",
    description:
      "A live POS web application with secure account sign-in, built for streamlined day-to-day business transactions and operations. Powered by Advanced Tech Business Solutions (ATBS).",
    image: "/pos.PNG",
    tags: ["Web App", "POS", "Live"],
    link: "https://asog-pos.vercel.app/",
    icon: <Monitor size={20} className="text-black/80" />,
  },
  {
    id: 19,
    title: "Voices To Vision",
    description:
      "A live disability-inclusive community platform for Black and newcomer youth in Canada, highlighting programs in employment readiness, mentorship, accessible tech training, and advocacy.",
    image: "/v2v.PNG",
    tags: ["Website", "Community Impact", "Accessibility", "Live"],
    link: "https://www.voicestovision.org",
    icon: <Monitor size={20} className="text-black/80" />,
  },
  {
    id: 20,
    title: "Cescars Website & CMS",
    description:
      "A live brand website with private-access entry experience and CMS-backed content management for controlled updates.",
    image: "/cesars.PNG",
    tags: ["Website", "CMS", "Live"],
    link: "https://www.cescars.com/",
    icon: <Monitor size={20} className="text-black/80" />,
  },
  {
    id: 21,
    title: "Eunoia Trade",
    description:
      "A pre-launch investment platform focused on African markets, now running a public waitlist while preparing full website and mobile app experiences.",
    image: "/ETA.PNG",
    tags: ["FinTech", "Website", "Mobile App", "Coming Soon"],
    link: "https://www.eunoiatrade.com/",
    icon: <Code size={20} className="text-black/80" />,
  },
  {
    id: 22,
    title: "Averra Study Web App",
    description:
      "An AI-powered legal studies platform for Ghanaian law students featuring case summaries, flashcards, question banks, and an AI study assistant, with onboarding and learning flows already online.",
    image: "/averra.PNG",
    tags: ["Web App", "Education", "LegalTech", "Live"],
    link: "https://averrastudy.vercel.app/",
    icon: <Monitor size={20} className="text-black/80" />,
  },
];

const liveProjectIds = [
  12, // Church Management System
  18, // ASOG POS Web App
  20, // Cescars Website & CMS
  19, // Voices To Vision
  13, // Makarios Consult
  11, // Luna Essence Spa
  16, // Lingua.care
  14, // Mount Sinai Home Healthcare Services Inc
  15, // Elite Health Solutions Inc.
  10, // Kool Hib
  0, // Clapes Department
  22, // Averra Study Web App
  17, // Orphanage Care Management System
  3, // Abokobi Secure Banking Shield
  1, // Calculator App
  9, // TicTacToe Game
  8, // Weather Dashboard
  6, // Website for PrimeTech
  7, // Personal Portfolio
];

const comingSoonProjectIds = [
  21, // Eunoia Trade
];

const additionalProjectIds = [
  5, // Agrisoz
  2, // Web-Based Ghana Vehicle Check
  4, // Secure Password Manager
];

const projectsById = new Map(projects.map((project) => [project.id, project]));

const getProjectsByIds = (ids: number[]) =>
  ids
    .map((id) => projectsById.get(id))
    .filter((project): project is Project => Boolean(project));

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    // Fallback timeout to show projects if intersection observer fails
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallbackTimer);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px -10% 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const liveProjects = getProjectsByIds(liveProjectIds);
  const comingSoonProjects = getProjectsByIds(comingSoonProjectIds);

  const pinnedIds = new Set([
    ...liveProjectIds,
    ...comingSoonProjectIds,
    ...additionalProjectIds,
  ]);

  const additionalProjects = [
    ...getProjectsByIds(additionalProjectIds),
    ...projects.filter((project) => !pinnedIds.has(project.id)),
  ];

  const renderProjectGrid = (projectList: Project[], animationOffset = 0) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projectList.map((project, index) => (
        <div
          key={project.id}
          className={`glass rounded-2xl overflow-hidden hover-lift ${isVisible
              ? `opacity-100 animate-fade-in animate-fade-in-delay-${Math.min(
                animationOffset + index + 1,
                14
              )}`
              : "opacity-0"
            }`}
        >
          {Array.isArray(project.image) ? (
            <div className="aspect-video grid grid-cols-2 gap-1 overflow-hidden bg-gray-100">
              {project.image.map((imageSrc, imageIndex) => (
                <img
                  key={`${project.id}-${imageIndex}`}
                  src={imageSrc}
                  alt={`${project.title} screenshot ${imageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-2">
              {project.icon && (
                <div className="flex items-center justify-center">
                  {project.icon}
                </div>
              )}
              <h3 className="text-xl font-bold">{project.title}</h3>
            </div>
            <p className="text-black/70 mb-4">{project.description}</p>
            <a
              href={project.link}
              className="inline-flex items-center font-medium text-black"
            >
              View Project
              <ArrowUpRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-20 md:py-32 ${isVisible ? "scroll-section visible" : "scroll-section"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="subtle-glass inline-block px-4 py-1 rounded-full mb-6">
            <p className="text-sm font-medium text-black/70">My Work</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-black/70">
            A selection of my recent work, showcasing my skills in design and
            development.
          </p>
        </div>

        {liveProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Live Projects
            </h3>
            <p className="text-black/70 mb-8">
              Production-ready projects currently accessible online.
            </p>
            {renderProjectGrid(liveProjects)}
          </div>
        )}

        {comingSoonProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Coming Soon
            </h3>
            <p className="text-black/70 mb-8">
              Upcoming products and platforms currently in final development.
            </p>
            {renderProjectGrid(comingSoonProjects, liveProjects.length)}
          </div>
        )}

        {additionalProjects.length > 0 && (
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Additional Projects
            </h3>
            <p className="text-black/70 mb-8">
              More work across web apps, tooling, and product experiments.
            </p>
            {renderProjectGrid(
              additionalProjects,
              liveProjects.length + comingSoonProjects.length
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
