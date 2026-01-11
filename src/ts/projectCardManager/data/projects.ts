/**
 * @file Project data for portfolio website (ryanbyers1023.github.io)
 * Cards are created at runtime using this data in projectCardGenerator.ts
 * Data sourced from projectsData.ts
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
    name: string;
    color: string;
}

/**
 * Detailed project information
 */
export interface ProjectDetails {
    overview: string;
    keyFeatures: string[];
    technicalHighlights: string[];
    status: ProjectStatus;
    statusNotes?: string;
    goals: string[];
    challenges: string[];
    solutions: string[];
    techStack: Record<string, string>;
    skillsGained: string[];
}

/**
 * Portfolio project data structure
 */
export interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    techStack: TechStack[];
    githubUrl: string;
    details: ProjectDetails;
}