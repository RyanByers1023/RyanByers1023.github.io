import type { Project } from '@data/projects';

import { graphicsEngine } from '@data/entries/graphicsEngine';
import { portfolioWebsite } from '@data/entries/portfolioWebsite';
import { xenoContainmentInitiative } from '@data/entries/xenoContainmentInitiative';
import { playerFunctionalityPackage } from '@data/entries/playerFunctionalityPackage';

// Each project lives in its own file under ./entries. Add a new project by
// creating an entry file, then importing and appending it to the array below.
export const projectsData: Project[] = [
    graphicsEngine,
    portfolioWebsite,
    xenoContainmentInitiative,
    playerFunctionalityPackage
];