export const mockUser = {
  id: 'user-1',
  name: 'Samson Ayodele',
  email: 'samson@korvatechu.com',
  role: 'Student',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samson',
  joinDate: '2024-01-15',
}

export const mockCourses = [
  {
    id: 'course-1',
    title: 'Advanced Systems Architecture',
    description: 'Master scalable web applications, microservices, distributed databases, and cloud infrastructure in the modern African tech ecosystem.',
    instructor: 'Dr. Emma Okonkwo',
    progress: 75,
    status: 'In Progress',
    module: 'Full Stack Development',
    nextLesson: 'API Gateway Patterns',
    currentLesson: 'Microservices Deployment',
    lessons: 42,
    completedLessons: 31,
    image: 'https://api.dicebear.com/7.x/abstract/svg?seed=systems',
  },
  {
    id: 'course-2',
    title: 'Frontend Development with React',
    description: 'Build Modern UIs with React',
    instructor: 'John Doe',
    progress: 60,
    status: 'In Progress',
    module: 'Frontend',
    lessons: 38,
    completedLessons: 22,
  },
  {
    id: 'course-3',
    title: 'Cloud Infrastructure Basics',
    description: 'Get started with AWS and cloud deployment',
    instructor: 'Sarah Chen',
    progress: 45,
    status: 'In Progress',
    module: 'Backend',
    lessons: 30,
    completedLessons: 14,
  },
]

export const mockLiveClasses = [
  {
    id: 'class-1',
    title: 'Frontend Development',
    instructor: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    date: 'Saturday',
    time: '10:00 AM',
    duration: '2 hours',
    status: 'Upcoming',
    description: 'Building Modern UIs with React',
  },
  {
    id: 'class-2',
    title: 'Backend Architecture',
    instructor: {
      name: 'Dr. Emma',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    },
    date: 'Sunday',
    time: '2:00 PM',
    duration: '1.5 hours',
    status: 'Upcoming',
    description: 'Microservices and API Design',
  },
]

export const mockAssignments = [
  {
    id: 'assign-1',
    title: 'Infrastructure as Code Lab',
    status: 'Graded',
    grade: 98,
    maxGrade: 100,
    dueDate: 'Oct 12, 2024',
    course: 'Advanced Systems Architecture',
  },
  {
    id: 'assign-2',
    title: 'Container Orchestration Workshop',
    status: 'Reviewed',
    grade: 92,
    maxGrade: 100,
    dueDate: 'Oct 14, 2024',
    course: 'Advanced Systems Architecture',
  },
  {
    id: 'assign-3',
    title: 'Security Best Practices',
    status: 'Graded',
    grade: 92,
    maxGrade: 100,
    dueDate: 'Oct 06, 2024',
    course: 'Security Fundamentals',
  },
]

export const mockProjects = [
  {
    id: 'proj-1',
    title: 'E-commerce Platform',
    description: 'Build a full-stack e-commerce platform with React, Node.js, and PostgreSQL',
    status: 'In Progress',
    progress: 65,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    deadline: '2024-11-15',
  },
  {
    id: 'proj-2',
    title: 'Real-time Chat Application',
    description: 'Create a real-time chat app with WebSockets',
    status: 'Completed',
    progress: 100,
    technologies: ['React', 'Socket.io', 'Node.js'],
    deadline: '2024-10-01',
  },
  {
    id: 'proj-3',
    title: 'ML Model Deployment',
    description: 'Deploy a machine learning model on cloud infrastructure',
    status: 'Planned',
    progress: 0,
    technologies: ['Python', 'TensorFlow', 'AWS', 'Docker'],
    deadline: '2024-12-01',
  },
]

export const mockCohort = {
  id: 'cohort-1',
  name: 'KTH-2026-JULY',
  track: 'Full Stack Development',
  startDate: '2026-07-01',
  mentor: {
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    expertise: 'Full Stack Architecture',
  },
  members: 24,
  classDays: 'Saturday & Sunday',
}

export const mockCommunity = {
  name: 'WhatsApp Community',
  description: 'Connect. Collaborate. Grow.',
  members: 156,
  announcements: 3,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=community',
}

export const mockMentor = {
  id: 'mentor-1',
  name: 'John Doe',
  title: 'Senior Backend Engineer',
  expertise: ['Full Stack', 'Microservices', 'Cloud Architecture'],
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  availability: 'Available for 1:1 sessions',
}

export const mockCareerProgress = {
  portfolio: 80,
  gitHubProjects: 6,
  linkedinProfile: 'Complete',
  cvUploaded: 'Yes',
  interviewPrep: 'Pending',
}

export const mockCertificates = [
  {
    id: 'cert-1',
    title: 'Full Stack Development',
    status: 'In Progress',
    completed: 14,
    total: 20,
    progress: 70,
  },
  {
    id: 'cert-2',
    title: 'Cloud Infrastructure',
    status: 'In Progress',
    completed: 15,
    total: 20,
    progress: 75,
  },
  {
    id: 'cert-3',
    title: 'DevOps Fundamentals',
    status: 'Not Started',
    completed: 0,
    total: 15,
    progress: 0,
  },
]

export const mockWeeklyProgress = [
  { day: 'Mon', studyTime: 3, lessons: 2, quizzes: 1, xp: 150 },
  { day: 'Tue', studyTime: 4, lessons: 3, quizzes: 2, xp: 220 },
  { day: 'Wed', studyTime: 2, lessons: 1, quizzes: 0, xp: 90 },
  { day: 'Thu', studyTime: 5, lessons: 3, quizzes: 2, xp: 280 },
  { day: 'Fri', studyTime: 3, lessons: 2, quizzes: 1, xp: 160 },
  { day: 'Sat', studyTime: 6, lessons: 4, quizzes: 3, xp: 350 },
  { day: 'Sun', studyTime: 4, lessons: 3, quizzes: 1, xp: 200 },
]

export const mockUserStats = {
  learningStreak: 12,
  careerReadiness: 72,
  totalProgress: 75,
  studyTimeThisWeek: 27,
  lessonsCompleted: 18,
  quizzesCompleted: 12,
  xpEarned: 1250,
}
