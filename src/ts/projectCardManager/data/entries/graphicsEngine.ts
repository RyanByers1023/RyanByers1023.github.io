import { ProjectStatus } from '@data/projects';
import type { Project } from '@data/projects';

export const graphicsEngine: Project = {
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
};