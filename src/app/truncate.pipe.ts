import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(input: string, limit: number): string {
    if (!input) return '';

    if (input.length <= limit) {
      return input;
    } else {
      return input.substring(0, limit) + ' ...';
    }
  }
}
