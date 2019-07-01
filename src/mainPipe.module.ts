import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SafeHtmlPipe} from './app/safe-html.pipe';


@NgModule({
    declarations: [SafeHtmlPipe],
    imports: [CommonModule],
    exports: [SafeHtmlPipe]
})

export class MainPipeModule { }
