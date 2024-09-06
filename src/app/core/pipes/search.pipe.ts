import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../Interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrObject:any[], search:string): any {
    return arrObject.filter((item)=> item.title.toLowerCase().includes(search.toLowerCase())); 
  }

}
