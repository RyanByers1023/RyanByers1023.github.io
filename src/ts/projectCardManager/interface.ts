// interface for all project card related handlers
export interface ICardHandler {
    /** Register event listeners and activate behavior */
    init(): void;

    /** Remove all event listeners and clean up resources */
    destroy(): void;
}