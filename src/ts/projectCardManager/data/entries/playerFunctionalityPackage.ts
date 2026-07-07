import { ProjectStatus } from '@data/projects';
import type { Project } from '@data/projects';

export const playerFunctionalityPackage: Project = {
    id: 'project-card-4',
    title: 'Unity Package - Player Functionality',
    description: 'Simple player functionality package that adds multiple useful, easy to intergrate, abilities for a character controller.',

    images: [],

    githubUrl: 'https://github.com/RyanByers1023/x',

    details: {
        overview: 'Easy to integrate unity package that supplies the user with several player character ability methods',

        keyFeatures: [

        ],

        technicalHighlights: [
            'Does not touch Unity lifecycle methods, user has complete control',
            'Desgined to easily hook into an existing game loop',
            'Provided API gives users easy access to main functionality',
            'Fully set-up player prefab included (if chosen while importing)',
        ],

        status: ProjectStatus.COMPLETE,

        goals: [
            'Provide scalability to my main project (Xeno Containment Initiative) by forcing modularity via package creation',
            'Reduce workload for additional projects that require the same functionality',
            'Provide community with boilerplate player functionality free of charge',
            'Show potential employers my understanding of APIs, packages, and code to application integration'
        ],

        challenges: [

        ],

        solutions: [

        ],

        techStack: [
            'Unity: Game engine, provides APIs for C# script creation.',
            'C#: Scripting language used within Unity',
            'Claude Code (mostly Opus 4.x): IDE based AI code assistant',
            'Git/Github: Versioning tools that provide redundancy for the entire codebase, alongside commits, version history, etc.',
        ],

        skillsGained: [
            'Unity: ',
            'C#: ',
            'Claude Code (mostly Opus 4.x): ',
            'Git/Github: ',
        ]
    }
};