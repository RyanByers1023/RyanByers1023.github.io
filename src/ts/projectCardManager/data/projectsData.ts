/**
 * @file Project data for portfolio website (ryanbyers1023.github.io)
 * Cards are created at runtime using this data in projectCardGenerator.ts
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Project status values
 */
export enum ProjectStatus {
    COMPLETE = 'Complete',
    IN_PROGRESS = 'In Progress',
    INCOMPLETE = 'Incomplete'
}

/**
 * Tailwind color schemes for tech stack badges
 */
export const TechColors = {
    CPP: 'bg-blue-100 text-indigo-800',
    SDL2: 'bg-red-100 text-indigo-800',
    TAILWIND: 'bg-blue-100 text-indigo-800',
    NODE: 'bg-red-100 text-blue-800',
    EXPRESS: 'bg-red-100 text-red-800',
    MYSQL: 'bg-red-100 text-orange-800',
    HTML: 'bg-red-100 text-yellow-800',
    JS: 'bg-red-100 text-white-800',
    CSS: 'bg-red-100 text-black-800'
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Technology stack item with name and styling
 */
export interface TechStack {
    name: string;
    color: string;
}

/**
 * Detailed project information
 */
export interface ProjectDetails {
    overview: string;
    keyFeatures: string[];
    technicalHighlights: string[];
    status: ProjectStatus;
    statusNotes?: string;
    goals: string[];
    challenges: string[];
    solutions: string[];
    techStack: Record<string, string>;
    skillsGained: string[];
}

/**
 * Portfolio project data structure
 */
export interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    techStack: TechStack[];
    githubUrl: string;
    details: ProjectDetails;
}

// ============================================================================
// PROJECT DATA
// ============================================================================

/**
 * Array of portfolio projects
 */
