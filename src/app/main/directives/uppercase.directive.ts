import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[uppercase]',
})
export class UppercaseDirective implements AfterContentInit {
  constructor(private elRef: ElementRef) {}

  ngAfterContentInit(): void {
    this.elRef.nativeElement.textContent =
      this.elRef.nativeElement.textContent.toUpperCase();
  }
}
