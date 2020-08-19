import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { stopLoading, isLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  private uiSubscription: Subscription;
  public cargando: boolean;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: Router,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  public submit(): void {
    if (this.formGroup.invalid) { return; }
    this.store.dispatch( isLoading() );
    /* Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    }); */

    this.authService.crearUsuario(this.formGroup.value)
      .then(() => {
        // Swal.close();
        this.store.dispatch( stopLoading() );
        this.route.navigate(['/dashboard']);
      })
      .catch(err => {
        this.store.dispatch( stopLoading() );
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      });
  }

  public ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

}
