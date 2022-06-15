import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
    name: 'innerHtmlPipe'
})
export class InnerHTMLPipe implements PipeTransform {
    constructor (private sanitizer: DomSanitizer) {}

    transform(content: string):SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }

}