import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocusDirective]'
})
export class AutoFocusDirective implements AfterContentInit {

  @Input() public appAutoFocusDirective;

  constructor(private el: ElementRef) { }

  ngAfterContentInit(): void {
      this.el.nativeElement.focus();
  }
}
