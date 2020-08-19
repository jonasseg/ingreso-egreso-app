import { Pipe, PipeTransform } from '@angular/core';
import { IngreoEgresoInterface } from '../interfaces/ingreso-egreso.interface';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngreoEgresoInterface[]): IngreoEgresoInterface[] {
    return items.slice().sort((a, b) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}
