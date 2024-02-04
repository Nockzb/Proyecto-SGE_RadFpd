import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'yyyy-MM-dd'): any {
    if (value) {
      return this.datePipe.transform(value, format);
    }
    return null;
  }
}