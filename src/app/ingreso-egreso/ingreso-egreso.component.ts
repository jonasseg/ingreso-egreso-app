import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoModel } from '../shared/models/ingreso-egreso.model';
import { IngreoEgresoInterface } from '../shared/interfaces/ingreso-egreso.interface';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {
  public ingresoForm: FormGroup;
  public type: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly ingresoEgresoService: IngresoEgresoService,
    private authService: AuthService
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
      .then(ref => {
        this.ingresoForm.reset();
        this.type = 'ingreso';
        Swal.fire('Success', 'Item creado', 'success');
      })
      .catch(err => Swal.fire('Error', err.message, 'error'));
  }

}
