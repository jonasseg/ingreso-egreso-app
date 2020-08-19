import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
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

    this.authService.login(this.formGroup.value).then(() => {
      Swal.close();
      this.route.navigate(['/dashboard']);
    })
    .catch(() => {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

}
