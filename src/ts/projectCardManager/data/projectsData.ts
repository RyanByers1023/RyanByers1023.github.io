import { ProjectStatus, TechColors, TechStack, ProjectDetails, Project } from '@projectCardManager/data/projects';

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
                'Gain experience from top to bottom for medium-sized software development projects',
                'Learn and use project management tools such as Git and Node Package Manager (npm).',
                'Improve confidence in C++, an incredibly important language for software development due to its ubiquity in the space.',
                'Establish familiarity with low level project work, and learn what exactly this part of software development generally entails.',
                'Implement software design patterns I learned during my time in college. e.g. factory, singleton, subscriber and publisher, etc.'
            ],

            challenges: [
                'Unfamiliarity with low-level graphical libraries such as SDL2',
                'Unfamiliarity with programming APIs',
                'Unfamiliarity with modern programming standards and techniques',
                'Unfamiliarity with repository management systems like Git/Github',
                'Learning how to effectively and safely refactor code via an extensive memory management refactor relating to pointers',
                'Unfamiliarity with equations and techniques used to create a rendering pipeline'
            ],

            solutions: [
                'Unfamiliarity w/ SDL2 - Official SDL2 documentation, W3schools.com, StackExchange.com, Reddit, Geeksforgeeks, and sometimes even AI provided great information that helped me in developing this program withe SDL2.',
                'Unfamiliarity w/ APIs - SDL2\'s C API was my main introduction to using code that I did not develop in my programs. Truely, a lot of trial and error, along with the previously mentioned resources helped me along in learning and eventually becoming more comfortable with this concept.',
                'Unfamiliarity with standards - Researched Git Commit standards (atomic commits) and industry/community standard for comments with the goal of reaching high readability for my codebase, while maintaining JSDoc functionality. Additonally, research regarding industry standard module desgin was conducted to improve the quality/exandability of the codebase.',
                'Unfamiliarity with repo management systems - Trial and error, Reddit, Github documentation, and even AI aided me in learning Git CLI and eventually, how to properly leverage Github.',
                'Refactoring pointers - Employing modern memory management strategies as early as possible in development to avoid the need for a large, arduous refactor later in the project\'s life.',
                'Refactoring time reduction - More time and effort into the planning stage of the project. Refactoring is always necessary, but this project required more than I felt was typical, indicating I need to devote more project time to planning.'
            ],

            techStack: {
                'SDL2': 'Forms the core of the rendering process. Opening and closing windows, drawing pixels to the screen, and taking user input from the keyboard are the main functionalities provided by SDL2 that I used for this project',
                'C++': 'Chosen for its performance capabilities and low-level memory control, essential for real-time 3D rendering',
                'Github + Git CLI': 'Used for remote development, project version control, branch management, and merge conflict resolution.'
            },

            skillsGained: [
                'Git CLI - Learned during production how to quickly push/pull/undo changes to a repository in a safe manner. Learned how to create and switch between production and in-development branches on the fly and even work on the project remotely.',
                'Project Management - Learned the fundamentals of how to begin, manage, and complete a medium-sized project with no guidance',
                'Proficiency in C++ - Through this project, C++ has become my favorite language, and the constant exposure to it during development, refactors, and eventually production allowed me to aquiant myself well with its rules, resoruces (std library), and intricasies.',
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
            '@imgs/stockMarketSim/SMSGraphDemo.gif',
            '@imgs/stockMarketSim/SMSHome.gif',
            '@imgs/stockMarketSim/SMSLoginDemo.gif',
            '@imgs/stockMarketSim/SMSAbout.gif'
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