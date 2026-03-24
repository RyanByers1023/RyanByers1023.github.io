import { ProjectStatus } from '@data/projects';
import type { Project } from '@data/projects';

// ============================================================================
// PROJECT DATA
// ============================================================================

/** Array of portfolio projects */
export const projectsData: Project[] = [
    {
        id: 'project-card-1',
        title: 'Vector-Based Graphics Engine',
        description: 'Lightweight SDL2 based 3D model renderer built from the ground up. Users can view a basic 3D perspective-based render',

        images: [
            './img/renderer/rendererDemo.gif'
        ],

        githubUrl: 'https://github.com/RyanByers1023/SDL2_3D_Renderer',

        details: {
            overview: 'Custom 3D rendering engine built using C++ and SDL2\'s C API.',

            keyFeatures: [
                'Accurate perspective-based 3D projection pipeline',
                'Real-time 3D transformations via keyboard controls',
                'Both wireframe and shaded rendering options available'
            ],

            technicalHighlights: [
                'Rendering pipeline built entirely from scratch',
                'Efficient, safe memory management using C++ smart pointers',
                'SDL2 provides keyboard controls, basic window management, and file input/output'
            ],

            status: ProjectStatus.INCOMPLETE,
            statusNotes: 'Goraud Shader, and model import implementations in development',

            goals: [
                'Gain experience in working with medium-sized software development projects',
                'Obtain knowledge with regard to the proper usage of APIs.',
                'Learn and utilize project management tools such as Git more efficiently',
                'Improve confidence and skill in using C++,',
                'Establish familiarity with low level software development via construction of my rendering pipeline',
                'Learn and implement various powerful design patterns. Factory, singleton, and subscriber and publisher patterns are among those implemented.'
            ],

            challenges: [
                'Unfamiliarity with the SDL2 library',
                'Unfamiliarity with the efficient use of APIs',
                'Unfamiliarity with efficient use of repository management systems like Git',
                'Unfamiliarity with the benefits of utilizing C++ smart pointers over raw pointers',
                'Unfamiliarity with formulas and techniques used to create a rendering pipeline',
                'Management of a relatively large codebase',
                'Adherence to modern programming practices (atomic commits, proper and consistent code commenting, adherence to the single responsibility principle for functions, etc.)'
            ],

            solutions: [
                'Unfamiliarity with SDL2 - Official SDL2 documentation, W3schools.com, StackExchange.com, Reddit, Geeksforgeeks, and sometimes even Anthropic\'s Claude AI provided great information that helped me in developing this program with SDL2.',
                'Unfamiliarity with APIs - SDL2\'s C API was my first introduction in using libraries. Trial and error, along with the previously mentioned resources helped me along in learning and eventually becoming more comfortable with this concept.',
                'Unfamiliarity with repo management systems - Github documentation, online resources like geeksforgeeks.com, and AI aided me in enhancing my knowledge of the Git CLI and eventually, how to properly leverage Github for my project.',
                'Unfamiliarity with smart pointers - Utilizing unique smart pointers over raw pointers I found was not only safer, (prevents memory leaks and hanging pointers) but it also made variable ownership more clear, enhancing both the readability and modularity of almost all of my functions.',
                'Management of a large codebase - More time and effort into the planning stage of the project. I learned that refactoring is a natural part of the process in developing any software, but this project required more than I felt was typically necessary. This indicated to me that I needed to devote more time into the planning stage, and less into the implementation stage.',
                'Adherence to modern standards - Performed research online via other\'s codebases, various online forums and previously mentioned online resources.'
            ],

            techStack: [
                'SDL2: Forms the foundation of the program. Controlling windows, drawing pixels to the screen, and taking user input from both the keyboard and via files encompasses the functionalities provided by SDL2 for this project',
                'C++: Due to my previous experience with this language in college, I felt most comfortable working with it when compared to other languages. Beyond this, it was chosen due to C++\'s emphasis on high performance and ease of use relative to other, higher level languages. It\'s low overhead with regard to memory management was also something I felt would be important in a real-time 3D rendering application.',
                'Github + Git CLI: Used for remote development, project version control, branch management, and merge conflict resolution.'
            ],

            skillsGained: [
                'Git CLI - Learned during how to quickly push/pull/rollback changes to a repository in a safe, non-destructive manner. Learned how to create and switch between production and in-development branches on the fly, and even work on the project remotely.',
                'Project Management - Learned the fundamentals of how to begin, manage, and complete a medium-sized project with 0 guidance',
                'Proficiency in C++ - Through this project and my previous usage, I\'ve been allowed to become well acquainted with its rules, and it\'s standard (referred to as std. in language) library.',
                'Programming Pattern usage - Researched and implemented various, previously detailed design patterns to handle the immense amount of data that has the potential to be calculated in each frame.',
                'Data structure proficiency - Vectors, arrays, unordered maps, and various other common data containers are used frequently throughout the program.'
            ]
        }
    },

    {
        id: 'project-card-2',
        title: 'Portfolio Website',
        description: 'A simple, clean, portfolio designed to convey my experience as a developer in the most efficient way I can.',

        images: [],

        githubUrl: 'https://github.com/RyanByers1023/RyanByers1023.github.io',

        details: {
            overview: 'A simple, clean, portfolio designed to convey my experience as a developer in the most efficient way I can.',

            keyFeatures: [
                'Custom project card system.',
                'Lazy loader router architecture.',
                'Simple, clean, uncluttered page layout.',
            ],

            technicalHighlights: [
                'Card system built using a dependency injection architecture to enable easy future feature additions and removals.',
                'Card state machine establishes a clear, universal point of truth for both checking and updating project card state related attributes.',
                'Card system allows for as many projects to be displayed as the user wants.',
                'Clean, seamless animations built via CSS for performance, and cross compatibility.',
                'Fully modularized, simple system that can be repurposed and reworked with ease.',
                'Custom lazy loader router architecture allows for near instant load times between different pages.',
            ],

            status: ProjectStatus.COMPLETE,

            goals: [
                'To build a user interface for a portfolio that conveys information as efficiently and cleanly as possible.',
                'To aid in my search for a job in the industry.',
                'To display my front end capabilities to potential employers.',
                'To become more well acquainted with HTML, CSS, Typescript, and Tailwind CSS.',
                'To familiarize myself with commonly used frameworks, libraries, middleware, and runtimes within the web development sphere.'
            ],

            challenges: [
                'Initial unfamiliarity with some of the technology stack.',
                'Working to build the website alone, on my own schedule.',
                'Implementing interesting visual features without compromising the simplicity or usability of the site.',
                'Maintaining a codebase that stays in line with modern programming principles like SRP.',
                'Working with artificial intelligence tools for code development, while maintaining a clean, readable, and modularized codebase.',
            ],

            solutions: [
                'Unfamiliarity with tech stack - Resources from sites like StackExchange, Youtube tutorials, and Anthropic\'s Claude AI provided me ample help in getting things up and running',
                'Solo work - Adapting to a routine of working on the project every day, as well as utilizing the Pomodoro Technique helped to increase my productivity and motivation from day to day',
                'Maintaining usability - Careful consideration and rigorous testing regarding the various buttons, scrollbars, and other interactive elements aided in revealing areas that needed to feel more seamless',
                'Building code with modern principles in mind - Research conducted on Github to see what other, respected developers\' code looks like.',
                'Working with AI - Establishing clear guidelines with regard to expectations in code quality, and familiarizing myself with AI integrated tools such as the Claude Code IDE extension'
            ],

            techStack: [
                'HTML5: Semantic markup for web pages, defines the structural elements of the page/',
                'Typescript: Javascript with types. Enhances readability of the codebase while allowing client-side scripting for interactive UI elements',
                'CSS: Custom styling to complement Tailwind and create unique visual elements.',
                'Tailwind CSS: Lightweight, utility-first CSS framework.',
                'Node.js: Server-side JavaScript runtime enabling full-stack JavaScript development, also comes bundled with Node Package Manager (npm), which allows for easier package importing.',
                'Vite: Build tool that provided a lightning fast development server for testing, and a more performant Javascript build tool than that of Next.JS.',
            ],

            skillsGained: [
                'Typescript: Greatly enhanced the readability of my front end scripts, and with it I found myself working faster and developing cleaner, easier to understand functions.',
                'Tailwind CSS: Allows me to quickly build simple, fast, and stylish customer facing UIs.',
                'Node.js: Npm allows for me to import packages into any project quickly and easily. Also, Node.js experience allows for me to easily develop full-stack systems.',
                'Vite: Prototyping and testing is much easier, as I can make changes to the codebase and see them reflected in real time in a browser environment.',
            ]
        }
    }
];