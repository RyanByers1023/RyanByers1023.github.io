import { ProjectStatus } from '@data/projects';
import type { Project } from '@data/projects';

export const playerFunctionalityPackage: Project = {
    id: 'project-card-4',
    title: 'Unity Package - Player Functionality',
    description: 'Player functionality package that adds useful, easy to integrate, abilities for a player character system.',

    //want the following captures here:
    //zoom in on health bar going up when a pickup is obtained
    //ak firing, zoom in on ammo counter
    //fire ak, drop ak, pick up ak (display ammo counter continuity)
    //zoom in on swapping through hotbar and holding various different items that are shown to be stored in the player inventory
    //zoom in on inspector showing all the bindings in the input hub
    //display of detection sphere gizmo activating/deactivating for interaction system

    images: [],

    githubUrl: 'https://github.com/RyanByers1023/Player-Functionality',

    details: {
        overview: 'Easy to integrate unity package that supplies the user with several basic player character abilities.',

        keyFeatures: [
            'Health management',
            'Ammo inventory',
            'Interaction system',
            'Event-based input dispatching',
            'Hotbar system'
        ],

        technicalHighlights: [
            'Does not touch Unity lifecycle methods, user has complete control over initialization',
            'Provided API gives users easy access to main functionality',
            'Fully prepared player prefab included (must be selected while importing)',
            'Custom prefabs can be easily configured via the creation of the custom PlayerLoadout and PlayerTuning Scriptable Objects.'
        ],

        status: ProjectStatus.COMPLETE,

        goals: [
            'Provide scalability to my main project (Xeno Containment Initiative) by forcing modularity via package creation',
            'Reduce workload for additional projects that require the same functionality',
            'Provide community with boilerplate player functionality free of charge',
            'Show potential employers my understanding of APIs, packages, and code to application integration'
        ],

        challenges: [
            'Unfamiliarity with the process involved in Unity package creation and distribution.',
            'Maintaining a complete decoupling between these systems and my main project.',
            'Developing interfaces and APIs that provide ease of use to those using my systems.',
        ],

        solutions: [
            'Unfamiliarity with Unity packages: ',
            'Coupling issues: ',
            'Interface and API development: '
        ],

        techStack: [
            'Unity: Game engine, provides APIs for C# script creation.',
            'C#: Scripting language used within Unity',
            'Claude Code (mostly Opus 4.x): IDE based AI code assistant',
            'Git/Github: Versioning tools that provide redundancy for the entire codebase, alongside commits, version history, etc.',
        ],

        skillsGained: [

        ]
    }
};