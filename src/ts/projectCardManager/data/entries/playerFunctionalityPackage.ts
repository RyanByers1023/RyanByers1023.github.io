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
        overview: 'Easy to integrate unity package that provides several basic player character abilities.',

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
            'Maintain scalability to my main project (Xeno Containment Initiative) by forcing elements of my codebase to be translated into a Unity package.',
            'Reduce my workload on additional projects that require the same set of functionality',
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
            'Team communication: Whilst a small team, friction can still occur, and it has. Dealing with disagreements, miscommunications, and technical difficulties put a strain on both the project and my team. Learning how to properly work through team friction, and come to new ideas and conclusions instead of fighting is and will be essential to maintain progress on this project.',
            'API development and usage exposure: Developing a game within a game engine typically means a dev would have to interface with some kind of library to have access to the engine\'s functionality. For Unity, this is MonoBehavior, and it is used in almost every script that I developed, so my usage with it only increases as development continues.',
            'New design patterns and methodologies learned during development: Singleton, factory, and single entry point, are all design patterns that I have see before, but never really took the time to properly implement. Gaining experience with these patters and seeing the positives and negatives that come with their use helped me grow as a developer.',
            'Refactoring: Much of the refactoring for this project involved cutting dependencies from Player Functionality, or choosing to move those dependencies closer to Player Functionality, due to a simliarity in logic, or to make the packages API easier to use.',
            'Dependency decoupling: The process of taking a part of my codebase and transforming it into a Unity package that can be imported by anyone came at the cost of heavy refactors due to dependency issues. Many of the elements Player Functionality touched were outside the primary set of logic that makes up the package. This caused dependency and coupling issues that led to a lenghty refactor involving either moving, or cutting these dependencies to allow for the package to function on its own.'
        ]
    }
};