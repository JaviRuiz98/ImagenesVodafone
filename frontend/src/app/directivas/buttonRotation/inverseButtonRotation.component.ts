import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appInverseRotate]'
})
export class InverseRotateDirective implements OnChanges {
  @Input() rotationAngle: number;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.transform = `rotate(${-this.rotationAngle}deg)`;
  }
}
