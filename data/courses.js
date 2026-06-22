"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var courses = [
    {
        level: 1,
        code: "dfp",
        // HERO
        title: "Digital Foundations Program",
        tagline: "Start from zero, become tech-ready",
        description: "A beginner-friendly program designed to build digital confidence, computer literacy, internet skills, productivity expertise, and foundational knowledge of design, technology, and AI tools.",
        image: "/foundationprogram.png",
        previewVideo: "/foundation-preview.mp4",
        // COURSE META
        duration: "2 Months",
        price: {
            fullPayment: {
                discounted: "₦95,000",
                original: "₦125,000"
            },
            installment: {
                discounted: "₦115,000",
                original: "₦150,000"
            }
        },
        rating: 4.8,
        students: 350,
        projects: 5,
        certificate: true,
        category: "Foundations",
        levelLabel: "Beginner",
        color: "#facc15",
        // TECH STACK
        stack: [
            "Computer Basics",
            "Microsoft Office",
            "Google Workspace",
            "Internet Skills",
            "Digital Productivity",
            "Canva",
            "ChatGPT"
        ],
        // AI INTEGRATION
        aiTouch: [
            "ChatGPT for learning",
            "AI document creation",
            "AI search & productivity tools",
            "AI content generation"
        ],
        // HERO STATS
        stats: [
            {
                label: "Students",
                value: "350+"
            },
            {
                label: "Projects",
                value: "5"
            },
            {
                label: "Duration",
                value: "2 Months"
            },
            {
                label: "Rating",
                value: "4.8"
            }
        ],
        // COURSE OVERVIEW
        overview: "The Digital Foundations Program equips beginners with the essential digital skills required to thrive in today's technology-driven world. Students learn computer operations, internet usage, productivity software, collaboration tools, digital communication, and practical AI tools that increase efficiency and confidence.",
        // WHAT STUDENTS WILL LEARN
        outcomes: [
            "Use computers confidently",
            "Navigate the internet safely and effectively",
            "Create professional documents and presentations",
            "Use spreadsheets for everyday tasks",
            "Collaborate using cloud productivity tools",
            "Create designs with Canva",
            "Leverage AI tools for productivity",
            "Prepare for advanced tech programs"
        ],
        // CURRICULUM
        curriculum: [
            {
                title: "Module 1: Computer Fundamentals",
                duration: "1 Week",
                lessons: [
                    "Introduction to Computers",
                    "Operating Systems",
                    "File Management",
                    "Keyboard & Productivity Shortcuts"
                ]
            },
            {
                title: "Module 2: Internet & Digital Literacy",
                duration: "1 Week",
                lessons: [
                    "Internet Fundamentals",
                    "Search Techniques",
                    "Online Communication",
                    "Digital Safety & Security"
                ]
            },
            {
                title: "Module 3: Productivity Tools",
                duration: "2 Weeks",
                lessons: [
                    "Microsoft Word",
                    "Google Docs",
                    "PowerPoint",
                    "Google Slides",
                    "Excel Basics"
                ]
            },
            {
                title: "Module 4: Design & Creativity",
                duration: "1 Week",
                lessons: [
                    "Canva Essentials",
                    "Visual Design Basics",
                    "Presentation Design",
                    "Social Media Graphics"
                ]
            },
            {
                title: "Module 5: AI Productivity",
                duration: "1 Week",
                lessons: [
                    "Introduction to AI",
                    "Using ChatGPT",
                    "AI for Research",
                    "AI for Writing",
                    "AI Productivity Workflows"
                ]
            }
        ],
        // PROJECTS
        projectsList: [
            {
                title: "Professional Resume",
                description: "Create a modern job-ready resume using digital tools."
            },
            {
                title: "Business Presentation",
                description: "Build and present a professional slide deck."
            },
            {
                title: "Canva Design Portfolio",
                description: "Design flyers, social posts and promotional graphics."
            },
            {
                title: "AI Productivity Workflow",
                description: "Create a workflow using ChatGPT and productivity tools."
            }
        ],
        // INSTRUCTORS
        instructors: [
            {
                name: "Korva Tech Mentor",
                role: "Digital Skills Instructor",
                image: "/mentor-1.png",
                experience: "5+ Years"
            },
            {
                name: "Korva Tech Mentor",
                role: "Productivity & AI Coach",
                image: "/mentor-2.png",
                experience: "4+ Years"
            }
        ],
        // REQUIREMENTS
        requirements: [
            "No prior experience required",
            "Laptop or desktop computer",
            "Internet connection",
            "Willingness to learn"
        ],
        // WHO THIS IS FOR
        targetAudience: [
            "Absolute beginners",
            "Secondary school graduates",
            "University students",
            "Job seekers",
            "Business owners",
            "Anyone transitioning into technology"
        ],
        // SIDEBAR FEATURES
        includes: [
            "Live Instructor-Led Classes",
            "Hands-On Projects",
            "AI Productivity Training",
            "Community Access",
            "Mentorship Support",
            "Certificate of Completion",
            "Career Guidance",
            "Access to Learning Resources"
        ],
        // FAQS
        faqs: [
            {
                question: "Do I need any computer experience?",
                answer: "No. This program is designed specifically for complete beginners."
            },
            {
                question: "Will I receive a certificate?",
                answer: "Yes. Students receive a certificate upon successful completion."
            },
            {
                question: "What happens after this course?",
                answer: "Graduates can progress into Frontend Engineering, Backend Engineering, Data Intelligence, or other advanced Korva Tech Hub programs."
            }
        ],
        courseOutline: "5",
        courseDuration: "2 Months",
        classSchedule: "4 Days / Week",
        classFormat: "2 Hours Daily",
        studyMaterials: true,
        internship: true,
        examIncluded: true,
        communityAccess: true,
        mentorSupport: true,
        lifetimeAccess: true,
        mentors: ["/mentor-1.png", "/mentor-2.png"]
    },
    {
        level: 2,
        code: "feu",
        // HERO
        title: "Frontend Engineering & UI/UX",
        tagline: "Build beautiful, modern interfaces with intelligence",
        description: "Learn how to design and build modern, responsive, and production-ready web applications using UI/UX principles, frontend technologies, and AI-powered development workflows.",
        image: "/frontend.png",
        previewVideo: "/frontend-preview.mp4",
        // COURSE META
        duration: "5 Months",
        price: {
            fullPayment: {
                discounted: "₦200,800",
                original: "₦267,750"
            },
            installment: {
                discounted: "₦225,000",
                original: "₦267,750"
            }
        },
        rating: 4.9,
        students: 220,
        projects: 10,
        certificate: true,
        category: "Frontend",
        levelLabel: "Beginner to Intermediate",
        color: "#a78bfa",
        // TECH STACK
        stack: [
            "HTML",
            "CSS",
            "JavaScript",
            "Tailwind CSS",
            "React",
            "Next.js",
            "Figma",
            "Git"
        ],
        // AI INTEGRATION
        aiTouch: [
            "AI UI design tools",
            "AI debugging assistants",
            "Design-to-code workflows",
            "AI code generation",
            "AI accessibility suggestions"
        ],
        // HERO STATS
        stats: [
            {
                label: "Students",
                value: "220+"
            },
            {
                label: "Projects",
                value: "10"
            },
            {
                label: "Duration",
                value: "5 Months"
            },
            {
                label: "Rating",
                value: "4.9"
            }
        ],
        // COURSE OVERVIEW
        overview: "Master the complete frontend development workflow from design to deployment. Learn how to create stunning interfaces, build reusable components, optimize performance, and leverage AI tools to accelerate development and improve user experience.",
        // LEARNING OUTCOMES
        outcomes: [
            "Build responsive websites from scratch",
            "Design user interfaces with Figma",
            "Create reusable React components",
            "Develop production-ready Next.js applications",
            "Implement modern UI/UX principles",
            "Use Tailwind CSS efficiently",
            "Integrate APIs into frontend applications",
            "Deploy applications to production",
            "Use AI tools to improve workflows",
            "Build a professional frontend portfolio"
        ],
        // CURRICULUM
        curriculum: [
            {
                title: "Module 1: Web Fundamentals",
                duration: "3 Weeks",
                lessons: [
                    "HTML Fundamentals",
                    "Semantic HTML",
                    "CSS Fundamentals",
                    "Flexbox",
                    "CSS Grid",
                    "Responsive Design"
                ]
            },
            {
                title: "Module 2: JavaScript Essentials",
                duration: "4 Weeks",
                lessons: [
                    "Variables & Data Types",
                    "Functions",
                    "Arrays & Objects",
                    "DOM Manipulation",
                    "ES6 Features",
                    "Async JavaScript"
                ]
            },
            {
                title: "Module 3: UI/UX Design",
                duration: "3 Weeks",
                lessons: [
                    "Design Thinking",
                    "User Research",
                    "Wireframing",
                    "Prototyping",
                    "Figma Fundamentals",
                    "Design Systems"
                ]
            },
            {
                title: "Module 4: React Development",
                duration: "4 Weeks",
                lessons: [
                    "React Fundamentals",
                    "JSX",
                    "Components",
                    "Props",
                    "State Management",
                    "Hooks"
                ]
            },
            {
                title: "Module 5: Next.js & Modern Frontend",
                duration: "3 Weeks",
                lessons: [
                    "Next.js Fundamentals",
                    "Routing",
                    "Layouts",
                    "Server Components",
                    "API Integration",
                    "Deployment"
                ]
            },
            {
                title: "Module 6: AI-Assisted Frontend Development",
                duration: "2 Weeks",
                lessons: [
                    "AI Design Tools",
                    "Design-to-Code Workflows",
                    "AI Debugging",
                    "AI Frontend Productivity",
                    "Accessibility Improvements"
                ]
            }
        ],
        // PROJECTS
        projectsList: [
            {
                title: "Personal Portfolio Website",
                description: "Build a professional developer portfolio using HTML, CSS and JavaScript."
            },
            {
                title: "Modern Landing Page",
                description: "Design and develop a conversion-focused responsive landing page."
            },
            {
                title: "UI/UX Case Study",
                description: "Research, design and prototype a complete digital product in Figma."
            },
            {
                title: "React Dashboard",
                description: "Build an interactive dashboard using React and reusable components."
            },
            {
                title: "Full Next.js Application",
                description: "Develop and deploy a production-ready Next.js project."
            }
        ],
        // CAPSTONE PROJECT
        capstoneProject: {
            title: "Startup SaaS Frontend Application",
            description: "Design and build a complete SaaS platform frontend including authentication, dashboard, settings pages, responsive layouts and API integration."
        },
        // INSTRUCTORS
        instructors: [
            {
                name: "Korva Tech Mentor",
                role: "Frontend Engineer & UI/UX Designer",
                image: "/mentor-1.png",
                experience: "6+ Years"
            }
        ],
        // REQUIREMENTS
        requirements: [
            "Completion of Digital Foundations Program (recommended)",
            "Basic computer literacy",
            "Laptop with internet connection",
            "Commitment to practical learning"
        ],
        // WHO THIS IS FOR
        targetAudience: [
            "Aspiring Frontend Developers",
            "Future UI/UX Designers",
            "Freelancers",
            "Students interested in web development",
            "Career switchers entering tech",
            "Entrepreneurs building digital products"
        ],
        // CAREER PATHS
        careerPaths: [
            "Frontend Developer",
            "React Developer",
            "Next.js Developer",
            "UI Designer",
            "UX Designer",
            "Product Designer",
            "Freelance Web Developer"
        ],
        // SIDEBAR FEATURES
        includes: [
            "Live Instructor-Led Classes",
            "Hands-On Projects",
            "Capstone Project",
            "UI/UX Design Training",
            "AI Development Workflows",
            "Portfolio Development",
            "Mentorship Support",
            "Certificate of Completion",
            "Career Guidance",
            "Community Access"
        ],
        // FAQS
        faqs: [
            {
                question: "Do I need coding experience?",
                answer: "No. The course starts from the fundamentals and gradually progresses to advanced frontend concepts."
            },
            {
                question: "Will I learn both design and coding?",
                answer: "Yes. This program combines UI/UX design principles with frontend development skills."
            },
            {
                question: "Will I build real projects?",
                answer: "Absolutely. Students complete multiple projects and a capstone application for their portfolio."
            },
            {
                question: "Will I receive a certificate?",
                answer: "Yes. Students who complete the program successfully receive a certificate."
            }
        ],
        courseOutline: "6",
        courseDuration: "5 Months",
        classSchedule: "4 Days / Week",
        classFormat: "2 Hours Daily",
        studyMaterials: true,
        internship: true,
        examIncluded: true,
        communityAccess: true,
        mentorSupport: true,
        lifetimeAccess: true,
        mentors: ["/mentor-1.png"]
    },
    {
        level: 3,
        code: "bea",
        // HERO
        title: "Backend Engineering with AI",
        tagline: "Build systems that power applications",
        description: "Learn backend development, APIs, databases, authentication, cloud deployment and AI-assisted engineering workflows.",
        image: "/backend.png",
        previewVideo: "/backend-preview.mp4",
        // COURSE META
        duration: "5 Months",
        price: {
            fullPayment: {
                discounted: "₦250,000",
                original: "₦320,000"
            },
            installment: {
                discounted: "₦285,000",
                original: "₦320,000"
            }
        },
        rating: 4.7,
        students: 180,
        projects: 12,
        certificate: true,
        category: "Backend",
        levelLabel: "Intermediate",
        // COURSE COLOR
        color: "#fb923c",
        // TECH STACK
        stack: [
            "Node.js",
            "Express",
            "MongoDB",
            "PostgreSQL",
            "REST APIs",
            "Docker",
            "AWS",
        ],
        // AI FEATURES
        aiTouch: [
            "AI API design",
            "AI backend debugging",
            "AI schema suggestions",
            "AI documentation generation",
        ],
        // HERO STATS
        stats: [
            {
                label: "Students",
                value: "180+",
            },
            {
                label: "Projects",
                value: "12",
            },
            {
                label: "Duration",
                value: "5 Months",
            },
            {
                label: "Rating",
                value: "4.7",
            },
        ],
        // OVERVIEW TAB
        overview: "Master backend architecture and scalable systems. Build APIs, authentication systems, databases and cloud deployments using modern development workflows enhanced by AI tools.",
        // LEARNING OUTCOMES
        outcomes: [
            "Build production-ready REST APIs",
            "Implement JWT authentication",
            "Design scalable databases",
            "Deploy applications to cloud providers",
            "Build backend services with Node.js",
            "Use AI to accelerate backend development",
            "Create API documentation",
            "Design microservice architectures",
        ],
        // CURRICULUM TAB
        curriculum: [
            {
                title: "Module 1: Backend Fundamentals",
                duration: "2 Weeks",
                lessons: [
                    "Introduction to Backend Development",
                    "Node.js Fundamentals",
                    "NPM & Package Management",
                    "Environment Variables",
                ],
            },
            {
                title: "Module 2: Express.js",
                duration: "3 Weeks",
                lessons: [
                    "Express Fundamentals",
                    "Routing",
                    "Controllers",
                    "Middleware",
                ],
            },
            {
                title: "Module 3: Databases",
                duration: "4 Weeks",
                lessons: [
                    "MongoDB",
                    "Mongoose",
                    "PostgreSQL",
                    "Database Design",
                ],
            },
            {
                title: "Module 4: Authentication",
                duration: "2 Weeks",
                lessons: [
                    "JWT",
                    "Authorization",
                    "Role Based Access",
                    "Security Best Practices",
                ],
            },
            {
                title: "Module 5: Deployment",
                duration: "2 Weeks",
                lessons: [
                    "Docker",
                    "CI/CD",
                    "AWS",
                    "Monitoring",
                ],
            },
        ],
        // PROJECTS SECTION
        projectsList: [
            {
                title: "Authentication API",
                description: "JWT authentication system",
            },
            {
                title: "E-Commerce Backend",
                description: "Products, orders and payments",
            },
            {
                title: "Booking Platform API",
                description: "Real-world scalable backend",
            },
        ],
        // INSTRUCTOR SECTION
        instructors: [
            {
                name: "John Doe",
                role: "Senior Backend Engineer",
                image: "/mentor-2.png",
                experience: "8+ Years",
            },
        ],
        // REQUIREMENTS
        requirements: [
            "Basic computer literacy",
            "No programming experience required",
            "Laptop with internet access",
        ],
        // WHO IS THIS FOR
        targetAudience: [
            "Beginners entering tech",
            "Frontend developers moving into backend",
            "Freelancers",
            "Startup founders",
        ],
        // WHAT'S INCLUDED SIDEBAR
        includes: [
            "Live Instructor-led Classes",
            "Real World Projects",
            "Mentorship Support",
            "Career Guidance",
            "Certificate of Completion",
            "Lifetime Community Access",
            "Interview Preparation",
        ],
        // FAQ SECTION
        faqs: [
            {
                question: "Do I need coding experience?",
                answer: "No. We start from the fundamentals.",
            },
            {
                question: "Will I receive a certificate?",
                answer: "Yes. Upon successful completion.",
            },
        ],
        courseOutline: "5",
        courseDuration: "5 Months",
        classSchedule: "4 Days / Week",
        classFormat: "2 Hours Daily",
        skillLevel: "Intermediate",
        careerPath: "Backend Developer, API Developer, Node.js Engineer, Cloud Engineer, Software Engineer",
        portfolioProjects: 8,
        capstoneProject: "Design and deploy a scalable backend platform with authentication, payments, cloud hosting, monitoring, and AI-powered features.",
        studyMaterials: true,
        internship: true,
        examIncluded: true,
        communityAccess: true,
        mentorSupport: true,
        lifetimeAccess: true,
    },
    {
        level: 4,
        code: "fsa",
        title: "Fullstack Engineering with AI",
        tagline: "Build complete production-ready systems",
        description: "Master frontend, backend, databases, authentication, payments, DevOps, cloud deployment, AI-assisted development, and software architecture by building real-world production applications.",
        image: "/fullstack.png",
        previewVideo: "/fullstack-preview.mp4",
        duration: "12 Months",
        price: {
            fullPayment: {
                discounted: "₦400,000",
                original: "₦500,000"
            },
            installment: {
                discounted: "₦450,000",
                original: "₦500,000"
            }
        },
        rating: 5.0,
        students: 120,
        projects: 20,
        certificate: true,
        category: "Fullstack",
        levelLabel: "Intermediate to Advanced",
        color: "#60a5fa",
        stack: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Express",
            "MongoDB",
            "PostgreSQL",
            "Prisma",
            "Auth.js",
            "Paystack",
            "Docker",
            "GitHub",
            "AWS",
            "Vercel"
        ],
        aiTouch: [
            "AI architecture planning",
            "AI code reviews",
            "AI testing assistants",
            "AI debugging workflows",
            "AI documentation generation",
            "AI fullstack copilots",
            "AI SaaS product development"
        ],
        stats: [
            {
                label: "Students",
                value: "120+"
            },
            {
                label: "Projects",
                value: "20"
            },
            {
                label: "Duration",
                value: "12 Months"
            },
            {
                label: "Rating",
                value: "5.0"
            }
        ],
        overview: "Become a complete software engineer capable of designing, building, deploying, and maintaining modern web applications. Learn frontend development, backend engineering, databases, cloud deployment, DevOps, payments, authentication, SaaS architecture, and AI-powered engineering workflows.",
        outcomes: [
            "Build complete SaaS applications",
            "Create secure authentication systems",
            "Design scalable databases",
            "Integrate third-party APIs",
            "Build payment systems",
            "Deploy applications to production",
            "Use Docker professionally",
            "Implement CI/CD pipelines",
            "Work with cloud infrastructure",
            "Write production-ready TypeScript",
            "Leverage AI throughout development",
            "Build a professional software engineering portfolio"
        ],
        curriculum: [
            {
                title: "Module 1: Software Engineering Foundations",
                duration: "4 Weeks",
                lessons: [
                    "Internet Fundamentals",
                    "How Web Applications Work",
                    "Frontend vs Backend",
                    "Developer Workflow",
                    "VS Code Mastery",
                    "Git Fundamentals",
                    "GitHub Collaboration",
                    "Developer Productivity"
                ]
            },
            {
                title: "Module 2: Modern HTML & CSS",
                duration: "4 Weeks",
                lessons: [
                    "Semantic HTML",
                    "Accessibility",
                    "CSS Fundamentals",
                    "Flexbox",
                    "CSS Grid",
                    "Responsive Design",
                    "Animations",
                    "Modern Layout Systems"
                ]
            },
            {
                title: "Module 3: JavaScript Mastery",
                duration: "6 Weeks",
                lessons: [
                    "Variables & Data Types",
                    "Functions",
                    "Objects",
                    "Arrays",
                    "DOM Manipulation",
                    "Events",
                    "Promises",
                    "Async/Await",
                    "Fetch API",
                    "ES6+ Features",
                    "Modules",
                    "Error Handling"
                ]
            },
            {
                title: "Module 4: TypeScript for Production Applications",
                duration: "3 Weeks",
                lessons: [
                    "TypeScript Fundamentals",
                    "Interfaces",
                    "Types",
                    "Generics",
                    "Utility Types",
                    "Type Safety",
                    "React + TypeScript"
                ]
            },
            {
                title: "Module 5: React Engineering",
                duration: "6 Weeks",
                lessons: [
                    "React Fundamentals",
                    "Components",
                    "Props",
                    "State",
                    "Hooks",
                    "Forms",
                    "Context API",
                    "React Architecture",
                    "Performance Optimization",
                    "Reusable Components"
                ]
            },
            {
                title: "Module 6: Next.js Development",
                duration: "6 Weeks",
                lessons: [
                    "App Router",
                    "Layouts",
                    "Server Components",
                    "Client Components",
                    "Data Fetching",
                    "Server Actions",
                    "Dynamic Routing",
                    "Metadata",
                    "SEO Optimization",
                    "Production Deployment"
                ]
            },
            {
                title: "Module 7: Backend Engineering",
                duration: "6 Weeks",
                lessons: [
                    "Node.js Fundamentals",
                    "Express.js",
                    "REST APIs",
                    "Controllers",
                    "Middleware",
                    "Error Handling",
                    "API Security",
                    "API Documentation",
                    "Service Architecture"
                ]
            },
            {
                title: "Module 8: Database Engineering",
                duration: "6 Weeks",
                lessons: [
                    "MongoDB",
                    "PostgreSQL",
                    "Database Design",
                    "Relationships",
                    "Indexes",
                    "Queries",
                    "Prisma ORM",
                    "Migrations",
                    "Performance Optimization"
                ]
            },
            {
                title: "Module 9: Authentication & Authorization",
                duration: "4 Weeks",
                lessons: [
                    "Authentication Concepts",
                    "JWT",
                    "Sessions",
                    "Auth.js",
                    "OAuth",
                    "Google Login",
                    "Role-Based Access Control",
                    "Security Best Practices"
                ]
            },
            {
                title: "Module 10: Payments & Business Logic",
                duration: "3 Weeks",
                lessons: [
                    "Payment Architecture",
                    "Paystack Integration",
                    "Flutterwave Integration",
                    "Subscription Systems",
                    "Webhooks",
                    "Transaction Security",
                    "Invoice Systems"
                ]
            },
            {
                title: "Module 11: DevOps & Deployment",
                duration: "5 Weeks",
                lessons: [
                    "Linux Fundamentals",
                    "Docker",
                    "Containerization",
                    "CI/CD Pipelines",
                    "GitHub Actions",
                    "Monitoring",
                    "Logging",
                    "Production Environments",
                    "Vercel Deployment",
                    "AWS Fundamentals"
                ]
            },
            {
                title: "Module 12: AI-Powered Software Engineering",
                duration: "4 Weeks",
                lessons: [
                    "AI Coding Assistants",
                    "Cursor AI",
                    "GitHub Copilot",
                    "Prompt Engineering",
                    "AI Architecture Planning",
                    "AI Testing",
                    "AI Code Reviews",
                    "AI Documentation",
                    "AI Debugging Workflows"
                ]
            },
            {
                title: "Module 13: System Design & Scalability",
                duration: "4 Weeks",
                lessons: [
                    "System Design Fundamentals",
                    "Caching",
                    "Queues",
                    "Microservices",
                    "Scaling Applications",
                    "Rate Limiting",
                    "Load Balancing",
                    "Architecture Patterns"
                ]
            },
            {
                title: "Module 14: Career Readiness",
                duration: "2 Weeks",
                lessons: [
                    "Portfolio Building",
                    "GitHub Optimization",
                    "Technical Interviews",
                    "CV Building",
                    "LinkedIn Optimization",
                    "Freelancing",
                    "Remote Work Preparation"
                ]
            }
        ],
        capstoneProject: {
            title: "Enterprise SaaS Platform",
            description: "Design, build and deploy a complete SaaS platform with authentication, subscriptions, payments, dashboards, notifications, analytics, admin management and AI-powered features."
        },
        courseOutline: "14",
        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "Express",
            "MongoDB",
            "PostgreSQL",
            "Prisma",
            "Redis",
            "Docker",
            "Git",
            "GitHub",
            "AWS",
            "Vercel"
        ],
        courseDuration: "12 Months",
        included: [
            "Intensive 12 Months Practical Training",
            "Frontend Engineering Curriculum",
            "Backend Engineering Curriculum",
            "Database Engineering",
            "System Design Fundamentals",
            "Authentication & Authorization",
            "Payment Gateway Integration",
            "Cloud Deployment",
            "DevOps Fundamentals",
            "AI-Assisted Development Workflows",
            "15+ Real-World Projects",
            "Production SaaS Capstone Project",
            "Internship Opportunity",
            "Technical Interview Preparation",
            "Examination",
            "Professional Certificate",
            "Community Access",
            "Mentor Support",
            "Lifetime Access to Resources"
        ],
        classSchedule: "4 Days / Week",
        classFormat: "2 Hours Daily",
        skillLevel: "Beginner to Advanced",
        jobReadiness: "Prepare for Fullstack Developer, Software Engineer, Product Engineer and Junior-to-Mid Level Engineering roles.",
        salaryOutlook: "Entry-Level Fullstack Developers can work remotely, freelance, join startups, agencies, software companies or build their own products.",
        careerPath: "Fullstack Developer, Software Engineer, Product Engineer, SaaS Developer, Technical Founder",
        portfolioProjects: 15,
        studyMaterials: true,
        internship: true,
        examIncluded: true,
        communityAccess: true,
        mentorSupport: true,
        lifetimeAccess: true,
    },
    {
        level: 5,
        code: "dia",
        title: "Data Intelligence with AI",
        tagline: "Turn data into decisions using AI",
        description: "Master modern data analysis, business intelligence, SQL, Python, dashboards, reporting, and AI-powered analytics workflows to transform raw data into actionable insights.",
        image: "/datascience.png",
        previewVideo: "/data-intelligence-preview.mp4",
        duration: "6 Months",
        price: {
            fullPayment: {
                discounted: "₦250,000",
                original: "₦320,000"
            },
            installment: {
                discounted: "₦285,000",
                original: "₦320,000"
            }
        },
        rating: 4.9,
        students: 150,
        projects: 15,
        certificate: true,
        category: "Data",
        levelLabel: "Beginner to Intermediate",
        color: "#34d399",
        stack: [
            "Excel",
            "SQL",
            "Python",
            "Power BI",
            "Google Sheets",
            "Pandas",
            "NumPy",
            "Data Visualization",
            "Business Intelligence",
            "AI Analytics"
        ],
        aiTouch: [
            "AI data cleaning",
            "AI insights generation",
            "AI dashboard creation",
            "AI reporting assistants",
            "AI data storytelling",
            "AI predictive analytics"
        ],
        stats: [
            {
                label: "Students",
                value: "150+"
            },
            {
                label: "Projects",
                value: "15"
            },
            {
                label: "Duration",
                value: "6 Months"
            },
            {
                label: "Rating",
                value: "4.9"
            }
        ],
        overview: "Learn how organizations use data to make strategic decisions. This program teaches data collection, cleaning, transformation, analysis, visualization, reporting, business intelligence, and AI-enhanced analytics workflows through real-world projects and case studies.",
        outcomes: [
            "Analyze real-world business datasets",
            "Write advanced SQL queries",
            "Clean messy datasets professionally",
            "Create interactive dashboards",
            "Build automated reports",
            "Perform exploratory data analysis",
            "Generate actionable business insights",
            "Use Python for data analysis",
            "Create data visualizations",
            "Use AI to accelerate analysis workflows",
            "Present data-driven recommendations",
            "Build a professional analytics portfolio"
        ],
        curriculum: [
            {
                title: "Module 1: Foundations of Data Intelligence",
                duration: "2 Weeks",
                lessons: [
                    "Introduction to Data",
                    "Data Roles & Career Paths",
                    "Business Intelligence Fundamentals",
                    "Types of Data",
                    "Data Lifecycle",
                    "Data-Driven Decision Making",
                    "Analytics Mindset"
                ]
            },
            {
                title: "Module 2: Spreadsheet Analysis with Excel",
                duration: "4 Weeks",
                lessons: [
                    "Excel Fundamentals",
                    "Data Entry Best Practices",
                    "Formatting & Cleaning Data",
                    "Sorting & Filtering",
                    "Lookup Functions",
                    "Conditional Logic",
                    "Data Validation",
                    "Pivot Tables",
                    "Pivot Charts",
                    "Advanced Excel Functions",
                    "Dashboard Building"
                ]
            },
            {
                title: "Module 3: Data Cleaning & Preparation",
                duration: "3 Weeks",
                lessons: [
                    "Understanding Dirty Data",
                    "Missing Values",
                    "Duplicate Records",
                    "Data Standardization",
                    "Data Transformation",
                    "Data Validation",
                    "Data Quality Assessment",
                    "Preparing Data for Analysis"
                ]
            },
            {
                title: "Module 4: SQL for Data Analysis",
                duration: "5 Weeks",
                lessons: [
                    "Database Fundamentals",
                    "Relational Databases",
                    "SQL Syntax",
                    "SELECT Statements",
                    "Filtering Data",
                    "Sorting Data",
                    "Aggregate Functions",
                    "GROUP BY",
                    "HAVING",
                    "Joins",
                    "Subqueries",
                    "Views",
                    "CTEs",
                    "Window Functions",
                    "Performance Optimization"
                ]
            },
            {
                title: "Module 5: Data Visualization & Storytelling",
                duration: "3 Weeks",
                lessons: [
                    "Principles of Visualization",
                    "Choosing the Right Chart",
                    "Storytelling with Data",
                    "Visual Design Principles",
                    "Interactive Reports",
                    "Presentation Techniques",
                    "Executive Reporting"
                ]
            },
            {
                title: "Module 6: Power BI & Business Intelligence",
                duration: "5 Weeks",
                lessons: [
                    "Power BI Fundamentals",
                    "Data Connections",
                    "Power Query",
                    "Data Modeling",
                    "Relationships",
                    "DAX Fundamentals",
                    "Measures & Calculations",
                    "Interactive Dashboards",
                    "KPI Tracking",
                    "Publishing Reports",
                    "Business Intelligence Workflows"
                ]
            },
            {
                title: "Module 7: Python for Data Analytics",
                duration: "5 Weeks",
                lessons: [
                    "Python Fundamentals",
                    "Variables & Data Types",
                    "Functions",
                    "Working with Files",
                    "Data Structures",
                    "Introduction to Pandas",
                    "DataFrames",
                    "Data Cleaning with Pandas",
                    "Data Transformation",
                    "NumPy Fundamentals",
                    "Exploratory Data Analysis"
                ]
            },
            {
                title: "Module 8: Advanced Analytics",
                duration: "3 Weeks",
                lessons: [
                    "Trend Analysis",
                    "Cohort Analysis",
                    "Customer Analytics",
                    "Revenue Analytics",
                    "Marketing Analytics",
                    "Operational Analytics",
                    "Forecasting Concepts"
                ]
            },
            {
                title: "Module 9: AI-Powered Data Intelligence",
                duration: "4 Weeks",
                lessons: [
                    "Introduction to AI in Analytics",
                    "ChatGPT for Data Analysis",
                    "AI Data Cleaning Workflows",
                    "AI Insight Generation",
                    "AI-Powered Reporting",
                    "AI Dashboard Assistance",
                    "Prompt Engineering for Analysts",
                    "Automating Analysis with AI"
                ]
            },
            {
                title: "Module 10: Data Communication & Business Strategy",
                duration: "2 Weeks",
                lessons: [
                    "Communicating Insights",
                    "Executive Presentations",
                    "Stakeholder Reporting",
                    "Business Recommendations",
                    "Data Ethics",
                    "Decision-Making Frameworks"
                ]
            },
            {
                title: "Module 11: Career Readiness & Portfolio Development",
                duration: "2 Weeks",
                lessons: [
                    "Portfolio Building",
                    "LinkedIn Optimization",
                    "GitHub for Analysts",
                    "Analytics Case Studies",
                    "Interview Preparation",
                    "Technical Assessments",
                    "Freelancing Opportunities"
                ]
            }
        ],
        projectsList: [
            {
                title: "Sales Performance Dashboard",
                description: "Build an executive dashboard showing revenue, growth, and sales KPIs."
            },
            {
                title: "Customer Insights Analysis",
                description: "Analyze customer behavior and identify business opportunities."
            },
            {
                title: "Marketing Campaign Analytics",
                description: "Evaluate campaign performance and optimize marketing strategies."
            },
            {
                title: "Business Intelligence Reporting System",
                description: "Create automated reports and interactive dashboards."
            },
            {
                title: "AI-Powered Analytics Project",
                description: "Use AI tools to automate analysis and generate business recommendations."
            }
        ],
        capstoneProject: {
            title: "Executive Business Intelligence Platform",
            description: "Design and deliver a complete business intelligence solution that integrates SQL, Python, Power BI, and AI-powered insights to help executives make data-driven decisions."
        },
        instructors: [
            {
                name: "Korva Tech Mentor",
                role: "Data Analyst & BI Specialist",
                image: "/mentor-1.png",
                experience: "6+ Years"
            },
            {
                name: "Korva Tech Mentor",
                role: "Data Intelligence Consultant",
                image: "/mentor-3.png",
                experience: "8+ Years"
            }
        ],
        requirements: [
            "Basic computer literacy",
            "Laptop with internet connection",
            "Willingness to work with data",
            "No prior analytics experience required"
        ],
        targetAudience: [
            "Aspiring Data Analysts",
            "Business Professionals",
            "Operations Managers",
            "Marketing Analysts",
            "Students interested in analytics",
            "Career switchers entering data careers"
        ],
        careerPaths: [
            "Data Analyst",
            "Business Intelligence Analyst",
            "Reporting Analyst",
            "Operations Analyst",
            "Marketing Analyst",
            "Junior Data Scientist",
            "Business Analyst",
            "Analytics Consultant"
        ],
        includes: [
            "Live Instructor-Led Classes",
            "15+ Practical Projects",
            "Capstone Project",
            "Power BI Training",
            "SQL Mastery",
            "Python Analytics Training",
            "AI Analytics Workflows",
            "Mentorship Support",
            "Career Guidance",
            "Certificate of Completion",
            "Community Access"
        ],
        faqs: [
            {
                question: "Do I need mathematics experience?",
                answer: "No advanced mathematics is required. The program focuses on practical analytics and business intelligence."
            },
            {
                question: "Will I learn SQL and Python?",
                answer: "Yes. SQL and Python are core components of the curriculum."
            },
            {
                question: "Will I build real dashboards?",
                answer: "Absolutely. Students build multiple dashboards and analytics projects using real-world datasets."
            },
            {
                question: "Can this help me get a data analyst role?",
                answer: "Yes. The curriculum is designed around the skills commonly required for entry-level data analyst and BI analyst positions."
            }
        ],
        courseOutline: "11",
        courseDuration: "6 Months",
        classSchedule: "4 Days / Week",
        classFormat: "2 Hours Daily",
        skillLevel: "Beginner to Intermediate",
        careerPath: "Data Analyst, Business Intelligence Analyst, Reporting Analyst, Data Associate, Business Analyst, Analytics Consultant",
        portfolioProjects: 10,
        studyMaterials: true,
        internship: true,
        examIncluded: true,
        communityAccess: true,
        mentorSupport: true,
        lifetimeAccess: true,
        mentors: ["/mentor-1.png", "/mentor-3.png"]
    }
];
exports.default = courses;
