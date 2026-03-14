/**
 * @file Project type definitions and constants for the portfolio website.
 * Cards are created at runtime using this data, fed into projectCardHTMLGenerator.ts
 */

// ============================================================================
// CONSTANTS
// ============================================================================

/** Project status values */
export enum ProjectStatus {
    COMPLETE = 'Complete',
    IN_PROGRESS = 'In Progress',
    INCOMPLETE = 'Incomplete'
}

/** Tailwind color schemes for tech stack badges */
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
 * Portfolio project data structure, contains main parameters
 * along with details, which encapsulates additional project data.
 */
export interface Project {
    /** Internal identifier used by ProjectCardManager to ID cards individually */
    id: string;

    /** Name of the project */
    title: string;

    /** Brief description of entire project */
    description: string;

    /** Contains all images that the gallery will iterate through */
    images: string[];

    /** URL to respective Github project repository */
    githubUrl: string;

    /** Additional detailed project information */
    details: ProjectDetails;
}

/**
 * Additional detailed project information.
 */
export interface ProjectDetails {
    /** High level overview of project, relatively brief */
    overview: string;

    /** Any standout features worth mentioning */
    keyFeatures: string[];

    /** Highlights related to impressive technical aspects of the project */
    technicalHighlights: string[];

    /** Enum that details whether the project is in progress, finished, or cancelled */
    status: ProjectStatus;

    /** Reasons for current project status (if necessary) */
    statusNotes?: string;

    /** What was the overall goal with the project? */
    goals: string[];

    /** What were the most challenging things during development? */
    challenges: string[];

    /** Technologies used */
    techStack: string[];

    /** From the challenges, what was done to progress through them? */
    solutions: string[];

    /** What was learned during the course of making this project? */
    skillsGained: string[];
}