import { Component, OnInit } from '@angular/core';

//Store Objects
import { Store } from '@ngrx/store';
import { Movement } from 'src/app/models/ingreso-egreso.model';

//chartjs
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithMovements } from '../movements.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos:number = 0;
  totalEgresos:number = 0;

  //chartjs variables
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor( private store: Store<AppStateWithMovements>) { }

  ngOnInit(): void {
    this.store.select('movements')
    .subscribe( ({ items }) => this.generarEstadistica(items))
  }

  initEstadistica() {
    this.ingresos = 0;
    this.egresos = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;
  }

  generarEstadistica(items: Movement[]){
    this.initEstadistica();
    for (const item of items) {
      if( item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      }
      else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }

}
