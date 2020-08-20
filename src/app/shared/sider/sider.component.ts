import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';
import { UserInterface } from '../interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styles: [
  ]
})
export class SiderComponent implements OnInit, OnDestroy {
  public user: UserInterface;
  private subsUser: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly route: Router,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subsUser = this.store.select('user')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => this.user = auth.user);
  }

  public logout(): void {
    this.authService.logout()
      .then(() => this.route.navigate(['/login']));
  }

  ngOnDestroy(): void {
    this.subsUser.unsubscribe();
  }

}
