import { ProjectStatus } from '@data/projects';
import type { Project } from '@data/projects';

export const xenoContainmentInitiative: Project = {
    id: 'project-card-3',
    title: 'Unity game - Xeno Containment Initiative',
    description: 'Fast paced, solo/co-op destruction and physics-based action rougelite where players must ascend and escape an ever increasingly dangerous underground laboratory with a cavalcade of desperate tools and weapons at their disposal.',
    images: [],

    //project is closed-source, no link
    githubUrl: '',

    details: {
        overview: 'Fast paced rouge-lite involving physics based combat, punchy science experiment gone-wrong weaponry, procedural level generation, and rooms chock full of an incredible array of destructible items.',

        keyFeatures: [
            'Capture aliens with friends, or choose to ascend alone. XCI can be played solo or co-op!',
            'Unique multi-stage capture phase provides an incredibly dynamic gameplay loop.',
            'Players are given access to high-tech RC vehicles in order to scout each floor out for weapons, materials, and the enemy.',
            'Each enemy weakness is given a unique visual and auditory tell, providing attentive players invaluable information prior to engagements.',
            'Hectic pacing - After the initial scouting phase ends, players may be surprised in how quickly situations can devolve to pure chaos...',
            'AI system allows for complex, emergent gameplay that forces the player to hide, move, and fight strategically based on both the enemy strategy and their current surroundings.',
            'You are being studied - Some aliens can be surprisingly responsive to your actions, and thus it is well advised to choose your plan of attack carefully, and take note of how the alien responds...',
            'Upgrade various facets of your character, your RC vehicle, and your weapons using materials obtained from previous escape attempts through a perma-upgrade, and run based upgrade system.',
            'The procedural map generation system strategically creates a unique, but well-designed level on the fly each run.'
        ],

        technicalHighlights: [
            'Dependency injection pattern used within main initialization module for scalability and readability',
            'Each module was developed to be decoupled from the rest of the codebase and initialization logic',
            'In-depth weapon and vehicle system, developed from the ground up, and built for expandability',
            'Codebase is tracked via Git and stored on Github, allowing for both easy remote work, team collaboration and synchronicity, and version tracking'
        ],

        status: ProjectStatus.IN_PROGRESS,

        goals: [
            'Create a game that I would want to play',
            'Develop my skills in interface/API development, package creation, and API usage',
            'Engage in the development of a medium-sized project',
            'Develop my skills using tools such as Unity, Git, and Github in tandem with a small team.',
            'Utilize AI programming tools like Claude Code to increase development speed, and maintain personal knowledge base with regard to new dev tools',
            'Create a game that is hosted on a major distribution platform (Steam, Xbox, PlayStation, etc.)',
            'Add more content to my resume for potential employers to view via Unity package development and sharing though development'
        ],

        challenges: [
            'Game development is more complicated than it seems - there are a multitude of professions that clash in the development of a video game, and truthfully, I do not have all of the expertise required to make all of the correct design decisions and architectural choices that come with modern game development. As a result, sometimes I have to stop development to study new tools and design patterns, or just take a leap of faith and learn as I make mistakes.',
            'Expansive toolset - Beyond requiring the knowledge of an available game engine and corresponding scripting language, game development can require talents that include but are but not limited to: asset creation, texture creation, writing and performing music, creating sound effects, writing dialogue, voice work, digital artistry, and marketing. Of course many elements can be outsourced during development to reduce load, but it generally comes at a cost to obtain quality work.',
            'Collaborating with non-technical team members - Sometimes, not all team members know how to use crucial project management tools such as Git or Node Package Manager. As a result, communication and coordinating tasks with these team members can unfortunately be made more difficult. Additionally, any technical road blocks are reliant on being removed by only the technical team members.',
            'Developing a medium-sized project - This is by far the largest project I\'ve been involved in. Due to this, I have at many times struggled to maintain my personal interest in the project due to the length of development time. This is a personal struggle that was common to all of my previous work, but the scale of this project inflates the problem tenfold.'
        ],

        solutions: [
            'Game development is more complicated than it seems - Outsourcing assets, textures, music, and sound effects allows for my team and I to focus our limited resources towards elements we deem more important to the creation of a fun, unique game: code development, digital art creation, and asset development.',
            'Collaborating with non-technical team members - Pre-planning times to sit down with team members to explain the usage of common tools they will encounter in their role helps to minimize the time loss, confusion, and frustration that comes with any training process.',
            'Developing a medium-sized project - Utilization of time management techniques such as the Pomodoro technique to maximize my effectiveness during development time, along with proper self care and constant team communication allowed me to continue work.',
        ],

        techStack: [
            'Unity: Game engine, provides APIs for C# script creation.',
            'C#: Scripting language used within Unity',
            'Claude Code (mostly Opus 4.x): IDE based AI code assistant',
            'Git/Github: Versioning tools that provide redundancy for the entire codebase, alongside commits, version history, etc.',
        ],

        skillsGained: [
            'Unity: As this is my first time developing a video game, learning crucial game code design patterns like dependency injection, single entry point, and abstraction via interfaces was difficult, but very rewarding in the sense that I feel more capable as a developer after learning them.',
            'C#: I\'ve had exposure to C# previously in college via various projects, but this is the first project that I have used it as my main language, and thus, I have become much more familiar with its syntax, along with the upsides and downsides of its usage.',
            'Claude Code (Opus 4.x): Development with AI has been up and down, with ever increasing token costs and pricing, I still find that sometimes code is better written by hand. Regardless, I\'ve found Claude Opus 4.6-4.8 to be relatively effective at refactoring, documentation, and bug fixing, so it remains a staple dev tool for me, just used modestly.',
            'Git/Github: Further work using Git/Github has allowed me to become very familiar with the system, using it now quickly and with ease',
            'Team collaboration and communication: Development with a team involves friction, opposing ideas, conflicting schedules, etc., but maintaining a positive working relationship, even through disagreements is crucial to maintain steady progress on the project. On top of this, I learned the benefits of letting go of some control of the projects I am involved in whilst in a team environment, because sometimes the best decisions are born from the synthesis of two ideas.'
        ]
    }
};