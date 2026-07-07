import { ProjectStatus } from '@data/projects';
import type { Project } from '@data/projects';

export const portfolioWebsite: Project = {
    id: 'project-card-2',
    title: 'Portfolio Website',
    description: 'A simple, clean, portfolio designed to convey my experience as a developer in the most efficient way I can.',

    images: [],

    githubUrl: 'https://github.com/RyanByers1023/RyanByers1023.github.io',

    details: {
        overview: 'A simple portfolio website designed to allow me to easily display my work as a developer.',

        keyFeatures: [
            'Custom project card system.',
            'Lazy loader router architecture.',
            'Custom reactive UI elements',
        ],

        technicalHighlights: [
            'Card system built using a dependency injection architecture to enable easy future feature additions and removals.',
            'Custom lazy loader router architecture allows for near instant load times between different pages.',
            'Card system utilizes a state machine for establishment of a universal point of truth for [what does this SM provide access to?].',
        ],

        status: ProjectStatus.COMPLETE,

        goals: [
            'Build a user interface for a portfolio that conveys information as efficiently, cleanly, and quickly as possible.',
            'Display my front end capabilities to potential employers.',
            'Become more well acquainted with HTML, Tailwind CSS, Typescript.',
            'Familiarize myself with commonly used frameworks, libraries, middleware, and runtimes used in web development.'
        ],

        challenges: [
            'Unfamiliarity with some of the technology stack.',
            'Building the website alone.',
            'Implementing interesting visual features without compromising usability.'
        ],

        solutions: [
            'Unfamiliarity with the tech stack - Resources from sites like StackExchange, Youtube tutorials, and Anthropic\'s Claude AI provided me ample help in getting things up and running.',
            'Working alone - Adapting to a routine of working on the project every day, as well as utilizing the Pomodoro Technique helped to increase my productivity and motivation from day to day.',
            'Maintaining usability - Maintaining restraint regarding design and color choices, while also performing tests on the various buttons, scrollbars, and any other interactive elements aided in revealing areas that needed any adjustment.'
        ],

        techStack: [
            'HTML5: Semantic markup for web pages, defines the structural elements of the page.',
            'Typescript: Javascript with types. Enhances readability of the codebase while allowing client-side scripting for interactive UI elements.',
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