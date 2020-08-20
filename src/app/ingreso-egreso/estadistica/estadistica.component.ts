import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngreoEgresoInterface } from '../../shared/interfaces/ingreso-egreso.interface';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {
  public ingresos: number;
  public egresos: number;

  public totalEgresos: number;
  public totalIngresos: number;
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [
    [0, 0],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private readonly store: Store<AppState>) {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;
    this.totalIngresos = 0;
  }

  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({ items }) => this.generateStadistics(items));
  }

  public generateStadistics(items: IngreoEgresoInterface[]): void {
    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    });

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }

}
