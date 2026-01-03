//contains all data related to project cards in projects tab, cards are created at runtime using the data stored here
export const projectsData = [
    {
        id: 'project-card-1',
        title: 'Vector Graphics Engine',
        description: 'Lightweight 3-D model renderer. Users can import models and and view them fully shaded in a 3-D, perspective based render',

        images: [
            './img/renderer/rendererDemo.gif'
        ],

        techStack: [
            { name: 'C++', color: 'bg-blue-100 text-indigo-800' },
            { name: 'SDL2', color: 'bg-red-100 text-indigo-800' }
        ],

        githubUrl: 'https://github.com/RyanByers1023/SDL2_3D_Renderer',

        details: {
            overview: 'Custom 3D rendering engine built using C++ and SDL2\'s C API.',

            keyFeatures: [
                'Custom model shader implementation',
                'Accurate perspective based 3-D projection pipeline',
                'Real-time 3D transformations',
                'Both wireframe and shaded rendering options available'
            ],

            technicalHighlights: [
                'Lightweight and performant (x mb total size)'
            ],

            status: [
                'Incomplete',
                'Gourad Shader implementation incomplete as of 12/4/25.'
            ],

            goals: [
                'Gain experience in medium sized-projects',
                'Gain experience in software development',
                'Gain familiarity with project management tools such as Git and package managers like npm',
                'Learn and implement more advanced software design patterns like factory and singleton'
            ],

            challenges: [
                    'Unfamiliarity with graphical libraries such as SDL2',
                    'The pointer refactor - Learning how to effectively and safely refactor code',
                    'Low level memory management via smart (unique_ptr) pointers',
                    'Unfamiliarity with equations and techniques used to create a rendering pipeline'
            ],

            challengesSolutions: [
                    'Memory management refactor - Employ modern memory management strategies as early as possible in development',
                    'Refactor time reduction: More time and effort into the planning stage of the project.'
            ],

            techStackJustifications: [
                'SDL2 - Forms the foundation of the rendering process. Opening and closing windows drawing pixels to the screen, and taking user input from the keyboard are the main functionalities provided by SDL2 that I used for this project'
            ],

            skillsImproved: [
                'Git CLI - Used during production to quickly push/pull changes and switch between my production and in-development branches. Provided ability to undo damaging changes',
                'Project Management - I learned the fundamentals of how to begin, manage, and complete a medium sized project with no guidance',
                'Proficiency in C++ - Given the codebase is 100% C++, I greatly improved my ability to use the language',
                'Programming Pattern usage - Within my graphics pipeline, there are many, many classes that had to be created to handle the immense amount of data being calculated' +
                    'each frame. To more effectively handle this data, I researched various different programming patterns that I later implemented into my program. The patterns I used' +
                    ' within this program are the following: [insert pattern list here]',
                'Discrete structure elements: Standard library containers such as vectors, arrays, unordered maps, and various other containers are used frequently throughout the program in order to make data handling as' +
                    'transparent and easy to understand as possible'
            ],
        }
    },
    {
        id: 'project-card-2',
        title: 'Stock Market Simulator Web Application',
        description: 'Full stack stock market sim web application implementation. Utilizes libraries such as Tailwind',

        images: [
            './img/stockMarketSim/SMSGraphDemo.gif',
            './img/stockMarketSim/SMSHome.gif',
            './img/stockMarketSim/SMSLoginDemo.gif',
            './img/stockMarketSim/SMSAbout.gif'
        ],

        techStack: [
            { name: 'Tailwind CSS', color: 'bg-blue-100 text-indigo-800' },
            { name: 'Node.js', color: 'bg-red-100 text-blue-800' },
            { name: 'Express.js', color: 'bg-red-100 text-red-800' },
            { name: 'MySQL', color: 'bg-red-100 text-orange-800' },
            { name: 'HTML5', color: 'bg-red-100 text-yellow-800' },
            { name: 'JS', color: 'bg-red-100 text-white-800' },
            { name: 'CSS', color: 'bg-red-100 text-black-800' }
        ],
        githubUrl: 'https://github.com/RyanByers1023/Commerce-Bank-Project',

        details: {
            overview: 'Full stack stock market sim web application',

            keyFeatures: [
                'Realtime, persistent, stock market simulation, all running within a web browser',
                'Market information is supplemented with visuals via graphs, tables, and easy to understand icons',
                'Easy to access via Render: automatically launching the web app upon user request',
            ],

            technicalHighlights: [
                'All sensitive user information stored server-side is encrypted',
                'Common HTTP header attacks such as Cross-Site Scripting (XSS) are prevented via Helmet middleware',
                'Custom, secure user profile support, built with Node.js, Express.js, and MySQL Server.',
                'Lightweight database implementation via MySQL, made long term data storage and retrieval possible for the user account system',
                'Express.js provided GET and POST handling, allowing for efficient front-end to back-end access.',
                'Tailwind CSS provided additional styling options to the project, improving its overall feel and look.'
            ],

            status: [
                'Complete'
            ],

            goals: [
                'Provide platform for stock trading information, complete with a sandbox stock market to test simple trading strategies.',
                'Show uneducated traders the potential loss come with stock trading in a risk-free environment',
            ],

            challenges: [
                'Unfamiliarity with tech stack',
                'Working in a team with others that have varying levels of technical skills',
                'Coordinating code repository pushes and pulls between team members',
            ],

            challengesSolutions: [
                'Unfamiliarity: Online resources such as geekforgeeks.com, youtube.com, etc. provided me with many easy avenues to learn the previously unfamiliar stack.',
                'Working in a team: Clear communication regarding each team members technical, social, and leadership skills allowed for me to delegate tasks efficiently and fairly.',
                'Coordination: Kept in constant contact with team throughout project lifecycle via Discord, and delegated tasks using the Scrum system: User Stories.',
            ],

            techStackJustifications: [
                'Tailwind CSS:',
                'Node.js:',
                'Express.js:',
                'MySQL:',
                'HTML5:',
                'JS:',
                'CSS:',
            ],

            skillsImproved: [
                'Interpersonal communication:',
                'Leadership:',
                'Technical Ability',

            ],
        }
    },
];