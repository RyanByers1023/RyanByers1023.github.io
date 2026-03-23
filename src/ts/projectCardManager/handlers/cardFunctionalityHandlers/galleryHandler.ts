import type { ICardHandler } from '@projectCardManager/interface';

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
        
        //narrow type to HTMLElement
        let indicatorsContainer = this.indicatorsContainer;
        if(!indicatorsContainer) return;

        const { signal } = this.abortController;

        this.buildIndicatorElements(indicatorsContainer);

        const indicators = this.getAllIndicators(indicatorsContainer);

        this.addIndicatorClickListeners(signal, indicators);

        this.addButtonClickListeners(signal, indicators);
    }

    destroy(): void {
        this.abortController.abort();
    }

    // ========================== Private Helpers ==========================

    private addButtonClickListeners(signal: AbortSignal, indicators: NodeListOf<Element>){
        this.addNextButtonClickListener(signal, indicators);
        this.addPrevButtonClickListener(signal, indicators);
    }
    
    private addNextButtonClickListener(signal: AbortSignal, indicators: NodeListOf<Element>): void {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e: MouseEvent) => {
                this.handleNextButtonClick(e, indicators);
            }, { signal });
        }
    }

    private addPrevButtonClickListener(signal: AbortSignal, indicators: NodeListOf<Element>): void {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e: MouseEvent) => {
                this.handlePrevButtonClick(e, indicators);
            }, { signal });
        }
    }

    private handleNextButtonClick(e: MouseEvent, indicators: NodeListOf<Element>){
        e.stopPropagation();
        this.setNextImage(indicators);
    }

    private handlePrevButtonClick(e: MouseEvent, indicators: NodeListOf<Element>){
        e.stopPropagation();
        this.setPrevImage(indicators);
    }

    private addIndicatorClickListeners(signal: AbortSignal, indicators: NodeListOf<Element>): void {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e: Event) => {
                this.handleIndicatorButtonClick(e, index, indicators);
            }, { signal });
        });
    }

    private handleIndicatorButtonClick(e: Event, index: number, indicators: NodeListOf<Element>){
        e.stopPropagation();
        this.showImage(index, indicators);
    }

    private buildIndicatorElements(indicatorsContainer: HTMLElement): void {
        indicatorsContainer.innerHTML = '';

        this.images.forEach((_: string, index: number) => {
            const indicator = document.createElement('div');
            indicator.className = 'gallery-indicator';
            if (index === 0) indicator.classList.add('active');
            indicatorsContainer.appendChild(indicator);
        });
    }

    private showImage(index: number, indicators: NodeListOf<Element>): void {
        this.currentIndex = index;

        if (this.galleryImg) {
            this.galleryImg.src = this.images[index];
        }

        this.setActiveIndicators(index, indicators);
    }

    private getAllIndicators(indicatorsContainer: HTMLElement){
        return indicatorsContainer.querySelectorAll('.gallery-indicator');
    }

    private setActiveIndicators(activeIndex: number, indicators: NodeListOf<Element>): void {
        indicators.forEach((indicator, i: number) => {
            indicator.classList.toggle('active', i === activeIndex);
        });
    }

    private setNextImage(indicators: NodeListOf<Element>): void {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.showImage(nextIndex, indicators);
    }

    private setPrevImage(indicators: NodeListOf<Element>): void {
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.showImage(prevIndex, indicators);
    }
}