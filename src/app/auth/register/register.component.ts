import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public submit(): void {
    if (this.formGroup.invalid) { return; }

    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.crearUsuario(this.formGroup.value)
      .then(() => {
        Swal.close();
        this.route.navigate(['/dashboard']);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      });
  }

}
