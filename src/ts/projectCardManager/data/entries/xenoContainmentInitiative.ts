import { ProjectStatus } from '@data/projects';
import type { Project } from '@data/projects';

export const xenoContainmentInitiative: Project = {
    id: 'project-card-3',
    title: 'Unity game - Xeno Containment Initiative',
    description: 'First-person action rouge-lite in which players subdue and contain aliens either co-op or solo. Players are provided the following task by the lab\'s facilitators: study, subdue, and contain all of the hostile alien creatures roaming throughout the various levels of the lab, and you just may earn your freedom.',

    //want the following captures here:
    //

    images: [],

    //project is currently closed-source, no link
    githubUrl: '',

    details: {
        overview: 'Fast paced solo/co-op rouge-lite involving physics based combat, RC cars, punchy sci-fi infused weaponry, reactive AI, procedural level generation, and countless sandboxes chock full of destructible items.',

        keyFeatures: [
            'Capture aliens with friends, or choose to ascend the labs alone. XCI can be played solo or co-op!',
            'Each room is a destruction sandbox. You are authorized by [The Company] to use everything at your disposal to achieve containment.',
            'Unique multi-stage capture phase provides players with an incredibly dynamic gameplay loop.',
            'Players are given access to RC vehicles rigged up with high tech gadgetry to allow for scouting on each floor for weapons, materials, and the alien.',
            'Each alien weakness is given a unique visual and auditory tell, providing attentive players invaluable information prior to engagements.',
            'After the initial scouting phase ends, players may be surprised in how quickly situations can devolve into pure chaos...',
            'AI system allows for complex, emergent gameplay that forces the player to hide, move, and fight strategically based on both the alien\'s unique attack/defense strategy and their current surroundings.',
            'Some aliens can be surprisingly responsive to your actions, thus it is well advised to choose your plan of attack carefully, and take note of how they respond to it...',
            'Upgrade various facets of your character, your RC vehicle, and your weapons using materials obtained from previous escape attempts through a dual upgrade system: perma-upgrades and upgrades that last the duration of the run are in development.',
            'A custom procedural map generation system creates a unique, but smoothly flowing level on the fly for players each and every run.'
        ],

        technicalHighlights: [
            'The Dependency Injection (DI) and Single Entry Point (SEP) design patterns form the shape of the foundation for the main game initialization module. DI allows for better scalability, as new modules can be injected easily into the main game loop with minimal side effects, while the SEP pattern allows for both precise control over all Unity lifecycle method utilizations (implementations of Update(), LateUpdate(), Start(), etc.) and an undivided view of the entire script initialization and frame-to-frame update order.',
            'Each module takes advantage of the SEP design pattern used in initialization module by restricting the usage of Unity lifecycle methods locally. This allows this responsibility to be designated to just one script: GameInitializer(). Each script contains function hooks for each Unity lifecycle method they need to call, GameInitializer() is injected with these scripts, and calls the hooks in the respective lifecycle function.',
            'In-depth weapon, vehicle, and AI systems, all developed from the ground up, and all built with the same core design pillars of modularity and expandability first.',
            'The AI brain uses a goal oriented decision making system in order to make complex strategic decisions that takes into multiple environmental details before choosing an action that benefits it best, and the player the least. Elements that are or were visible to the alien, such as current or predicted player activity, current self status, and even environmental changes, are taken into account when making a decision.',
            'Code repository tracked and stored on a private Github. This gives our proprietary code privacy, while also allowing easy remote work, better team collaboration and synchronicity, and easy version tracking.'
        ],

        status: ProjectStatus.IN_PROGRESS,

        goals: [
            'Create a game that I would want to play.',
            'Develop my skills in interface/API development, package creation, and API usage',
            'Engage in the development of a medium-sized project.',
            'Develop my skills using development tools such as Git in tandem with a small team.',
            'Utilize AI programming tools like Claude Code to increase development speed, and maintain relevancy in the usage of newer development tools.',
            'Create a game that is hosted on a major distribution platform (Steam, Xbox, PlayStation, etc.)',
            'Add more content to my resume for potential employers to view via Unity package development.'
        ],

        challenges: [
            'Game development complexity - there are a multitude of professions that clash in the development of a video game, and truthfully, I do not have all of the expertise required to make all of the correct design decisions and architectural choices that come with modern game development. As a result, sometimes I have to stop development to study new tools and design patterns, or just take a leap of faith and learn as I make mistakes.',
            'Expansive toolset - Beyond requiring the knowledge of an available game engine and corresponding scripting language, game development can require talents that include but are but not limited to: asset creation, texture creation, writing and performing music, creating sound effects, writing dialogue, voice work, digital artistry, and marketing. Of course many elements can be outsourced during development to reduce load, but it generally comes at a cost to obtain quality work.',
            'Collaborating with non-technical team members - Sometimes, not all team members know how to use crucial project management tools such as Git or Node Package Manager. As a result, communication and coordinating tasks with these team members can unfortunately be made more difficult. Additionally, any technical road blocks are reliant on being removed by only the technical team members.',
            'Project size - This is by far the largest project I\'ve been involved in. Due to this, I have at many times struggled to maintain my personal interest in the project due to the length of development time. This is a personal struggle that was common to all of my previous work, but the scale of this project inflates the problem tenfold.'
        ],

        solutions: [
            'Game development complexity - Outsourcing assets, textures, music, and sound effects allows for my team and I to focus our limited resources towards elements we deem more important to the creation of a fun, unique game: code development, digital art creation, and asset development.',
            'Expansive toolset - I found a learn as I go approach worked best in learning many of the software I was unfamiliar with during the initial development stage. Unity is a complex program, but the support base is massive, so info online can be found incredibly easily. This was also the case with many of the packages we utilized such as Cinemachine.',
            'Collaborating with non-technical team members - Pre-planning times to sit down with team members to explain the usage of common tools they will encounter in their role helps to minimize the time loss, confusion, and frustration that comes with any training process.',
            'Project size - Utilization of time management techniques such as the Pomodoro technique to maximize my effectiveness during development time, along with proper self care and constant team communication allowed me to continue work.',
        ],

        techStack: [
            'Unity: Game engine, provides a C# API for script creation via the included MonoBehavior library.',
            'C#: Scripting language used within Unity',
            'Claude Code (mostly Opus 4.x): IDE based AI code assistant',
            'Git/Github: Versioning tools that provide redundancy for the codebase, alongside version history, remote work, etc.',
            'Cinemachine [Package]: Provided the project with a smooth first-person camera controller alongside camera based weapon recoil and a cutscene system.',
            'Kinematic Character Controller [Package]: In-depth character controller system with a relatively simple API. Provides the system that physically moves the character through the game world.',
            'ProBuilder [Package]: Set of primitives and additional controls for the in-engine editor. Provided the project with easy in-engine level prototyping.'
        ],

        skillsGained: [
            'Unity: As this is my first time developing a video game, learning crucial game code design patterns like SEP, and C# interfaces was initially challenging, but very rewarding in the sense that I feel more capable as a developer after learning them.',
            'C#: I\'ve had exposure to C# previously in college via various projects, but this is the first project that I have used it as my main language, and thus, I have become much more familiar with its syntax, along with the upsides and downsides of its usage.',
            'Claude Code (Opus 4.x): Development with AI has been up and down, with ever increasing token costs and pricing, I still find that sometimes code is better written manually. Manually writing code both reduces token spending, and ensures I am knowledgeable about the various systems that run the game. Regardless, I\'ve found Opus 4.6-4.8 to be relatively effective at refactoring, documentation, and bug fixing, so it remains a staple tool for me, used modestly.',
            'Git/Github: Further work using Git/Github has allowed me to become very familiar with the system, using it now quickly and with ease.',
            'Team collaboration and communication: Development with a team involves friction, opposing ideas, conflicting schedules, etc. It is crucial for the sake of progress that these problems are worked through as efficiently as possible by seeking solutions that are mutually beneficial for each team member.'
        ]
    }
};