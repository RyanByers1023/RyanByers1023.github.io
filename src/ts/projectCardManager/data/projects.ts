/**
 * @file Project data for portfolio website (ryanbyers1023.github.io)
 * Cards are created at runtime using this data, fed into projectCardGenerator.ts
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Project status values
 */
export enum ProjectStatus {
    COMPLETE = 'Complete',
    IN_PROGRESS = 'In Progress',
    INCOMPLETE = 'Incomplete'
}

/**
 * Tailwind color schemes for tech stack badges
 */
export const TechColors = {
    CPP: 'bg-blue-100 text-indigo-800',
    SDL2: 'bg-red-100 text-indigo-800',
    TAILWIND: 'bg-blue-100 text-indigo-800',
    NODE: 'bg-red-100 text-blue-800',
    EXPRESS: 'bg-red-100 text-red-800',
    MYSQL: 'bg-red-100 text-orange-800',
    HTML: 'bg-red-100 text-yellow-800',
    JS: 'bg-red-100 text-white-800',
    CSS: 'bg-red-100 text-black-800'
} as const;

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Technology stack item with name and styling
 */
export interface TechStack {
    /** Name of the technology (Node, CSS, JS, Tailwind, etc.) */
    name: string;

    /** Color commonly associated with tech, text bubble background is determined by this value */
    color: string;
}

/**
 * Portfolio project data structure, contains main parameters
 * along with details, which encapsulates additional project data
 */
export interface Project {
    /** Internal identfier used by projectsCardManager.ts to ID multiple cards indivdually */
    id: string;

    /** Name of the project */
    title: string;

    /** Brief description of entire project */
    description: string;

    /** contains all images that the gallery object will iterate through */
    images: string[];

    //**List of enum TechStacks (detailed above), contains all technologies used in project */
    techStack: TechStack[];

    /** URL to respective Github project repository */
    githubUrl: string;


    /** linker to additonal interface -- ProjectDetails, contains addtl fields */
    details: ProjectDetails;
}

/**
 *Additonal detailed project information
 */
export interface ProjectDetails {
    /** High level overview of project, relatively brief */
    overview: string;

    /** Any standout features worth mentioning */
    keyFeatures: string[];

    /** Highlights related to any impressive technical aspects of the project (no raw pointers, etc.) */
    technicalHighlights: string[];

    /** Enum that details whether the project is in progress, finished, or cancelled */
    status: ProjectStatus;

    /** Reasons for current project status (if necessary) */
    statusNotes?: string;

    /** What was my overall goal with the project? */
    goals: string[];

    /** What were some of the most challenging things I had to deal with during development */
    challenges: string[];

    /** From these above challenges, what did I do to progress through them? */
    solutions: string[];

    /** What did I learn during the course of making this project? */
    skillsGained: string[];
}