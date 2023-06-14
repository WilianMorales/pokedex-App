import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgBroken]'
})
export class ImgBrokenDirective {

  @HostListener('error') handlerError(): void {
    const elNative = this.elHost.nativeElement
    console.log('Esta immagen revento.');
    elNative.src = 'assets/images/pokeball.png';
    elNative.width = 90
  }

  constructor(private elHost: ElementRef) { }

}
