import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoModel } from '../shared/models/ingreso-egreso.model';
import { IngreoEgresoInterface } from '../shared/interfaces/ingreso-egreso.interface';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppStateWithIngreso } from './ingreso-egreso.reducer';
import { unSetItems } from './ingreso-egreso.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  public ingresoForm: FormGroup;
  public type: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly ingresoEgresoService: IngresoEgresoService,
    private authService: AuthService,
    private readonly store: Store<AppStateWithIngreso>
  ) {
    this.type = 'ingreso';
  }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      monto: [null, Validators.required]
    });
  }

  public submit(): void {
    if (this.ingresoForm.invalid) {
      return;
    }
    const ingresoEgreso: IngreoEgresoInterface = new IngresoEgresoModel({
      ...this.ingresoForm.value,
      tipo: this.type,
      uid: this.authService.user.uid
    });
    this.ingresoEgresoService.crear(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.type = 'ingreso';
        Swal.fire('Success', 'Item creado', 'success');
      })
      .catch(err => Swal.fire('Error', err.message, 'error'));
  }

  ngOnDestroy(): void {
    this.store.dispatch(unSetItems());
  }

}
