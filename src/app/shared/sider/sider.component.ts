import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styles: [
  ]
})
export class SiderComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout()
      .then(() => this.route.navigate(['/login']));
  }

}