export const projectsData: Project[] = [
    {
        id: 'project-card-1',
        title: 'Vector Graphics Engine',
        description: 'Lightweight 3D model renderer. Users can import models and view them fully shaded (shader implementation WIP) in a 3D, perspective-based render',

        images: [
            './img/renderer/rendererDemo.gif'
        ],

        techStack: [
            { name: 'C++', color: TechColors.CPP },
            { name: 'SDL2', color: TechColors.SDL2 }
        ],

        githubUrl: 'https://github.com/RyanByers1023/SDL2_3D_Renderer',

        details: {
            overview: 'Custom 3D rendering engine built using C++ and SDL2\'s C API.',

            keyFeatures: [
                'Custom model shader implementation',
                'Accurate perspective-based 3D projection pipeline',
                'Real-time 3D transformations',
                'Both wireframe and shaded rendering options available',
                'Object level screen space culling'
            ],

            technicalHighlights: [
                'Lightweight and performant rendering engine',
                'Contains only modern C++ smart pointers (minus one, as SDL2 requires one)'
            ],

            status: ProjectStatus.INCOMPLETE,
            statusNotes: 'Gouraud Shader implementation incomplete as of 12/4/25.',

            goals: [
                'Gain experience in medium-sized projects',
                'Gain experience in software development',
                'Gain familiarity with project management tools such as Git and package managers',
                'Learn and implement more advanced software design patterns like factory and singleton'
            ],

            challenges: [
                'Unfamiliarity with graphical libraries such as SDL2',
                'The pointer refactor - Learning how to effectively and safely refactor code',
                'Low-level memory management via smart (unique_ptr) pointers',
                'Unfamiliarity with equations and techniques used to create a rendering pipeline'
            ],

            solutions: [
                'Memory management refactor - Employ modern memory management strategies as early as possible in development',
                'Refactor time reduction - More time and effort into the planning stage of the project'
            ],

            techStack: {
                'SDL2': 'Forms the foundation of the rendering process. Opening and closing windows, drawing pixels to the screen, and taking user input from the keyboard are the main functionalities provided by SDL2 that I used for this project',
                'C++': 'Chosen for its performance capabilities and low-level memory control, essential for real-time 3D rendering'
            },

            skillsGained: [
                'Git CLI - Used during production to quickly push/pull changes and switch between production and in-development branches. Provided ability to undo damaging changes',
                'Project Management - Learned the fundamentals of how to begin, manage, and complete a medium-sized project with no guidance',
                'Proficiency in C++ - Given the codebase is 100% C++, greatly improved ability to use the language',
                'Programming Pattern usage - Researched and implemented various design patterns to handle the immense amount of data being calculated each frame',
                'Data structure proficiency - Standard library containers such as vectors, arrays, unordered maps, and various other containers are used frequently throughout the program to make data handling transparent and easy to understand'
            ]
        }
    },

    {
        id: 'project-card-2',
        title: 'Stock Market Simulator Web Application',
        description: 'Full-stack stock market simulation web application. Features real-time trading, persistent user accounts, and interactive market visualization',

        images: [
            './img/stockMarketSim/SMSGraphDemo.gif',
            './img/stockMarketSim/SMSHome.gif',
            './img/stockMarketSim/SMSLoginDemo.gif',
            './img/stockMarketSim/SMSAbout.gif'
        ],

        techStack: [
            { name: 'Tailwind CSS', color: TechColors.TAILWIND },
            { name: 'Node.js', color: TechColors.NODE },
            { name: 'Express.js', color: TechColors.EXPRESS },
            { name: 'MySQL', color: TechColors.MYSQL },
            { name: 'HTML5', color: TechColors.HTML },
            { name: 'JavaScript', color: TechColors.JS },
            { name: 'CSS', color: TechColors.CSS }
        ],

        githubUrl: 'https://github.com/RyanByers1023/Commerce-Bank-Project',

        details: {
            overview: 'Full-stack stock market simulation web application providing a risk-free environment for learning trading strategies with real-time market simulation and persistent user accounts.',

            keyFeatures: [
                'Real-time, persistent stock market simulation, all running within a web browser',
                'Market information supplemented with visuals via graphs, tables, and easy-to-understand icons',
                'Easy to access via Render - automatically launching the web app upon user request',
                'Secure user authentication and profile management'
            ],

            technicalHighlights: [
                'All sensitive user information stored server-side is encrypted',
                'Common HTTP header attacks such as Cross-Site Scripting (XSS) are prevented via Helmet middleware',
                'Custom, secure user profile support, built with Node.js, Express.js, and MySQL Server',
                'Lightweight database implementation via MySQL, made long-term data storage and retrieval possible for the user account system',
                'Express.js provided GET and POST handling, allowing for efficient front-end to back-end communication',
                'Tailwind CSS provided modern styling framework to improve overall feel and user experience'
            ],

            status: ProjectStatus.COMPLETE,

            goals: [
                'Provide platform for stock trading information, complete with a sandbox stock market to test simple trading strategies',
                'Show uneducated traders the potential losses that come with stock trading in a risk-free environment',
                'Build full-stack development skills across the entire web application stack'
            ],

            challenges: [
                'Unfamiliarity with the full technology stack (Node.js, Express.js, MySQL)',
                'Working in a team with others who have varying levels of technical skills',
                'Coordinating code repository pushes and pulls between team members',
                'Implementing secure authentication without compromising user experience'
            ],

            solutions: [
                'Unfamiliarity - Online programming resources, we found, were abundant. These came in the form of official documentation, resources from StackExchange, Youtube tutorials for the various frameworks and libraries we chose,' +
                'and sometimes, we found that even website like Reddit could hold the solution to a problem we had been butting out heads against the wall for. Additionally, our excellent team communication allowed' +
                'us to help each other solve problems in real-time, irrespective of our pre-scheduled meet times. This allowed for each of us to leverage our individual strengths efficiently towards progressing the project\'s goals.',
                'Working in a team - Clear communication regarding each team member\'s technical, social, and leadership skills allowed for efficient and fair task delegation. Each team member detailed their availability clearly and plainly' +
                'during the initial planning stages of the project, allowing for us to designate meet times that accommodated us all best.',
                'Coordination - Constant contact with team maintained throughout project lifecycle via Discord, and tasks were evenly delegated via user stories that were tracked on team-management platform called Jira.' +
                'Each story was scored based upon the estimated amount of work before each Sprint occurred, and each team member was allowed to chose their own tasks. This system, while sometimes feeling a bit cumbersome' +
                'given our small team size of 4 members, allowed for us to keep work load even and fair, keep a tight schedule, and ensure each team member was doing their part to push the project forward.',
                'Security - Implemented bcrypt for password hashing and Helmet middleware for HTTP security headers. Pre-written SQL statements prevent SQL injection attacks via front-end text input fields.'
            ],

            techStack: {
                'Tailwind CSS': 'Provided utility-first CSS framework for rapid UI development with consistent design system',
                'Node.js': 'Server-side JavaScript runtime enabling full-stack JavaScript development',
                'Express.js': 'Minimal and flexible web application framework providing robust routing and middleware support',
                'MySQL': 'Relational database for persistent storage of user accounts, portfolios, and transaction history',
                'HTML5': 'Semantic markup for accessible and well-structured web pages',
                'JavaScript': 'Client-side scripting for interactive UI elements and real-time market updates',
                'CSS': 'Custom styling to complement Tailwind and create unique visual elements'
            },

            skillsGained: [
                'Interpersonal communication - Coordinating with team members across different skill levels and roles',
                'Leadership - Managing project timeline, delegating tasks, and ensuring team cohesion',
                'Technical Ability - Full-stack development across front-end, back-end, and database layers',
                'Security Best Practices - Implementing authentication, encryption, and protection against common web vulnerabilities',
                'Team-based Git workflow - Managing branches, resolving merge conflicts, and coordinating releases'
            ]
        }
    }
];