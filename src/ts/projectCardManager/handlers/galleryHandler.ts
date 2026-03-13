import type { ICardHandler } from '../interface';

/**
 * Manages the image gallery on the card front face.
 * Handles prev/next navigation, indicator dots, and image switching.
 * Does not depend on shared CardState since gallery behavior is
 * independent of flip/tilt state.
 */
export class GalleryHandler implements ICardHandler {
    private readonly abortController = new AbortController();
    private currentIndex = 0;

    constructor(
        private readonly galleryImg: HTMLImageElement | null,
        private readonly prevBtn: HTMLButtonElement | null,
        private readonly nextBtn: HTMLButtonElement | null,
        private readonly indicatorsContainer: HTMLElement | null,
        private readonly images: string[]
    ) {}

    init(): void {
        // No gallery to set up if there's 0 or 1 image
        if (this.images.length <= 1) return;

        const { signal } = this.abortController;

        this.initIndicators();

        this.handleNextBtnClick(signal);

        this.handlePrevBtnClick(signal);
    }

    destroy(): void {
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    private handleNextBtnClick(signal: AbortSignal): void {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation();
                this.nextImage();
            }, { signal });
        }
    }

    private handlePrevBtnClick(signal: AbortSignal): void {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation();
                this.prevImage();
            }, { signal });
        }
    }

    private initIndicators(): void {
        if (!this.indicatorsContainer) return;

        const { signal } = this.abortController;

        this.indicatorsContainer.innerHTML = '';

        this.images.forEach((_: string, index: number) => {
            const indicator = document.createElement('div');
            indicator.className = 'gallery-indicator';

            if (index === 0) indicator.classList.add('active');

            indicator.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation();
                this.showImage(index);
            }, { signal });

            this.indicatorsContainer!.appendChild(indicator);
        });
    }

    private showImage(index: number): void {
        this.currentIndex = index;

        if (this.galleryImg) {
            this.galleryImg.src = this.images[index];
        }

        this.updateActiveIndicator(index);
    }

    private updateActiveIndicator(activeIndex: number): void {
        if (!this.indicatorsContainer) return;

        const indicators = this.indicatorsContainer.querySelectorAll('.gallery-indicator');
        indicators.forEach((indicator, i: number) => {
            indicator.classList.toggle('active', i === activeIndex);
        });
    }

    private nextImage(): void {
        const next = (this.currentIndex + 1) % this.images.length;
        this.showImage(next);
    }

    private prevImage(): void {
        const prev = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prev);
    }
}