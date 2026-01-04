/**
 * @file Project data for portfolio website
 * Cards are created at runtime using this data in projectCardGenerator.js
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Project status values
 * @enum {string}
 */
export const ProjectStatus = {
    COMPLETE: 'Complete',
    IN_PROGRESS: 'In Progress',
    INCOMPLETE: 'Incomplete'
};

/**
 * Tailwind color schemes for tech stack badges
 * @enum {string}
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
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * @typedef {Object} TechStack
 * @property {string} name - Technology name
 * @property {string} color - Tailwind CSS classes for badge styling
 */

/**
 * @typedef {Object} ProjectDetails
 * @property {string} overview - Brief overview of the project
 * @property {string[]} keyFeatures - Main features of the project
 * @property {string[]} technicalHighlights - Technical achievements and highlights
 * @property {string} status - Current project status
 * @property {string} [statusNotes] - Additional notes about project status
 * @property {string[]} goals - Project objectives and learning goals
 * @property {string[]} challenges - Challenges faced during development
 * @property {string[]} solutions - Solutions to the challenges
 * @property {string[]} techStackJustifications - Justifications for technology choice
 * @property {string[]} skillsGained - Skills developed during the project
 */

/**
 * @typedef {Object} Project
 * @property {string} id - Unique identifier for the project card
 * @property {string} title - Project title
 * @property {string} description - Short description for card preview
 * @property {string[]} images - Array of image paths for gallery
 * @property {TechStack[]} techStack - Technologies used in the project
 * @property {string} githubUrl - GitHub repository URL
 * @property {ProjectDetails} details - Additonal detailed project information
 */

// ============================================================================
// PROJECT DATA
// ============================================================================

/**
 * Array of portfolio projects
 * @type {Project[]}
 */
export const projectsData = [
    {
        id: 'project-card-1',
        title: 'Vector Graphics Engine',
        description: 'Lightweight 3D model renderer. Users can import models and view them fully shaded in a 3D, perspective-based render',

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
                'Both wireframe and shaded rendering options available'
            ],

            technicalHighlights: [
                'Lightweight and performant rendering engine',
                'Custom shader implementation from scratch',
                'Efficient memory management using modern C++ smart pointers'
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
                'Unfamiliarity - Online resources such as GeeksforGeeks, YouTube, and official documentation provided many easy avenues to learn the previously unfamiliar stack',
                'Working in a team - Clear communication regarding each team member\'s technical, social, and leadership skills allowed for efficient and fair task delegation',
                'Coordination - Kept in constant contact with team throughout project lifecycle via Discord, and delegated tasks using the Scrum system with User Stories',
                'Security - Implemented bcrypt for password hashing and Helmet middleware for HTTP security headers'
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