import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading } from 'src/app/shared/ui.actions';
import { stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public cargando: boolean;
  private uiSubscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: Router,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
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

    this.authService.login(this.formGroup.value).then(() => {
      // Swal.close();
      this.store.dispatch( stopLoading() );
      this.route.navigate(['/dashboard']);
    })
    .catch(() => {
      this.store.dispatch( stopLoading() );
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

  public ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
