import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split',
  standalone: true
})
export class SplitPipe implements PipeTransform {

  transform(text:string , limit:number): string {
    return text.split(" ", limit).join(" ");
  }

}
