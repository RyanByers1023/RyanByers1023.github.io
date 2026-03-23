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
                this.handleIndicatorButtonClick(e, index, indicator);
            }, { signal });
        });
    }

    private handleIndicatorButtonClick(e: MouseEvent, index: number, indicators: NodeListOf<Element>){
        e.stopPropagation();
        this.showImage(index, indicators);
    }

    private buildIndicatorElements(indicatorsContainer: HTMLElement): void {
        this.buildIndicatorContainer(indicatorsContainer);

        this.images.forEach((_: string, index: number) => {
            this.buildIndicatorElement(indicatorsContainer, index)
        });
    }

    private buildIndicatorContainer(indicatorsContainer: HTMLElement){
        indicatorsContainer.innerHTML = '';
    }

    private buildIndicatorElement(indicatorsContainer: HTMLElement, index: number) : void{
        const indicator = this.buildIndicatorDiv();
        this.setIndicatorClassName(indicator, 'gallery-indicator')
        this.setActiveIndicator(indicator, index);
        indicatorsContainer.appendChild(indicator);
    }

    private buildIndicatorDiv(){
        return document.createElement('div');
    }

    private setActiveIndicator(indicator: HTMLElement, index: number) : void{
        if (index === 0){
            indicator.classList.add('active');
        } 
    }

    private setIndicatorClassName(indicator: HTMLElement, indicatorName: string) : void{
        indicator.className = indicatorName;
    }

    private showImage(index: number, indicators: NodeListOf<Element>): void {
        this.setIndex(index);
        this.setGalleryImage(index);
        this.setActiveIndicators(index, indicators);
    }

    private setIndex(index: number){
        this.currentIndex = index;
    }

    private setGalleryImage(index: number){
        if (this.galleryImg) {
            this.galleryImg.src = this.images[index];
        }
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