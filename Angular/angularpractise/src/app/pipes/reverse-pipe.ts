import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    if(!value) return "";
    const resultVal = value.toString();
    const finalResult = resultVal.split("").reverse().join("");
    return finalResult;
  }

}
