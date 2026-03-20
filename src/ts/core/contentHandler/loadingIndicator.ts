export interface LoadingIndicator {
    show(): void;
    hide(): void;
}

export function createLoadingIndicator(elementId: string): LoadingIndicator {
    const element = document.getElementById(elementId);

    return {
        show: () => element?.classList.remove('hidden'),
        hide: () => element?.classList.add('hidden'),
    };
}
