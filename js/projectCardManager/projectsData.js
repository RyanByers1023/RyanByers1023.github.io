//contains all data related to project cards in projects tab, cards are created at runtime using the data stored here
export const projectsData = [
    {
        id: 'project-card-1',
        title: 'Vector Graphics Engine',
        description: 'Lightweight 3-D model renderer. Users can import models and and view them fully shaded in a 3-D, perspective based render',

        images: [
            './img/rendererDemo.gif'
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
                'Git CLI - Used during production to quickly push/pull changes and switch between my production and in-development branches. Provided ability to undo damaging changes'
            ],
        }
    },
    {
        id: 'project-card-2',
        title: 'x',
        description: 'x',

        images: [
        './img/rendererDemo.gif'
        ],

        techStack: [
        { name: 'x', color: 'bg-blue-100 text-indigo-800' },
        { name: 'x', color: 'bg-red-100 text-indigo-800' }
        ],

        githubUrl: 'x',

        details: {
            overview: 'x',

            keyFeatures: [
                'x',
                'x',
                'x',
            ],

            technicalHighlights: [
                'x'
            ],

            status: [
                'x'
            ],

            goals: [
                'x',
                'x',
                'x',
            ],

            challenges: [
                'x',
                'x',
                'x',
            ],

            challengesSolutions: [
                'x',
                'x',
                'x',
            ],

            techStackJustifications: [
                'x'
            ],

            skillsImproved: [
                'x'
            ],
        }
    },
    // Add more projects here...
];