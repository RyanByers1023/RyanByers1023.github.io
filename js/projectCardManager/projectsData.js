export const projectsData = [
    {
        id: 'project-card-1',
        title: 'Vector Graphics Engine',
        description: 'Lightweight 3-D model renderer. Users can import models and and view them fully shaded in a 3-D, perspective based render',
        images: ['./img/rendererDemo.gif'],
        techStack: [
            { name: 'C++', color: 'bg-blue-100 text-indigo-800' },
            { name: 'SDL2', color: 'bg-red-100 text-indigo-800' }
        ],
        githubUrl: 'https://github.com/RyanByers1023/SDL2_3D_Renderer',
        details: {
            overview: 'Custom 3D rendering engine built using C++ alongside SDL2\'s C API.',
            keyFeatures: [
                'Custom model shader implementation',
                'Accurate perspective based 3-D projection pipeline',
                'Real-time 3D transformations',
                'Both wireframe and shaded rendering options available'
            ],
            technicalHighlights: [
                'Lightweight and performant (x mb total size)',
            ],
            status: 'Gourad Shader implementation incomplete as of 12/4/25.',
            goals: ['Gain experience in medium sized-projects', 'Gain experience in software development', 'Gain familiarity with modern programming tools such as Git, package managers, and IDEs', 'Learn and employ modern coding strategies', 'Learn and implement software design patters such as factory and singleton'],
            challenges: ['Unfamiliarity with graphical libraries such as SDL2, and handing memory management in a medium sized project'],
            techStackJustifications: [],
            skillsImproved:
                ['Git CLI - Used during production to quickly push/pull changes and switch between my production and in-development branches. Provided ability to undo damaging changes'],
        }
    },
    {
        id: 'project-card-2',
        title: 'Full Stack Web Application',
        description: 'Stock Market Simulator (WIP) - Full stack web application with custom-built user account system utilizing MySQL database integration via Node.js.',
        images: [
            './img/SMS.png',
            './img/SMS-dashboard.png',
            './img/SMS-login.png',
            './img/SMS-portfolio.png'
        ],
        techStack: [
            { name: 'HTML', color: 'bg-orange-100 text-orange-800' },
            { name: 'Tailwind CSS', color: 'bg-blue-100 text-blue-800' },
            { name: 'JavaScript', color: 'bg-yellow-100 text-yellow-800' },
            { name: 'Node.js', color: 'bg-green-100 text-green-800' },
            { name: 'Java', color: 'bg-red-100 text-red-800' },
            { name: 'MySQL', color: 'bg-emerald-100 text-emerald-800' }
        ],
        githubUrl: 'https://github.com/RyanByers1023/Commerce-Bank-Project',
        details: {
            overview: 'A comprehensive full-stack web application designed to simulate stock market trading. This project demonstrates advanced database management, user authentication, and real-time data handling capabilities.',
            keyFeatures: [
                'Custom user authentication system with bcrypt encryption',
                'Real-time stock market simulation',
                'MySQL database integration for user data persistence',
                'Responsive design with Tailwind CSS',
                'RESTful API built with Node.js and Express'
            ],
            technicalHighlights: [
                'Secure session management',
                'MVC architecture pattern',
                'CRUD operations for portfolio management',
                'Input validation and sanitization'
            ],
            status: 'Currently in active development. Future updates will include advanced charting, market analytics, and social trading features.'
        }
    },
    // Add more projects here...
];