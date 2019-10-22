import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocusDirective]'
})
export class AutoFocusDirective implements AfterContentInit {

  @Input() public appAutoFocusDirective: boolean;

  constructor(private el: ElementRef) { }

  ngAfterContentInit(): void {

    setTimeout(() => {

      this.el.nativeElement.focus();

    }, 0);
  }

}
