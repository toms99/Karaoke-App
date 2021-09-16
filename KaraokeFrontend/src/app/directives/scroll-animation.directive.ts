import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective {

  private delay: string="";

  @HostListener('window:scroll', [])
  scroll(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    let scroll = this.mapRange(0, window.innerHeight, 0, 1, rect.top + (rect.height / 2));
    scroll = scroll < 0 ? 0 : scroll > 1 ? 1 : scroll;
    this.delay = `-${scroll.toFixed(2)}s`;
  }

  @HostBinding('style.animationDelay') get animationDelay(): string {
    return this.delay;
  }

  private mapRange(a1: number, a2: number, b1: number, b2: number, value: number): number {
    return b1 + ((value - a1) * (b2 - b1)) / (a2 - a1);
  }

  constructor(private el: ElementRef) { }
}
