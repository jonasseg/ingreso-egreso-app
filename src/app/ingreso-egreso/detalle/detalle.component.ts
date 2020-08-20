import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngreoEgresoInterface } from '../../shared/interfaces/ingreso-egreso.interface';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgreso: IngreoEgresoInterface[];
  private ingSubs: Subscription;

  constructor(
    private readonly store: Store<AppState>,
    private readonly ingresoEgresoService: IngresoEgresoService
  ) {
    this.ingresoEgreso = [];
  }

  ngOnInit(): void {
    this.ingSubs = this.store.select('ingresosEgresos')
    .pipe(
      filter(detalle => detalle.items.length > 0)
    )
    .subscribe(({ items }) => this.ingresoEgreso = items);
  }

  public borrar(item: IngreoEgresoInterface): void {
    console.log(item);
    this.ingresoEgresoService.deleteItem(item.id)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'));
  }

  ngOnDestroy(): void {
    this.ingSubs.unsubscribe();
  }

}
