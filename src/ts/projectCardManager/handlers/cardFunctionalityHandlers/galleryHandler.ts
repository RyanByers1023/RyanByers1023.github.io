import type { ICardHandler } from '@projectCardManager/interface';
import { IndicatorManager } from './indicatorManager';

/**
 * Manages the image gallery on the card front face.
 * Owns navigation state (current index), prev/next logic, and image switching.
 * Delegates indicator dot concerns to IndicatorManager.
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

        //narrow type to HTMLElement
        const indicatorsContainer = this.indicatorsContainer;
        if(!indicatorsContainer) return;

        const { signal } = this.abortController;

        const indicators = new IndicatorManager(
            indicatorsContainer,
            this.images.length,
            signal,
            (index) => this.showImage(index, indicators),
        );

        this.addButtonClickListeners(signal, indicators);
    }

    destroy(): void {
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    private addButtonClickListeners(signal: AbortSignal, indicators: IndicatorManager): void {
        this.addNextButtonClickListener(signal, indicators);
        this.addPrevButtonClickListener(signal, indicators);
    }

    private addNextButtonClickListener(signal: AbortSignal, indicators: IndicatorManager): void {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation();
                this.showNextImage(indicators);
            }, { signal });
        }
    }

    private addPrevButtonClickListener(signal: AbortSignal, indicators: IndicatorManager): void {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e: MouseEvent) => {
                e.stopPropagation();
                this.showPrevImage(indicators);
            }, { signal });
        }
    }

    private showImage(index: number, indicators: IndicatorManager): void {
        this.currentIndex = index;

        if (this.galleryImg) {
            this.galleryImg.src = this.images[index];
        }

        indicators.setActive(index);
    }

    private showNextImage(indicators: IndicatorManager): void {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(nextIndex, indicators);
    }

    private showPrevImage(indicators: IndicatorManager): void {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prevIndex, indicators);
    }
}
