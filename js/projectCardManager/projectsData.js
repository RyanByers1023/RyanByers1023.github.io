export const projectsData = [
    {
        id: 'project-card-1',
        title: 'Vector Graphics Engine',
        description: '3D vector graphics engine made using C++ and the C programming API for SDL2 (Simple DirectMedia Layer 2) library.',
        images: ['./img/rendererDemo.gif'],
        techStack: [
            { name: 'C++', color: 'bg-purple-100 text-indigo-800' },
            { name: 'SDL2', color: 'bg-purple-100 text-indigo-800' }
        ],
        githubUrl: 'https://github.com/RyanByers1023/SDL2_3D_Renderer',
        details: {
            overview: 'A custom 3D rendering engine built from scratch using C++ and SDL2.',
            keyFeatures: [
                'Custom vector mathematics library',
                'Real-time 3D transformations',
                'Wireframe and solid rendering modes',
                'Camera controls and perspective projection'
            ],
            technicalHighlights: [
                'Optimized rendering pipeline',
                'Matrix transformations',
                'Z-buffer implementation'
            ],
            status: 'Completed project demonstrating graphics programming fundamentals.'
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