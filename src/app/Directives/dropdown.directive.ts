import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective{
    // Whenerver is open is switched to true (when someone clicks
    // on the button), the directive will attach the class
    // This will "attach" the class 'open' to the element
    @HostBinding('class.open') isOpen = false;

    // This will ensure that the dropdown closes when the user clicks anywhere
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }
      constructor(private elRef: ElementRef) {}
}

