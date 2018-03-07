import { HoverClassDirective } from './utilities/hover-class.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HoverClassDirective
    ],
    exports: [
        CommonModule,
        HoverClassDirective
    ]
})
export class SharedModule { }