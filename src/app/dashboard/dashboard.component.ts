import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems, unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngreoEgresoInterface } from '../shared/interfaces/ingreso-egreso.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private userSubs: Subscription;
  private ingSubs: Subscription;

  constructor(
    private readonly store: Store<AppState>,
    private readonly ingresoEgresoService: IngresoEgresoService,
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(({ user }) => {
        this.ingSubs = this.ingresoEgresoService.initIngresoEgresoListener(user.uid)
          .subscribe((ingresosEgresosFB: IngreoEgresoInterface[]) => {
            this.store.dispatch(setItems( { items: ingresosEgresosFB } ));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.ingSubs?.unsubscribe();
  }

}
