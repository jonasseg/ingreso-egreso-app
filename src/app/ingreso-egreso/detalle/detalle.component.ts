import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngreoEgresoInterface } from '../../shared/interfaces/ingreso-egreso.interface';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  public ingresoEgreso: IngreoEgresoInterface[];
  private ingSubs: Subscription;

  constructor(
    private readonly store: Store<AppStateWithIngreso>,
    private readonly ingresoEgresoService: IngresoEgresoService
  ) {
    this.ingresoEgreso = [];
  }

  ngOnInit(): void {
    this.ingSubs = this.store.select('ingresosEgresos')
    .subscribe(({ items }) => {
      this.ingresoEgreso = items;
    });
  }

  public borrar(item: IngreoEgresoInterface): void {
    this.ingresoEgresoService.deleteItem(item.id)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch(err => Swal.fire('Error', err.message, 'error'));
  }

  ngOnDestroy(): void {
    this.ingSubs.unsubscribe();
  }

}
