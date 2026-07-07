import { ProjectStatus } from '@data/projects';
import type { Project } from '@data/projects';

export const portfolioWebsite: Project = {
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
};