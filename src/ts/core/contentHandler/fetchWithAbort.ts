export interface AbortableFetcher {
    fetch(url: string): Promise<Response>;
    abort(): void;
}

/**
 * Creates a fetcher that automatically aborts the previous in-flight request
 * when a new one is started.
 */
export function createAbortableFetcher(): AbortableFetcher {
    let controller: AbortController | null = null;

    return {
        fetch(url: string): Promise<Response> {
            controller?.abort();
            controller = new AbortController();
            return fetch(url, { signal: controller.signal });
        },

        abort() {
            controller?.abort();
            controller = null;
        },
    };
}
