// ===== EDIT YOUR CONTENT HERE =====
export const site = {
  first: "MISS",
  last: "RIDEEKA",
  status: "Available for new projects",
  email: "rideeka2@gmail.com",
  whatsapp: "94763284771", 
  github: "https://github.com/jkarsandeepani",
  linkedin: "https://www.linkedin.com/in/rideeka-wijegunasekara-151b56330/",
  instagram: "https://www.instagram.com/rideeka_?srtk=MWFwbHM2MDVpcm42NA==",
  whatIDo: [
    "Aspiring Business Analyst",
    "Software Developer",
    "MIS Undergraduate",
    "Bridging business and technology",
  ],
};

// status: "done" (dark red) | "progress" (blue) | "req" (yellow)
// To add a project, copy one block and paste it at the end.
export const projects = [
{ name: "MARIDIAN'26", status: "done", type: "Digital development", desc: "Developed the MARIDIAN'26 event website for AIESEC in NSBM, featuring registration workflows, online shop,admin dashboards, and Firebase integration.", tech: ["HTML", "CSS", "JS"], demo: "https://maridian26.vercel.app/" },
  { name: "PORTFOLIO", status: "done", type: "Digital development", desc: "Responsive one-page site showcasing my projects, services and tech stack.", tech: ["Next.js", "React", "TTailwind CSS"], demo: "#" },
  //{ name: "STUDIO OS", status: "progress", type: "Digital development", desc: "Describe this project in one or two lines.", tech: ["Next.js", "Tailwind", "Firebase"], demo: "" },
  //{ name: "Library Management System", status: "req", type: "Digital development", desc: "Describe this project in one or two lines.", tech: ["Figma", "Jira"], demo: "" },
];

// learning: true shows a "Learning" tag
export const services = [
  { name: "Business Analysis", use: "Turning business needs into clear requirements.", how: "I talk to stakeholders, write requirements and user stories, and track them to delivery.", tools: "Jira" },
  { name: "System Analysis and Design", use: "Planning how a system should work before it is built.", how: "I model processes, data and users with diagrams, then design the system structure.", tools: "draw.io" },
  { name: "UI/UX Design", use: "Designing clear, easy-to-use screens for websites and apps.", how: "I sketch the user flow, build wireframes and prototypes, then refine them with feedback.", tools: "Figma" },
  { name: "Frontend Development", use: "Building responsive websites that work on any device.", how: "I turn designs into reusable components and test them on phone, tablet and desktop.", tools: "React, Next.js, Tailwind CSS" },
  { name: "Backend Development", use: "Building the server side: APIs, logic and data handling.", how: "I design endpoints, connect them to a database and secure them.", tools: "Spring Boot, Java" },
  //{ name: "Mobile Development", learning: true, use: "Building apps for phones. I am still learning this.", how: "I follow courses and build small practice apps.", tools: "Currently exploring" },
  { name: "Database Design", learning: true, use: "Organising data so it is fast and consistent. I am still learning this.", how: "I practise designing tables, relationships and queries.", tools: "MySQL, Firebase" },
  //{ name: "Software Testing", learning: true, use: "Finding bugs before users do. I am still learning this.", how: "I practise writing test cases and testing my own projects.", tools: "Manual testing" },
];

export const toolkit = [
  { group: "Languages", items: [
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  ]},
  { group: "Frameworks", items: [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    //{ name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  ]},
  { group: "Tools", items: [
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    //{ name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Jira", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
    //{ name: "draw.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/drawio/drawio-original.svg" },
  ]},
];