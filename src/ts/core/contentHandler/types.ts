/**
 * Callback context provided after content is rendered
 */
export interface RenderContext {
    route: string;
    file: string;
    container: HTMLElement;
}

/**
 * Configuration options for page loader initialization
 */
export interface PageLoaderConfig {
    containerId?: string;
    loadingId?: string;
    sectionFallback?: string;
    mapRouteToFile?: (route: string) => string;
    onAfterRender?: ((context: RenderContext) => void) | null;
}
