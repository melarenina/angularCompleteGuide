import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective{
    // Whenerver is open is switched to true (when someone clicks
    // on the button), the directive will attach the class
    // This will "attach" the class 'open' to the element
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
    constructor(){

    }
}
