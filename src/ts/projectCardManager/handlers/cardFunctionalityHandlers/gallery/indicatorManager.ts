/**
 * Builds and manages gallery indicator dots.
 * Owns all indicator DOM creation, querying, click listeners, and active state toggling.
 */
export class IndicatorManager {
    private readonly indicators: NodeListOf<Element>;

    constructor(
        private readonly container: HTMLElement,
        imageCount: number,
        signal: AbortSignal,
        onIndicatorClick: (index: number) => void,
    ) {
        this.buildElements(imageCount);
        this.indicators = container.querySelectorAll('.gallery-indicator');
        this.addClickListeners(signal, onIndicatorClick);
    }

    setActive(activeIndex: number): void {
        this.indicators.forEach((indicator, i: number) => {
            indicator.classList.toggle('active', i === activeIndex);
        });
    }

    // ========================== Private ==========================

    private buildElements(imageCount: number): void {
        this.container.innerHTML = '';

        for (let i = 0; i < imageCount; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'gallery-indicator';
            if (i === 0) indicator.classList.add('active');
            this.container.appendChild(indicator);
        }
    }

    private addClickListeners(signal: AbortSignal, onIndicatorClick: (index: number) => void): void {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e: Event) => {
                e.stopPropagation();
                onIndicatorClick(index);
            }, { signal });
        });
    }
}
